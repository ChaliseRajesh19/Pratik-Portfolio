import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Parchment = Quill.import('parchment')
const LineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', {
	scope: Parchment.Scope.BLOCK,
	whitelist: ['1', '1.15', '1.5', '1.75', '2', '2.5'],
})

Quill.register(LineHeightStyle, true)

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
]

function BlogEditor({ value, onChange, placeholder = 'Write your post here...' }) {
	return (
		<div className="blog-editor-shell rounded-xl border border-slate-700/80 bg-slate-950/60 text-slate-100 overflow-hidden">
			<ReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				modules={{
					toolbar: TOOLBAR_OPTIONS,
					clipboard: {
						matchVisual: false,
					},
				}}
				formats={FORMATS}
			/>
		</div>
	)
}

export default BlogEditor
