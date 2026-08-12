import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { BubbleMenu as BubbleMenuExtension } from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { TextAlign } from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Youtube } from '@tiptap/extension-youtube';
import sanitizeHtml from 'sanitize-html';
import { contentServices } from '../services/contentService';
import { isRawMarkdown, convertMarkdownToHtml } from './editor/MarkdownConverter';
import FullColorPicker from './editor/FullColorPicker';
import { ResizableImageNode } from './editor/ResizableImageNode';

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, CheckSquare, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon,
  Unlink, Image as ImageIcon, Table as TableIcon, Quote, Minus, Undo, Redo, Video, Sparkles,
  Type, Palette, Highlighter, Plus, Trash2, Check, X, Upload, ChevronDown, ChevronRight,
  PanelLeftClose, PanelLeftOpen, SlidersHorizontal, Layers
} from 'lucide-react';

// Approved brand font families
const FONT_FAMILIES = [
  { name: 'Default (Sans)', value: 'Inter, sans-serif' },
  { name: 'Mograph Display', value: 'Mograph, sans-serif' },
  { name: 'Space Monospace', value: 'Space Mono, monospace' },
  { name: 'Bebas Neue', value: 'Bebas Neue, sans-serif' },
];

// Sanitize HTML helper
const sanitizeEditorHtml = (html) => {
  if (!html) return '';
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'code', 'pre', 'blockquote', 'ul', 'ol', 'li', 'input', 'a', 'img', 'iframe',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div', 'br'
    ],
    allowedAttributes: {
      '*': ['class', 'style', 'data-*', 'id'],
      'a': ['href', 'target', 'rel', 'name'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'data-align', 'data-caption'],
      'iframe': ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
      'input': ['type', 'checked', 'disabled'],
      'th': ['colspan', 'rowspan', 'colwidth'],
      'td': ['colspan', 'rowspan', 'colwidth'],
    },
    allowedStyles: {
      '*': {
        'color': [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^hsl\(/i],
        'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgba\(/i, /^rgb\(/i, /^hsl\(/i, /^transparent$/i],
        'font-family': [/^[a-zA-Z0-9\s,-]+$/i],
        'text-align': [/^(left|center|right|justify)$/i],
        'float': [/^(left|right|none)$/i],
        'margin': [/.*$/],
        'margin-left': [/.*$/],
        'margin-right': [/.*$/],
        'margin-bottom': [/.*$/],
        'width': [/.*$/],
        'height': [/.*$/],
      }
    }
  });
};

export default function RichTextEditor({ value = '', onChange, placeholder = "Start writing or type '/' for commands..." }) {
  // Modal & Popup States
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTargetBlank, setLinkTargetBlank] = useState(true);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Full Color Control States
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  const [activeFlyoutGroup, setActiveFlyoutGroup] = useState(null); // 'headings' | 'fonts' | 'text-style' | 'align'

  // Side Rail Collapsible State
  const [railCollapsed, setRailCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pb_editor_rail_collapsed') === 'true';
    }
    return false;
  });

  // Slash Commands State
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [slashIndex, setSlashIndex] = useState(0);
  const [slashMenuPos, setSlashMenuPos] = useState({ top: 0, left: 0 });

  const editorRef = useRef(null);

  // Initial Content Prep (Markdown Migration Pass if raw markdown detected)
  const getInitialContent = () => {
    if (!value) return '';
    if (isRawMarkdown(value)) {
      return convertMarkdownToHtml(value);
    }
    return value;
  };

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false,
      }),
      Typography,
      BubbleMenuExtension,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      ResizableImageNode,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'w-full border-collapse border border-zinc-800 my-4 text-sm',
        },
      }),
      TableRow.configure({
        HTMLAttributes: { class: 'border-b border-zinc-800' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'bg-zinc-900 border border-zinc-800 px-4 py-2 font-mono text-xs text-zinc-300 font-bold text-left' },
      }),
      TableCell.configure({
        HTMLAttributes: { class: 'border border-zinc-800 px-4 py-2 text-zinc-300' },
      }),
      TaskList.configure({
        HTMLAttributes: { class: 'space-y-2 my-4 pl-2' },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'flex items-start gap-2 text-zinc-300' },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: { class: 'w-full aspect-video rounded-xl border border-zinc-800 my-6 shadow-2xl overflow-hidden' },
      }),
    ],
    content: getInitialContent(),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const sanitized = sanitizeEditorHtml(html);
      if (onChange) {
        onChange(sanitized);
      }

      // Slash Command '/' check
      const { selection } = editor.state;
      const { $from } = selection;
      const currentLineText = $from.nodeBefore ? $from.nodeBefore.text || '' : '';

      if (currentLineText.endsWith('/')) {
        const coords = editor.view.coordsAtPos(selection.from);
        const editorBounds = editorRef.current?.getBoundingClientRect();
        if (editorBounds) {
          setSlashMenuPos({
            top: coords.bottom - editorBounds.top + 8,
            left: coords.left - editorBounds.left,
          });
          setSlashQuery('');
          setSlashIndex(0);
          setSlashMenuOpen(true);
        }
      } else if (slashMenuOpen) {
        const match = currentLineText.match(/\/([a-zA-Z0-9]*)$/);
        if (match) {
          setSlashQuery(match[1].toLowerCase());
        } else {
          setSlashMenuOpen(false);
        }
      }
    },
  });

  // Sync external value & perform automatic Markdown conversion pass
  useEffect(() => {
    if (editor && value !== undefined) {
      let nextContent = value || '';
      if (isRawMarkdown(nextContent)) {
        nextContent = convertMarkdownToHtml(nextContent);
      }
      if (nextContent !== editor.getHTML() && !editor.isFocused) {
        editor.commands.setContent(nextContent, false);
      }
    }
  }, [value, editor]);

  // Persist Side Rail collapsed preference
  const toggleSideRail = () => {
    setRailCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('pb_editor_rail_collapsed', String(next));
      return next;
    });
  };

  // Slash Commands List
  const slashCommands = [
    { title: 'Heading 1', description: 'Large section header', icon: Heading1, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleHeading({ level: 1 }).run() },
    { title: 'Heading 2', description: 'Medium section header', icon: Heading2, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleHeading({ level: 2 }).run() },
    { title: 'Heading 3', description: 'Small section header', icon: Heading3, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleHeading({ level: 3 }).run() },
    { title: 'Bullet List', description: 'Create bulleted list', icon: List, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleBulletList().run() },
    { title: 'Numbered List', description: 'Create numbered list', icon: ListOrdered, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleOrderedList().run() },
    { title: 'Checklist', description: 'Task checklist items', icon: CheckSquare, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleTaskList().run() },
    { title: 'Pull Quote', description: 'Orange-accented quote box', icon: Quote, command: () => editor.chain().focus().deleteRange(getSlashRange()).toggleBlockquote().run() },
    { title: 'Resizable Image', description: 'Insert image with alt & text-wrap', icon: ImageIcon, command: () => { editor.chain().focus().deleteRange(getSlashRange()).run(); setIsImageModalOpen(true); } },
    { title: 'Table', description: 'Customizable grid table', icon: TableIcon, command: () => { editor.chain().focus().deleteRange(getSlashRange()).run(); setIsTableModalOpen(true); } },
    { title: 'Divider Line', description: 'Horizontal separator', icon: Minus, command: () => editor.chain().focus().deleteRange(getSlashRange()).setHorizontalRule().run() },
    { title: 'YouTube Video', description: 'Embed video player', icon: Video, command: () => { editor.chain().focus().deleteRange(getSlashRange()).run(); setIsYoutubeModalOpen(true); } },
  ];

  const filteredSlashCommands = slashCommands.filter(item =>
    item.title.toLowerCase().includes(slashQuery) || item.description.toLowerCase().includes(slashQuery)
  );

  const getSlashRange = () => {
    if (!editor) return null;
    const { selection } = editor.state;
    const { $from } = selection;
    const currentLineText = $from.nodeBefore ? $from.nodeBefore.text || '' : '';
    const match = currentLineText.match(/\/([a-zA-Z0-9]*)$/);
    if (match) {
      const slashStart = selection.from - match[0].length;
      return { from: slashStart, to: selection.from };
    }
    return { from: selection.from - 1, to: selection.from };
  };

  const handleKeyDown = (e) => {
    if (!slashMenuOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSlashIndex(prev => (prev + 1) % (filteredSlashCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSlashIndex(prev => (prev - 1 + filteredSlashCommands.length) % (filteredSlashCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSlashCommands[slashIndex]) {
        filteredSlashCommands[slashIndex].command();
        setSlashMenuOpen(false);
      }
    } else if (e.key === 'Escape') {
      setSlashMenuOpen(false);
    }
  };

  const handleApplyLink = () => {
    if (!editor) return;
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      const href = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') ? linkUrl : `https://${linkUrl}`;
      editor.chain().focus().extendMarkRange('link').setLink({
        href,
        target: linkTargetBlank ? '_blank' : '_self',
        rel: 'noopener noreferrer'
      }).run();
    }
    setIsLinkModalOpen(false);
    setLinkUrl('');
  };

  const [imageModalTab, setImageModalTab] = useState('upload'); // 'upload' | 'url'
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');

  const handleImageFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFileName(file.name);
    setUploadingImage(true);
    try {
      const url = await contentServices.uploadFile(file);
      if (url) {
        setImageUrl(url);
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleApplyImage = () => {
    if (!editor || !imageUrl) return;
    editor.chain().focus().insertContent({
      type: 'image',
      attrs: {
        src: imageUrl,
        alt: imageAlt || 'Article graphic',
        caption: '',
        width: '100%',
        alignment: 'center',
        float: 'none'
      }
    }).run();

    setIsImageModalOpen(false);
    setImageUrl('');
    setImageAlt('');
    setSelectedFileName('No file chosen');
  };

  const handleApplyTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    setIsTableModalOpen(false);
  };

  const handleApplyYoutube = () => {
    if (!editor || !youtubeUrl) return;
    editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
    setIsYoutubeModalOpen(false);
    setYoutubeUrl('');
  };

  if (!editor) return null;

  return (
    <div
      ref={editorRef}
      onKeyDown={handleKeyDown}
      className="rich-text-editor-container relative flex border border-zinc-800 rounded-2xl bg-zinc-950 overflow-hidden shadow-2xl text-zinc-100 min-h-[500px]"
    >
      {/* ── 1. VERTICAL SIDE RAIL TOOLBAR ───────────────────────────────────── */}
      <div
        className={`vertical-side-rail sticky top-0 h-full border-r border-zinc-800/90 bg-zinc-900/95 backdrop-blur-md flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
          railCollapsed ? 'w-14' : 'w-44'
        }`}
      >
        {/* Rail Header & Collapse Toggle */}
        <div className="p-2 border-b border-zinc-800 flex items-center justify-between">
          {!railCollapsed && (
            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest pl-2">
              Toolbar
            </span>
          )}
          <button
            type="button"
            onClick={toggleSideRail}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors mx-auto"
            title={railCollapsed ? 'Expand Side Rail' : 'Collapse Side Rail'}
          >
            {railCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Rail Tool Groups */}
        <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
          {/* Group 1: Undo / Redo */}
          <div className="space-y-1">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">History</span>
            )}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (Cmd+Z)"
                className="flex-1 p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition-colors flex justify-center"
              >
                <Undo size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (Cmd+Shift+Z)"
                className="flex-1 p-2 text-zinc-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-zinc-800 transition-colors flex justify-center"
              >
                <Redo size={15} />
              </button>
            </div>
          </div>

          {/* Group 2: Headings & Typography */}
          <div className="space-y-1 relative">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">Headings</span>
            )}
            <button
              type="button"
              onClick={() => setActiveFlyoutGroup(activeFlyoutGroup === 'headings' ? null : 'headings')}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-colors ${
                activeFlyoutGroup === 'headings' ? 'bg-indigo-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heading1 size={16} className="text-indigo-400" />
                {!railCollapsed && <span className="truncate">Headings</span>}
              </div>
              {!railCollapsed && <ChevronRight size={14} className="text-zinc-500" />}
            </button>

            {/* Headings Flyout Panel */}
            {activeFlyoutGroup === 'headings' && (
              <div className="absolute top-0 left-full ml-2 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 z-40 space-y-1 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => { editor.chain().focus().setParagraph().run(); setActiveFlyoutGroup(null); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded flex items-center justify-between"
                >
                  <span>Paragraph</span>
                  {!editor.isActive('heading') && <Check size={14} className="text-indigo-400" />}
                </button>
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => { editor.chain().focus().toggleHeading({ level: lvl }).run(); setActiveFlyoutGroup(null); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 rounded flex items-center justify-between"
                  >
                    <span>Heading {lvl}</span>
                    {editor.isActive('heading', { level: lvl }) && <Check size={14} className="text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group 3: Text & Highlight Color Control */}
          <div className="space-y-1 relative">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">Colors</span>
            )}
            {/* Text Color Button */}
            <button
              type="button"
              onClick={() => {
                setShowTextColorPicker(!showTextColorPicker);
                setShowHighlightColorPicker(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-mono text-zinc-300 hover:bg-zinc-800 transition-colors"
              title="Full Text Color Control"
            >
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-[#ff6b35]" />
                {!railCollapsed && <span>Text Color</span>}
              </div>
              {!railCollapsed && <ChevronRight size={14} className="text-zinc-500" />}
            </button>

            {/* Background Highlight Button */}
            <button
              type="button"
              onClick={() => {
                setShowHighlightColorPicker(!showHighlightColorPicker);
                setShowTextColorPicker(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-mono text-zinc-300 hover:bg-zinc-800 transition-colors"
              title="Full Highlight Color Control"
            >
              <div className="flex items-center gap-2">
                <Highlighter size={16} className="text-[#1e90ff]" />
                {!railCollapsed && <span>Highlight</span>}
              </div>
              {!railCollapsed && <ChevronRight size={14} className="text-zinc-500" />}
            </button>

            {/* Popover: Full Text Color Picker */}
            {showTextColorPicker && (
              <div className="absolute top-0 left-full ml-2 z-50">
                <FullColorPicker
                  title="Text Color"
                  color={editor.getAttributes('textStyle').color || '#ffffff'}
                  onChange={(hex) => editor.chain().focus().setColor(hex).run()}
                  onClear={() => editor.chain().focus().unsetColor().run()}
                  onClose={() => setShowTextColorPicker(false)}
                />
              </div>
            )}

            {/* Popover: Full Highlight Color Picker */}
            {showHighlightColorPicker && (
              <div className="absolute top-10 left-full ml-2 z-50">
                <FullColorPicker
                  title="Background Highlight"
                  color={editor.getAttributes('highlight').color || 'transparent'}
                  onChange={(hex) => editor.chain().focus().toggleHighlight({ color: hex }).run()}
                  onClear={() => editor.chain().focus().unsetHighlight().run()}
                  onClose={() => setShowHighlightColorPicker(false)}
                />
              </div>
            )}
          </div>

          {/* Group 4: Text Formatting (Bold, Italic, Underline, Strike, Code) */}
          <div className="space-y-1">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">Formatting</span>
            )}
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Bold (Cmd+B)"
              >
                <Bold size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Italic (Cmd+I)"
              >
                <Italic size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('underline') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Underline (Cmd+U)"
              >
                <UnderlineIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('strike') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Strikethrough"
              >
                <Strikethrough size={15} />
              </button>
            </div>
          </div>

          {/* Group 5: Lists & Alignment */}
          <div className="space-y-1">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">Lists & Align</span>
            )}
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Bullet List"
              >
                <List size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('orderedList') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Numbered List"
              >
                <ListOrdered size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Align Left"
              >
                <AlignLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Align Center"
              >
                <AlignCenter size={15} />
              </button>
            </div>
          </div>

          {/* Group 6: Media & Inserts */}
          <div className="space-y-1">
            {!railCollapsed && (
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest px-2">Media & Embed</span>
            )}
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors flex justify-center"
                title="Insert Resizable Image with Alt Text"
              >
                <ImageIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const prev = editor.getAttributes('link').href;
                  setLinkUrl(prev || '');
                  setIsLinkModalOpen(true);
                }}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  editor.isActive('link') ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title="Insert Link"
              >
                <LinkIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsTableModalOpen(true)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors flex justify-center"
                title="Insert Table"
              >
                <TableIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(true)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors flex justify-center"
                title="Embed YouTube Video"
              >
                <Video size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Rail Footer (Shortcuts Hint) */}
        {!railCollapsed && (
          <div className="p-3 border-t border-zinc-800 text-[10px] font-mono text-zinc-500">
            Type <span className="text-indigo-400 font-bold">/</span> for Slash Menu
          </div>
        )}
      </div>

      {/* ── 2. WRITING CANVAS AREA ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-h-0 bg-zinc-950 overflow-y-auto">
        <div className="editor-content-wrapper p-6 sm:p-10 max-w-4xl mx-auto w-full flex-1">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* ── 3. FLOATING BUBBLE TOOLBAR (Selection Menu) ────────────────────── */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 150, placement: 'top' }}
          className="bubble-menu flex items-center gap-1 bg-zinc-900/95 border border-zinc-700/80 rounded-lg p-1.5 shadow-2xl backdrop-blur-md text-xs font-mono"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${editor.isActive('bold') ? 'bg-indigo-500/30 text-indigo-400' : 'text-zinc-300 hover:text-white'}`}
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${editor.isActive('italic') ? 'bg-indigo-500/30 text-indigo-400' : 'text-zinc-300 hover:text-white'}`}
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 rounded ${editor.isActive('underline') ? 'bg-indigo-500/30 text-indigo-400' : 'text-zinc-300 hover:text-white'}`}
          >
            <UnderlineIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href;
              setLinkUrl(previousUrl || '');
              setIsLinkModalOpen(true);
            }}
            className={`p-1 rounded ${editor.isActive('link') ? 'bg-indigo-500/30 text-indigo-400' : 'text-zinc-300 hover:text-white'}`}
          >
            <LinkIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#ff6b35').run()}
            className="p-1 text-[#ff6b35] hover:scale-110 transition-transform"
            title="Brand Orange Accent"
          >
            ●
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setColor('#1e90ff').run()}
            className="p-1 text-[#1e90ff] hover:scale-110 transition-transform"
            title="Brand Blue Accent"
          >
            ●
          </button>
        </BubbleMenu>
      )}

      {/* ── 4. SLASH COMMANDS POPUP MENU (`/` Trigger) ────────────────────── */}
      {slashMenuOpen && (
        <div
          style={{ top: slashMenuPos.top, left: slashMenuPos.left }}
          className="slash-menu absolute z-50 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono text-[#ff6b35] font-bold tracking-widest border-b border-zinc-800 uppercase flex items-center justify-between">
            <span>[ SLASH COMMANDS ]</span>
            <Sparkles size={12} />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredSlashCommands.length === 0 ? (
              <div className="px-3 py-2 text-xs text-zinc-500 font-mono">No matching command</div>
            ) : (
              filteredSlashCommands.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = idx === slashIndex;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      item.command();
                      setSlashMenuOpen(false);
                    }}
                    onMouseEnter={() => setSlashIndex(idx)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-indigo-500/20 text-white border-l-2 border-indigo-500' : 'text-zinc-400 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className={`p-1.5 rounded bg-zinc-800 ${isSelected ? 'text-indigo-400' : 'text-zinc-400'}`}>
                      <IconComponent size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{item.title}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{item.description}</div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── 5. MODAL DIALOGS (Link, Image + Alt Text, Table, YouTube) ───────── */}

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-mono text-sm font-bold text-zinc-200 uppercase tracking-wider">Insert / Edit Link</h3>
              <button type="button" onClick={() => setIsLinkModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">URL Target</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={linkTargetBlank}
                onChange={(e) => setLinkTargetBlank(e.target.checked)}
                className="rounded bg-zinc-950 border-zinc-700 text-indigo-500 focus:ring-0"
              />
              Open in new tab (_blank)
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setIsLinkModalOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-mono text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                Remove Link
              </button>
              <button
                type="button"
                onClick={handleApplyLink}
                className="px-4 py-1.5 text-xs font-mono bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded transition-colors"
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Image Modal (Exact match to reference image) */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-zinc-800 rounded-2xl p-6 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Insert Image</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Upload an image or provide a link.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsImageModalOpen(false);
                  setImageUrl('');
                  setImageAlt('');
                  setSelectedFileName('No file chosen');
                }}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Bar: [ Upload ] | [ URL ] */}
            <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800/90">
              <button
                type="button"
                onClick={() => setImageModalTab('upload')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                  imageModalTab === 'upload' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setImageModalTab('url')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                  imageModalTab === 'url' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                URL
              </button>
            </div>

            {/* TAB CONTENT: UPLOAD */}
            {imageModalTab === 'upload' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">Image File</label>
                  <label className="flex items-center justify-between px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer hover:border-sky-500/50 transition-colors group">
                    <span className="px-3 py-1 bg-zinc-800 group-hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0">
                      {uploadingImage ? 'Uploading...' : 'Choose File'}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 truncate ml-3 flex-1">
                      {selectedFileName}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {imageUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 max-h-36 flex items-center justify-center p-2">
                    <img src={imageUrl} alt="Preview" className="max-h-32 object-contain rounded-lg" />
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono rounded-md flex items-center gap-1">
                      <Check size={12} /> Uploaded & Saved
                    </span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">Alt Text (Description)</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Brief description for SEO/Accessibility"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: URL */}
            {imageModalTab === 'url' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">Image Web Link (URL)</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/graphic.png"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-zinc-300">Alt Text (Description)</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Brief description for SEO/Accessibility"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsImageModalOpen(false);
                  setImageUrl('');
                  setImageAlt('');
                  setSelectedFileName('No file chosen');
                }}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyImage}
                disabled={!imageUrl}
                className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-500/20 cursor-pointer transition-colors"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Insertion Modal */}
      {isTableModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-mono text-sm font-bold text-zinc-200 uppercase tracking-wider">Insert Data Table</h3>
              <button type="button" onClick={() => setIsTableModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value) || 2)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value) || 2)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleApplyTable}
                className="px-4 py-1.5 text-xs font-mono bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded transition-colors"
              >
                Insert Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Modal */}
      {isYoutubeModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-mono text-sm font-bold text-zinc-200 uppercase tracking-wider">Embed Video</h3>
              <button type="button" onClick={() => setIsYoutubeModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">YouTube URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-sm text-zinc-100"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleApplyYoutube}
                className="px-4 py-1.5 text-xs font-mono bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded transition-colors"
              >
                Embed Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
