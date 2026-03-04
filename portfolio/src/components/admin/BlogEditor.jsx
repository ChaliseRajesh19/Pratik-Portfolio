import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function BlogEditor({ value, onChange, placeholder = 'Write your post here...' }) {
	return (
		<div className="rounded-xl border border-slate-700/80 bg-slate-950/60 text-slate-100">
			<CKEditor
				editor={ClassicEditor}
				data={value}
				onChange={(_, editor) => {
					const data = editor.getData()
					onChange(data)
				}}
				config={{
					placeholder,
					toolbar: [
						'heading',
						'|',
						'fontFamily',
						'fontSize',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'|',
						'alignment',
						'numberedList',
						'bulletedList',
						'outdent',
						'indent',
						'|',
						'link',
						'blockQuote',
						'insertTable',
						'|',
						'undo',
						'redo'
					],
					fontFamily: {
						supportAllValues: true
					},
					fontSize: {
						supportAllValues: true
					}
				}}
			/>
		</div>
	)
}

export default BlogEditor
