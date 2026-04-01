import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import { toast } from 'react-hot-toast'
import { uploadFile } from '../../lib/storage'
import 'react-quill/dist/quill.snow.css'
import QuillImageResizeModule from 'quill-image-resize-module-react'

const ImageResize =
	QuillImageResizeModule?.default ??
	QuillImageResizeModule?.ImageResize ??
	QuillImageResizeModule

if (typeof window !== 'undefined') {
	window.Quill = Quill
}

if (typeof ImageResize === 'function' && Quill.imports?.['modules/imageResize'] !== ImageResize) {
	Quill.register('modules/imageResize', ImageResize, true)
}

const Parchment = Quill.import('parchment')
const LineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', {
	scope: Parchment.Scope.BLOCK,
	whitelist: ['1', '1.15', '1.5', '1.75', '2', '2.5'],
})

if (Quill.imports?.['attributors/style/lineheight'] !== LineHeightStyle) {
	Quill.register(LineHeightStyle, true)
}

const BaseImageFormat = Quill.import('formats/image')
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style', 'data-placement', 'data-x', 'data-y', 'data-margin', 'data-side']

class CustomImage extends BaseImageFormat {
	static formats(domNode) {
		return ImageFormatAttributesList.reduce(function (formats, attribute) {
			if (domNode.hasAttribute(attribute)) {
				formats[attribute] = domNode.getAttribute(attribute)
			}
			return formats
		}, {})
	}

	format(name, value) {
		if (ImageFormatAttributesList.indexOf(name) > -1) {
			if (value) {
				this.domNode.setAttribute(name, value)
			} else {
				this.domNode.removeAttribute(name)
			}
		} else {
			super.format(name, value)
		}
	}
}

Quill.register('formats/image', CustomImage, true)

const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }, { size: ['small', false, 'large', 'huge'] }, { lineheight: ['1', '1.15', '1.5', '1.75', '2', '2.5'] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ script: 'sub' }, { script: 'super' }],
	[{ color: [] }, { background: [] }],
	[{ align: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
	['blockquote', 'code-block'],
	['link', 'image', 'video'],
	['clean'],
]

const FORMATS = [
	'header',
	'font',
	'size',
	'lineheight',
	'bold',
	'italic',
	'underline',
	'strike',
	'script',
	'color',
	'background',
	'align',
	'list',
	'bullet',
	'indent',
	'blockquote',
	'code-block',
	'link',
	'image',
	'video',
	'width',
	'height',
	'style',
]

const IMAGE_PRESETS = {
	free: {
		label: 'Free Move',
		display: 'block',
		float: 'none',
		clear: 'none',
		margin: '0',
		verticalAlign: '',
	},
	inline: {
		label: 'Inline',
		display: 'inline-block',
		float: 'none',
		clear: 'none',
		margin: '0 0.75em 0 0',
		verticalAlign: 'middle',
	},
	leftWrap: {
		label: 'Wrap Left',
		display: 'block',
		float: 'left',
		clear: 'none',
		margin: '0 1.25em 1em 0',
		verticalAlign: '',
	},
	rightWrap: {
		label: 'Wrap Right',
		display: 'block',
		float: 'right',
		clear: 'none',
		margin: '0 0 1em 1.25em',
		verticalAlign: '',
	},
	topBottom: {
		label: 'Top & Bottom',
		display: 'block',
		float: 'none',
		clear: 'both',
		margin: '1em auto',
		verticalAlign: '',
	},
	center: {
		label: 'Center',
		display: 'block',
		float: 'none',
		clear: 'none',
		margin: '1em auto',
		verticalAlign: '',
	},
}

const DEFAULT_IMAGE_MODAL = {
	isOpen: false,
	imgNode: null,
	preset: 'center',
	width: '320',
	margin: '',
	alt: '',
	position: { top: 24, left: 24 },
	frame: null,
	freeX: '',
	freeY: '',
}

const IMAGE_SNAP_GRID = 8
const IMAGE_MIN_WIDTH = 120
const IMAGE_MAX_WIDTH = 720
const IMAGE_RESIZE_HANDLES = [
	{ key: 'nw', className: '-left-2.5 -top-2.5 cursor-nwse-resize' },
	{ key: 'ne', className: '-right-2.5 -top-2.5 cursor-nesw-resize' },
	{ key: 'sw', className: '-bottom-2.5 -left-2.5 cursor-nesw-resize' },
	{ key: 'se', className: '-bottom-2.5 -right-2.5 cursor-nwse-resize' },
]

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value))
}

function snapToGrid(value) {
	return Math.round(value / IMAGE_SNAP_GRID) * IMAGE_SNAP_GRID
}

function parseNumericValue(value, fallback = 0) {
	const parsed = Number.parseFloat(`${value ?? ''}`)
	return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeMediaUrl(value) {
	const trimmed = value.trim()
	if (!trimmed) return ''
	if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed
	if (trimmed.startsWith('//')) return `https:${trimmed}`
	return `https://${trimmed}`
}

function inferImagePreset(img) {
	const placement = img.getAttribute('data-placement')
	const float = img.style.float || 'none'
	const display = img.style.display || ''
	const clear = img.style.clear || 'none'

	if (placement === 'free' || img.style.position === 'absolute') return 'free'
	if (float === 'left') return 'leftWrap'
	if (float === 'right') return 'rightWrap'
	if (clear === 'both') return 'topBottom'
	if (display === 'inline-block' || img.style.verticalAlign === 'middle') return 'inline'
	return 'center'
}

function extractFreePosition(img) {
	const editorRect = img.closest('.ql-editor')?.getBoundingClientRect()
	const imageRect = img.getBoundingClientRect()
	const fallbackX = editorRect ? Math.max(0, imageRect.left - editorRect.left) : 0
	const fallbackY = editorRect ? Math.max(0, imageRect.top - editorRect.top) : 0

	return {
		freeX: img.getAttribute('data-x') || `${snapToGrid(fallbackX)}`,
		freeY: img.getAttribute('data-y') || `${snapToGrid(fallbackY)}`,
	}
}

function extractWidth(img) {
	if (img.style.width && img.style.width.endsWith('px')) {
		return img.style.width.replace('px', '')
	}

	if (img.getAttribute('width')) {
		return img.getAttribute('width')
	}

	const renderedWidth = Math.round(img.getBoundingClientRect().width)
	return renderedWidth > 0 ? String(renderedWidth) : '320'
}

function extractMargin(img) {
	return img.getAttribute('data-margin') || img.style.margin || ''
}

function getImageFrame(img, shell) {
	const imgRect = img.getBoundingClientRect()
	const shellRect = shell?.getBoundingClientRect()

	if (!shellRect) {
		return null
	}

	return {
		top: imgRect.top - shellRect.top,
		left: imgRect.left - shellRect.left,
		width: imgRect.width,
		height: imgRect.height,
	}
}

function applyImagePreset(img, imageModal) {
	const nextWidth = imageModal.width?.trim()
	const placementKey = 'free'
	const freeX = snapToGrid(parseNumericValue(imageModal.freeX, parseNumericValue(img.style.left, 0)))
	const freeY = snapToGrid(parseNumericValue(imageModal.freeY, parseNumericValue(img.style.top, 0)))

	if (nextWidth) {
		img.style.width = /^\d+(\.\d+)?$/.test(nextWidth) ? `${nextWidth}px` : nextWidth
		img.setAttribute('width', `${Math.round(parseNumericValue(nextWidth, parseNumericValue(img.getBoundingClientRect().width, 320)))}`)
	} else {
		img.style.removeProperty('width')
		img.removeAttribute('width')
	}

	if (imageModal.alt?.trim()) {
		img.setAttribute('alt', imageModal.alt.trim())
	} else {
		img.removeAttribute('alt')
	}

	img.setAttribute('data-placement', placementKey)
	applyFreeImagePosition(img, freeX, freeY)
}

function getImageModalPosition(img, shell) {
	const shellRect = shell?.getBoundingClientRect()
	const frame = getImageFrame(img, shell)

	if (!shellRect || !frame) {
		return { top: 24, left: 24 }
	}

	const modalWidth = 360
	const modalHeight = 240
	const gap = 12

	let left = frame.left + Math.max(0, frame.width - modalWidth)
	let top = frame.top + frame.height + gap

	if (top + modalHeight > shellRect.height - 12) {
		top = frame.top - modalHeight - gap
	}

	return {
		top: clamp(top, 12, Math.max(12, shellRect.height - modalHeight - 12)),
		left: clamp(left, 12, Math.max(12, shellRect.width - modalWidth - 12)),
	}
}

function applyFreeImagePosition(img, x, y, preferredSide = null) {
	const nextX = snapToGrid(Math.max(0, x))
	const editorRect = img.closest('.ql-editor')?.getBoundingClientRect()
	const imageRect = img.getBoundingClientRect()
	const imageWidth = parseNumericValue(img.getAttribute('width'), imageRect.width || 240)
	const editorWidth = editorRect?.width || 0
	const minY = editorRect ? -Math.max(0, imageRect.top - editorRect.top) : -240
	const nextY = snapToGrid(clamp(y, minY, Math.max(0, (editorRect?.height || 0) - imageRect.height)))
	const side = preferredSide || img.getAttribute('data-side') || (editorWidth > 0 && nextX > (editorWidth - imageWidth) / 2 ? 'right' : 'left')
	const alignRight = side === 'right'
	const rightOffset = Math.max(0, editorWidth - nextX - imageWidth)

	img.setAttribute('data-placement', 'free')
	img.style.position = 'relative'
	img.style.left = `${nextX}px`
	img.style.top = `${nextY}px`
	img.style.bottom = ''
	img.style.float = alignRight ? 'right' : 'left'
	img.style.clear = ''
	img.style.display = 'block'
	img.style.marginTop = '0'
	img.style.marginBottom = '1rem'
	img.style.marginLeft = alignRight ? '1rem' : `${nextX}px`
	img.style.marginRight = alignRight ? `${rightOffset}px` : '1rem'
	img.style.zIndex = '1'
	img.style.height = 'auto'
	img.style.maxWidth = '100%'
	img.style.verticalAlign = ''
	img.setAttribute('data-x', String(nextX))
	img.setAttribute('data-y', String(nextY))
	img.setAttribute('data-margin', `${nextY}px`)
	img.setAttribute('data-side', side)
}

function buildImageToolbarState(img, shell) {
	const freePosition = extractFreePosition(img)

	return {
		isOpen: true,
		imgNode: img,
		preset: 'free',
		width: extractWidth(img),
		margin: extractMargin(img),
		alt: img.getAttribute('alt') || '',
		position: getImageModalPosition(img, shell),
		frame: getImageFrame(img, shell),
		freeX: freePosition.freeX,
		freeY: freePosition.freeY,
	}
}

function BlogEditor({ value, onChange, placeholder = 'Write your post here...' }) {
	const [linkModal, setLinkModal] = useState({ isOpen: false, url: '', text: '', range: null, quill: null })
	const [imageModal, setImageModal] = useState(DEFAULT_IMAGE_MODAL)
	const [isTransformingImage, setIsTransformingImage] = useState(false)
	const fileInputRef = useRef(null)
	const editorShellRef = useRef(null)
	const quillInstanceRef = useRef(null)
	const reactQuillRef = useRef(null)
	const imageDragRef = useRef({
		active: false,
		moved: false,
		img: null,
		startX: 0,
		startY: 0,
		baseX: 0,
		baseY: 0,
		side: 'left',
	})
	const imageResizeRef = useRef({
		active: false,
		handle: '',
		img: null,
		startX: 0,
		startWidth: 0,
		startLeft: 0,
		startTop: 0,
		moved: false,
	})

	const syncImageModalFromNode = useCallback((img) => {
		if (!img?.isConnected) {
			setImageModal(DEFAULT_IMAGE_MODAL)
			return
		}

		setImageModal((current) => ({
			...current,
			...buildImageToolbarState(img, editorShellRef.current),
		}))
	}, [])

	const openImageModalForNode = useCallback((img) => {
		if (!img) return
		setImageModal(buildImageToolbarState(img, editorShellRef.current))
	}, [])

	const openLinkModal = useCallback((quill) => {
		const range = quill.getSelection(true)
		setLinkModal({ isOpen: true, url: '', text: '', range, quill })
	}, [])

	const closeLinkModal = () => {
		setLinkModal({ isOpen: false, url: '', text: '', range: null, quill: null })
	}

	const closeImageModal = useCallback(() => {
		setImageModal(DEFAULT_IMAGE_MODAL)
	}, [])

	const persistImageNode = useCallback(
		(img) => {
			if (!img || !quillInstanceRef.current) return

			img.setAttribute('style', img.style.cssText)

			const blot = Quill.find(img)
			if (blot) {
				const index = quillInstanceRef.current.getIndex(blot)
				if (index !== undefined) {
					quillInstanceRef.current.formatLine(index, 1, 'list', false, 'user')
					quillInstanceRef.current.formatText(index, 1, 'style', img.style.cssText, 'user')
				}
			}

			onChange(quillInstanceRef.current.root.innerHTML)
		},
		[onChange]
	)

	const insertLink = useCallback(() => {
		const { url: rawUrl, text, range, quill } = linkModal
		const url = normalizeMediaUrl(rawUrl)

		if (!url) {
			closeLinkModal()
			return
		}

		if (range && range.length > 0) {
			quill.format('link', url)
		} else {
			const linkText = text || url
			const insertAt = range?.index ?? quill.getLength()
			quill.insertText(insertAt, linkText, 'link', url, 'user')
			quill.setSelection(insertAt + linkText.length, 0)
		}
		closeLinkModal()
	}, [linkModal])

	const handleLinkKeyDown = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				e.stopPropagation()
				insertLink()
			}

			if (e.key === 'Escape') {
				e.preventDefault()
				e.stopPropagation()
				closeLinkModal()
			}
		},
		[insertLink]
	)

	const handleImageUpload = async (e) => {
		const file = e.target.files?.[0]
		if (!file) return

		const quill = quillInstanceRef.current
		if (!quill) return

		const range = quill.getSelection(true)
		let insertAt = range?.index ?? quill.getLength()
		const activeFormats = range ? quill.getFormat(range) : {}

		try {
			const toastId = toast.loading('Uploading image...')
			const url = await uploadFile(file, 'blog-images')
			toast.dismiss(toastId)

			if (activeFormats.list) {
				quill.insertText(insertAt, '\n', 'user')
				insertAt += 1
				quill.formatLine(insertAt, 1, 'list', false, 'user')
			}

			quill.insertEmbed(insertAt, 'image', url, 'user')
			quill.insertText(insertAt + 1, ' ', 'user')
			quill.setSelection(insertAt + 2, 0)

			requestAnimationFrame(() => {
				const [leaf] = quill.getLeaf(insertAt)
				const imgNode =
					leaf?.domNode?.tagName === 'IMG'
						? leaf.domNode
						: Array.from(quill.root.querySelectorAll('img')).find((img) => img.getAttribute('src') === url && !img.getAttribute('data-placement'))

				if (!imgNode) return

				applyFreeImagePosition(imgNode, 0, 0, 'left')
				imgNode.setAttribute('style', imgNode.style.cssText)
				onChange(quill.root.innerHTML)
			})
		} catch (error) {
			toast.error('Image upload failed: ' + error.message)
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleEditorChange = useCallback(
		(content) => {
			if (imageModal.imgNode && !imageModal.imgNode.isConnected) {
				setImageModal(DEFAULT_IMAGE_MODAL)
			}
			onChange(content)
		},
		[imageModal.imgNode, onChange]
	)

	const beginImageResize = useCallback((handle, event) => {
		if (!imageModal.imgNode) return

		event.preventDefault()
		event.stopPropagation()

		const currentImage = imageModal.imgNode
		const freePosition = extractFreePosition(currentImage)

		imageResizeRef.current = {
			active: true,
			handle,
			img: currentImage,
			startX: event.clientX,
			startWidth: parseNumericValue(extractWidth(currentImage), currentImage.getBoundingClientRect().width),
			startLeft: parseNumericValue(freePosition.freeX, 0),
			startTop: parseNumericValue(freePosition.freeY, 0),
			moved: false,
		}

		setIsTransformingImage(true)
		currentImage.classList.add('is-dragging-image')
		document.body.style.userSelect = 'none'
	}, [imageModal.imgNode])

	useEffect(() => {
		const quill = reactQuillRef.current?.getEditor?.()
		if (!quill) return

		quillInstanceRef.current = quill

		const handleDblClick = (e) => {
			if (e.target.tagName === 'IMG') {
				openImageModalForNode(e.target)
			}
		}

		const handleClick = (e) => {
			if (e.target.tagName === 'IMG') {
				if (imageDragRef.current.moved) {
					imageDragRef.current.moved = false
					return
				}
				openImageModalForNode(e.target)
			}
		}

		const handlePointerDown = (e) => {
			if (e.target.tagName !== 'IMG') return

			if (e.target.getAttribute('data-placement') !== 'free') {
				e.target.setAttribute('data-placement', 'free')
				e.target.setAttribute('data-x', '0')
				e.target.setAttribute('data-y', '0')
				e.target.setAttribute('data-side', e.target.style.float === 'right' ? 'right' : 'left')
			}

			const currentPosition = extractFreePosition(e.target)

			imageDragRef.current = {
				active: true,
				moved: false,
				img: e.target,
				startX: e.clientX,
				startY: e.clientY,
				baseX: parseNumericValue(currentPosition.freeX, 0),
				baseY: parseNumericValue(currentPosition.freeY, 0),
				side: e.target.getAttribute('data-side') || (e.target.style.float === 'right' ? 'right' : 'left'),
			}

			setIsTransformingImage(true)
			e.target.classList.add('is-dragging-image')
			document.body.style.userSelect = 'none'
			e.preventDefault()
		}

		const handlePointerMove = (e) => {
			if (imageResizeRef.current.active && imageResizeRef.current.img) {
				const resizeImage = imageResizeRef.current.img
				const editorRect = quill.root.getBoundingClientRect()
				const movingLeftEdge = imageResizeRef.current.handle.includes('w')
				const deltaX = e.clientX - imageResizeRef.current.startX
				const proposedWidth = movingLeftEdge
					? imageResizeRef.current.startWidth - deltaX
					: imageResizeRef.current.startWidth + deltaX
				const nextWidth = clamp(snapToGrid(proposedWidth), IMAGE_MIN_WIDTH, IMAGE_MAX_WIDTH)

				resizeImage.style.width = `${nextWidth}px`
				resizeImage.setAttribute('width', `${nextWidth}`)
				resizeImage.style.maxWidth = '100%'

				if (inferImagePreset(resizeImage) === 'free' && movingLeftEdge) {
					const widthDelta = nextWidth - imageResizeRef.current.startWidth
					const nextLeft = clamp(
						snapToGrid(imageResizeRef.current.startLeft - widthDelta),
						0,
						Math.max(0, editorRect.width - nextWidth)
					)
					applyFreeImagePosition(resizeImage, nextLeft, imageResizeRef.current.startTop)
				}

				imageResizeRef.current.moved = true
				return
			}

			if (!imageDragRef.current.active || !imageDragRef.current.img) return

			const deltaX = Math.abs(e.clientX - imageDragRef.current.startX)
			const deltaY = Math.abs(e.clientY - imageDragRef.current.startY)

			if (deltaX < 8 && deltaY < 8) return

			imageDragRef.current.moved = true
			const img = imageDragRef.current.img
			const editorRect = quill.root.getBoundingClientRect()
			const imgRect = img.getBoundingClientRect()
			const x = Math.max(0, imageDragRef.current.baseX + (e.clientX - imageDragRef.current.startX))
			const y = Math.max(0, imageDragRef.current.baseY + (e.clientY - imageDragRef.current.startY))
			const maxX = Math.max(0, editorRect.width - imgRect.width)
			const maxY = Math.max(0, editorRect.height - imgRect.height)

			applyFreeImagePosition(img, Math.min(x, maxX), Math.min(y, maxY), imageDragRef.current.side)
		}

		const finishPointerDrag = () => {
			if (imageResizeRef.current.img) {
				const resizedImg = imageResizeRef.current.img
				resizedImg.classList.remove('is-dragging-image')

				if (imageResizeRef.current.moved) {
					persistImageNode(resizedImg)
					syncImageModalFromNode(resizedImg)
				}

				imageResizeRef.current = {
					active: false,
					handle: '',
					img: null,
					startX: 0,
					startWidth: 0,
					startLeft: 0,
					startTop: 0,
					moved: false,
				}

				setIsTransformingImage(false)
				document.body.style.userSelect = ''
				return
			}

			if (!imageDragRef.current.img) {
				imageDragRef.current.active = false
				setIsTransformingImage(false)
				document.body.style.userSelect = ''
				return
			}

			const draggedImg = imageDragRef.current.img
			draggedImg.classList.remove('is-dragging-image')

			if (imageDragRef.current.moved) {
				persistImageNode(draggedImg)
				syncImageModalFromNode(draggedImg)
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'))
				}, 50)
			}

			imageDragRef.current = {
				active: false,
				moved: false,
				img: null,
				startX: 0,
				startY: 0,
				baseX: 0,
				baseY: 0,
				side: 'left',
			}

			setIsTransformingImage(false)
			document.body.style.userSelect = ''
		}

		const handleContextMenu = (e) => {
			if (e.target.tagName === 'IMG') {
				e.preventDefault()
				openImageModalForNode(e.target)
			}
		}

		quill.root.addEventListener('pointerdown', handlePointerDown)
		quill.root.addEventListener('click', handleClick)
		quill.root.addEventListener('dblclick', handleDblClick)
		quill.root.addEventListener('contextmenu', handleContextMenu)
		window.addEventListener('pointermove', handlePointerMove)
		window.addEventListener('pointerup', finishPointerDrag)
		window.addEventListener('pointercancel', finishPointerDrag)

		return () => {
			quill.root.removeEventListener('pointerdown', handlePointerDown)
			quill.root.removeEventListener('click', handleClick)
			quill.root.removeEventListener('dblclick', handleDblClick)
			quill.root.removeEventListener('contextmenu', handleContextMenu)
			window.removeEventListener('pointermove', handlePointerMove)
			window.removeEventListener('pointerup', finishPointerDrag)
			window.removeEventListener('pointercancel', finishPointerDrag)
			document.body.style.userSelect = ''
		}
	}, [openImageModalForNode, persistImageNode, syncImageModalFromNode])

	useEffect(() => {
		if (!imageModal.isOpen || !imageModal.imgNode) return

		const handlePointerDownOutside = (event) => {
			if (event.target === imageModal.imgNode) return
			if (event.target?.closest?.('[data-image-selection-handle="true"]')) return
			closeImageModal()
		}

		const syncOnViewportChange = () => syncImageModalFromNode(imageModal.imgNode)
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				closeImageModal()
			}
		}

		document.addEventListener('pointerdown', handlePointerDownOutside)
		window.addEventListener('resize', syncOnViewportChange)
		window.addEventListener('scroll', syncOnViewportChange, true)
		window.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDownOutside)
			window.removeEventListener('resize', syncOnViewportChange)
			window.removeEventListener('scroll', syncOnViewportChange, true)
			window.removeEventListener('keydown', handleEscape)
		}
	}, [closeImageModal, imageModal.imgNode, imageModal.isOpen, syncImageModalFromNode])

	const modules = useMemo(
		() => ({
			toolbar: {
				container: TOOLBAR_OPTIONS,
				handlers: {
					link: function () {
						openLinkModal(this.quill)
					},
					image: function () {
						quillInstanceRef.current = this.quill
						fileInputRef.current?.click()
					},
				},
			},
			clipboard: {
				matchVisual: false,
			},
			imageResize: {
				parchment: Quill.import('parchment'),
				modules: ['Resize', 'DisplaySize'],
			},
		}),
		[openLinkModal]
	)

	return (
		<div ref={editorShellRef} className="blog-editor-shell relative rounded-xl border border-slate-700/80 bg-slate-950/60 text-slate-100">
			<ReactQuill
				ref={reactQuillRef}
				theme="snow"
				value={value}
				onChange={handleEditorChange}
				placeholder={placeholder}
				modules={modules}
				formats={FORMATS}
			/>

			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleImageUpload}
			/>

			{imageModal.isOpen && (
				<div className="absolute inset-0 z-[60] rounded-xl pointer-events-none">
					{imageModal.frame && !isTransformingImage ? (
						<div
							className="absolute rounded-[1.25rem] border border-violet-400/80 bg-violet-500/5 shadow-[0_0_0_1px_rgba(139,92,246,0.2)]"
							style={{
								top: `${imageModal.frame.top - 4}px`,
								left: `${imageModal.frame.left - 4}px`,
								width: `${imageModal.frame.width + 8}px`,
								height: `${imageModal.frame.height + 8}px`,
							}}
						>
							{IMAGE_RESIZE_HANDLES.map((handle) => (
								<button
									key={handle.key}
									type="button"
									data-image-selection-handle="true"
									onPointerDown={(event) => beginImageResize(handle.key, event)}
									className={`absolute h-5 w-5 rounded-full border border-violet-300 bg-white shadow-lg shadow-violet-900/30 ${handle.className}`}
								/>
							))}
						</div>
					) : null}
				</div>
			)}

			{linkModal.isOpen && (
				<div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl backdrop-blur-sm">
					<div
						role="dialog"
						aria-modal="true"
						aria-label="Insert link"
						className="bg-slate-900 border border-slate-700/80 rounded-xl p-5 w-full max-w-sm shadow-xl"
					>
						<h3 className="text-sm font-bold text-white mb-4">Insert Link</h3>
						<div className="space-y-3">
							<div>
								<label className="block text-xs text-slate-400 mb-1">URL</label>
								<input
									type="url"
									value={linkModal.url}
									onChange={(e) => setLinkModal({ ...linkModal, url: e.target.value })}
									onKeyDown={handleLinkKeyDown}
									className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
									placeholder="https://example.com"
									required
									autoFocus
								/>
							</div>
							{(!linkModal.range || linkModal.range.length === 0) && (
								<div>
									<label className="block text-xs text-slate-400 mb-1">Text to display</label>
									<input
										type="text"
										value={linkModal.text}
										onChange={(e) => setLinkModal({ ...linkModal, text: e.target.value })}
										onKeyDown={handleLinkKeyDown}
										className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
										placeholder="Link text"
									/>
								</div>
							)}
						</div>
						<div className="flex justify-end gap-2 mt-6">
							<button
								type="button"
								onClick={closeLinkModal}
								className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={insertLink}
								className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
							>
								Insert
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default BlogEditor
