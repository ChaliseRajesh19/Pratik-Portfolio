import React, { useState,useEffect, useRef, useCallback, useMemo } from 'react'
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

const WidthStyle = new Parchment.Attributor.Style('width', 'width', {
	scope: Parchment.Scope.INLINE,
})
const HeightStyle = new Parchment.Attributor.Style('height', 'height', {
	scope: Parchment.Scope.INLINE,
})

Quill.register(WidthStyle, true)
Quill.register(HeightStyle, true)

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
]

function normalizeMediaUrl(value) {
	const trimmed = value.trim()
	if (!trimmed) return ''
	if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed
	if (trimmed.startsWith('//')) return `https:${trimmed}`
	return `https://${trimmed}`
}

function BlogEditor({ value, onChange, placeholder = 'Write your post here...' }) {
	const [linkModal, setLinkModal] = useState({ isOpen: false, url: '', text: '', range: null, quill: null })
	const fileInputRef = useRef(null)
	const editorShellRef = useRef(null)
	const quillInstanceRef = useRef(null)
	const reactQuillRef = useRef(null)

	const openLinkModal = useCallback((quill) => {
		const range = quill.getSelection(true)
		setLinkModal({ isOpen: true, url: '', text: '', range, quill })
	}, [])

	const closeLinkModal = () => {
		setLinkModal({ isOpen: false, url: '', text: '', range: null, quill: null })
	}

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
		const insertAt = range?.index ?? quill.getLength()

		try {
			const toastId = toast.loading('Uploading image...')
			const url = await uploadFile(file, 'blog-images')
			toast.dismiss(toastId)
			quill.insertEmbed(insertAt, 'image', url, 'user')
			quill.setSelection(insertAt + 1, 0)
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
	}, [])

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
				modules: ['Resize']
			}
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

			{/* Hidden file input for image uploads */}
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleImageUpload}
			/>

			{/* Custom Link Modal Dialog */}
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
