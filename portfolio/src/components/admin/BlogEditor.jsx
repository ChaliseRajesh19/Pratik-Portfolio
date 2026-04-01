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
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style']

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
	freeX: '',
	freeY: '',
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
	return {
		freeX: img.style.left ? img.style.left.replace('px', '') : '',
		freeY: img.style.top ? img.style.top.replace('px', '') : '',
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

function applyImagePreset(img, imageModal) {
	const preset = IMAGE_PRESETS[imageModal.preset] || IMAGE_PRESETS.center
	const nextWidth = imageModal.width?.trim()
	const placementKey =
		imageModal.preset === 'free'
			? 'free'
			: imageModal.preset === 'leftWrap'
			? 'left'
			: imageModal.preset === 'rightWrap'
				? 'right'
				: imageModal.preset === 'topBottom'
					? 'topBottom'
					: imageModal.preset === 'inline'
						? 'inline'
						: 'center'

	img.style.float = preset.float === 'none' ? '' : preset.float
	img.style.display = preset.display
	img.style.clear = preset.clear === 'none' ? '' : preset.clear
	img.style.margin = imageModal.margin || preset.margin
	img.style.verticalAlign = preset.verticalAlign || ''
	img.style.maxWidth = '100%'
	img.style.height = 'auto'

	if (placementKey === 'free') {
		img.style.position = 'absolute'
		img.style.left = imageModal.freeX ? `${imageModal.freeX}px` : img.style.left || '0px'
		img.style.top = imageModal.freeY ? `${imageModal.freeY}px` : img.style.top || '0px'
		img.style.zIndex = '5'
		img.style.margin = '0'
	} else {
		img.style.position = ''
		img.style.left = ''
		img.style.top = ''
		img.style.zIndex = ''
	}

	if (nextWidth) {
		img.style.width = /^\d+$/.test(nextWidth) ? `${nextWidth}px` : nextWidth
	} else {
		img.style.removeProperty('width')
	}

	if (imageModal.alt?.trim()) {
		img.setAttribute('alt', imageModal.alt.trim())
	} else {
		img.removeAttribute('alt')
	}

	img.setAttribute('data-placement', placementKey)
}

function getImageModalPosition(img, shell) {
	const imgRect = img.getBoundingClientRect()
	const shellRect = shell?.getBoundingClientRect()

	if (!shellRect) {
		return { top: 24, left: 24 }
	}

	const modalWidth = 380
	const modalHeight = 290
	const gap = 12

	let left = imgRect.right - shellRect.left + gap
	let top = imgRect.top - shellRect.top

	if (left + modalWidth > shellRect.width - 12) {
		left = imgRect.left - shellRect.left - modalWidth - gap
	}

	if (left < 12) {
		left = Math.max(12, shellRect.width - modalWidth - 12)
	}

	if (top + modalHeight > shellRect.height - 12) {
		top = shellRect.height - modalHeight - 12
	}

	if (top < 12) {
		top = 12
	}

	return { top, left }
}

function getDragPlacement(clientX, shellRect) {
	if (!shellRect) return 'center'

	const relativeX = clientX - shellRect.left
	const leftZone = shellRect.width * 0.33
	const rightZone = shellRect.width * 0.67

	if (relativeX <= leftZone) return 'leftWrap'
	if (relativeX >= rightZone) return 'rightWrap'
	return 'center'
}

function applyFreeImagePosition(img, x, y) {
	img.setAttribute('data-placement', 'free')
	img.style.position = 'absolute'
	img.style.float = ''
	img.style.clear = ''
	img.style.display = 'block'
	img.style.left = `${x}px`
	img.style.top = `${y}px`
	img.style.margin = '0'
	img.style.zIndex = '5'
	img.style.height = 'auto'
	img.style.maxWidth = '100%'
}

function BlogEditor({ value, onChange, placeholder = 'Write your post here...' }) {
	const [linkModal, setLinkModal] = useState({ isOpen: false, url: '', text: '', range: null, quill: null })
	const [imageModal, setImageModal] = useState(DEFAULT_IMAGE_MODAL)
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
	})

	const openImageModalForNode = useCallback((img) => {
		const position = getImageModalPosition(img, editorShellRef.current)
		const freePosition = extractFreePosition(img)
		setImageModal({
			isOpen: true,
			imgNode: img,
			preset: inferImagePreset(img),
			width: extractWidth(img),
			margin: img.style.margin || '',
			alt: img.getAttribute('alt') || '',
			position,
			freeX: freePosition.freeX,
			freeY: freePosition.freeY,
		})
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
			quill.insertText(insertAt + 1, '\n', 'user')
			quill.setSelection(insertAt + 2, 0)
		} catch (error) {
			toast.error('Image upload failed: ' + error.message)
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleEditorChange = useCallback(
		(content) => {
			onChange(content)
		},
		[onChange]
	)

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

			imageDragRef.current = {
				active: true,
				moved: false,
				img: e.target,
				startX: e.clientX,
				startY: e.clientY,
				offsetX: e.clientX - e.target.getBoundingClientRect().left,
				offsetY: e.clientY - e.target.getBoundingClientRect().top,
			}

			e.target.classList.add('is-dragging-image')
		}

		const handlePointerMove = (e) => {
			if (!imageDragRef.current.active || !imageDragRef.current.img) return

			const deltaX = Math.abs(e.clientX - imageDragRef.current.startX)
			const deltaY = Math.abs(e.clientY - imageDragRef.current.startY)

			if (deltaX < 8 && deltaY < 8) return

			imageDragRef.current.moved = true
			const img = imageDragRef.current.img
			const editorRect = quill.root.getBoundingClientRect()
			const imgRect = img.getBoundingClientRect()
			const x = Math.max(0, e.clientX - editorRect.left - imageDragRef.current.offsetX)
			const y = Math.max(0, e.clientY - editorRect.top - imageDragRef.current.offsetY)
			const maxX = Math.max(0, editorRect.width - imgRect.width)

			applyFreeImagePosition(img, Math.min(x, maxX), y)
		}

		const finishPointerDrag = () => {
			if (!imageDragRef.current.img) {
				imageDragRef.current.active = false
				return
			}

			const draggedImg = imageDragRef.current.img
			draggedImg.classList.remove('is-dragging-image')

			if (imageDragRef.current.moved) {
				persistImageNode(draggedImg)
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
				offsetX: 0,
				offsetY: 0,
			}
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
		}
	}, [openImageModalForNode, persistImageNode])

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
					<div
						className="absolute pointer-events-auto bg-slate-900/98 border border-slate-700/80 rounded-xl p-4 w-full max-w-md shadow-2xl shadow-black/40"
						style={{
							top: `${imageModal.position?.top ?? 24}px`,
							left: `${imageModal.position?.left ?? 24}px`,
							maxWidth: 'min(380px, calc(100% - 24px))',
						}}
					>
						<h3 className="text-lg font-bold text-white mb-4">Image Placement</h3>
						<div className="space-y-4">
							<div>
								<div className="grid grid-cols-2 gap-2">
									{Object.entries(IMAGE_PRESETS).map(([key, preset]) => (
										<button
											key={key}
											type="button"
											onClick={() => setImageModal((current) => ({ ...current, preset: key, margin: current.margin || preset.margin }))}
											className={`rounded-lg border px-3 py-2 text-sm font-semibold text-left transition-colors ${
												imageModal.preset === key
													? 'border-violet-500 bg-violet-500/15 text-white'
													: 'border-slate-700/70 bg-slate-950/80 text-slate-300 hover:border-slate-500 hover:text-white'
											}`}
										>
											{preset.label}
										</button>
									))}
								</div>
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								<div>
									<label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Width</label>
									<input
										type="text"
										value={imageModal.width}
										onChange={(e) => setImageModal((current) => ({ ...current, width: e.target.value }))}
										className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
										placeholder="320 or 50%"
									/>
								</div>

								<div>
									<label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Alt</label>
									<input
										type="text"
										value={imageModal.alt}
										onChange={(e) => setImageModal((current) => ({ ...current, alt: e.target.value }))}
										className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
										placeholder="Alt text"
									/>
								</div>
							</div>

							{imageModal.preset === 'free' && (
								<div className="grid gap-3 sm:grid-cols-2">
									<div>
										<label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">X</label>
										<input
											type="text"
											value={imageModal.freeX}
											onChange={(e) => setImageModal((current) => ({ ...current, freeX: e.target.value }))}
											className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
											placeholder="0"
										/>
									</div>
									<div>
										<label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Y</label>
										<input
											type="text"
											value={imageModal.freeY}
											onChange={(e) => setImageModal((current) => ({ ...current, freeY: e.target.value }))}
											className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
											placeholder="0"
										/>
									</div>
								</div>
							)}

							<div>
								<label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Margin</label>
								<input
									type="text"
									value={imageModal.margin}
									onChange={(e) => setImageModal((current) => ({ ...current, margin: e.target.value }))}
									className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
									placeholder="e.g. 0 1em 1em 0"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-3 mt-5">
							<button
								type="button"
								onClick={closeImageModal}
								className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									if (imageModal.imgNode && quillInstanceRef.current) {
										const img = imageModal.imgNode
										applyImagePreset(img, imageModal)
										persistImageNode(img)

										setTimeout(() => {
											window.dispatchEvent(new Event('resize'))
										}, 50)
									}

									closeImageModal()
								}}
								className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-violet-500/20 transition-all active:scale-95"
							>
								Apply Settings
							</button>
						</div>
					</div>
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
