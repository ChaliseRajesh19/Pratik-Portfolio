import React, { useState, useRef } from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Maximize2, 
  Trash2, 
  Tag, 
  Type, 
  Sparkles 
} from 'lucide-react';

// Custom NodeView Component for Resizable, Movable, Float-Wrapped Image
const ResizableImageComponent = (props) => {
  const { node, updateAttributes, deleteNode, selected } = props;
  const { src, alt, caption, width = '100%', alignment = 'center', float = 'none' } = node.attrs;

  const [isResizing, setIsResizing] = useState(false);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altInput, setAltInput] = useState(alt || '');
  const imageRef = useRef(null);

  // Mouse Drag Resizing
  const handleMouseDown = (e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = imageRef.current ? imageRef.current.offsetWidth : 300;
    const parentWidth = imageRef.current?.parentElement?.offsetWidth || 800;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      let newWidthPx = corner.includes('right') ? startWidth + deltaX : startWidth - deltaX;
      
      // Clamp width between 15% and 100%
      const newWidthPercent = Math.max(15, Math.min(100, Math.round((newWidthPx / parentWidth) * 100)));
      updateAttributes({ width: `${newWidthPercent}%` });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const setAlignment = (newAlign) => {
    if (newAlign === 'left') {
      updateAttributes({ alignment: 'left', float: 'left', width: width === '100%' ? '50%' : width });
    } else if (newAlign === 'right') {
      updateAttributes({ alignment: 'right', float: 'right', width: width === '100%' ? '50%' : width });
    } else if (newAlign === 'full') {
      updateAttributes({ alignment: 'center', float: 'none', width: '100%' });
    } else {
      updateAttributes({ alignment: 'center', float: 'none' });
    }
  };

  const getContainerStyle = () => {
    const style = { width };
    if (float === 'left') {
      style.float = 'left';
      style.marginRight = '1.5rem';
      style.marginBottom = '1rem';
    } else if (float === 'right') {
      style.float = 'right';
      style.marginLeft = '1.5rem';
      style.marginBottom = '1rem';
    } else {
      style.float = 'none';
      if (alignment === 'center') {
        style.marginLeft = 'auto';
        style.marginRight = 'auto';
      } else if (alignment === 'left') {
        style.marginRight = 'auto';
      } else if (alignment === 'right') {
        style.marginLeft = 'auto';
      }
    }
    return style;
  };

  return (
    <NodeViewWrapper className="resizable-image-wrapper my-4 relative group inline-block max-w-full clear-both">
      <div
        style={getContainerStyle()}
        className={`relative rounded-2xl overflow-visible transition-shadow ${
          selected ? 'ring-2 ring-indigo-500 shadow-2xl' : 'hover:ring-1 hover:ring-zinc-700'
        }`}
      >
        {/* Floating Controls Bar (Appears when selected or hovered) */}
        <div
          className={`absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-zinc-900 border border-zinc-700/90 rounded-xl p-1.5 shadow-2xl backdrop-blur-md transition-opacity duration-200 ${
            selected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
          }`}
        >
          {/* Alignment & Float Text Wrap Controls */}
          <button
            type="button"
            onClick={() => setAlignment('left')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
              float === 'left' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            title="Float Left (Text Wrap)"
          >
            <AlignLeft size={14} /> Float Left
          </button>

          <button
            type="button"
            onClick={() => setAlignment('center')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
              alignment === 'center' && float === 'none' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            title="Center Block"
          >
            <AlignCenter size={14} /> Center
          </button>

          <button
            type="button"
            onClick={() => setAlignment('right')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
              float === 'right' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            title="Float Right (Text Wrap)"
          >
            <AlignRight size={14} /> Float Right
          </button>

          <button
            type="button"
            onClick={() => setAlignment('full')}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
              width === '100%' && float === 'none' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            title="Full Width"
          >
            <Maximize2 size={14} /> Full
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 mx-0.5" />

          {/* Alt Text Toggle */}
          <button
            type="button"
            onClick={() => setEditingAlt(!editingAlt)}
            className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors ${
              alt ? 'text-emerald-400 hover:bg-zinc-800' : 'text-amber-400 hover:bg-zinc-800'
            }`}
            title="SEO Alt Text (Required)"
          >
            <Tag size={14} /> {alt ? 'Alt Set' : 'Add Alt'}
          </button>

          <button
            type="button"
            onClick={deleteNode}
            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
            title="Delete Image"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Alt Text Quick Input Popover */}
        {editingAlt && (
          <div className="absolute top-0 left-0 right-0 z-40 bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
              Required SEO Alt Text
            </span>
            <input
              type="text"
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
              placeholder="Descriptive text for accessibility & SEO..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  updateAttributes({ alt: altInput });
                  setEditingAlt(false);
                }}
                className="px-3 py-1 bg-indigo-600 text-white text-xs font-mono font-semibold rounded-md hover:bg-indigo-500"
              >
                Save Alt Text
              </button>
            </div>
          </div>
        )}

        {/* Image Display */}
        <div ref={imageRef} className="relative group/img overflow-hidden rounded-xl bg-zinc-950">
          <img
            src={src}
            alt={alt || 'Blog article graphic'}
            className="w-full h-auto object-cover rounded-xl block shadow-lg"
          />

          {/* Resizing Handles (4 Corners) */}
          {selected && (
            <>
              <div
                onMouseDown={(e) => handleMouseDown(e, 'top-left')}
                className="absolute top-2 left-2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, 'top-right')}
                className="absolute top-2 right-2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
                className="absolute bottom-2 left-2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full cursor-nesw-resize shadow-md hover:scale-125 transition-transform"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
                className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full cursor-nwse-resize shadow-md hover:scale-125 transition-transform"
              />
            </>
          )}
        </div>

        {/* Inline Editable Caption */}
        <div className="mt-1.5 px-2 text-center">
          <input
            type="text"
            value={caption || ''}
            onChange={(e) => updateAttributes({ caption: e.target.value })}
            placeholder="Add an optional image caption..."
            className="w-full text-center bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-sans text-zinc-400 italic placeholder-zinc-600"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

// Define Custom Tiptap Node Extension
export const ResizableImageNode = Node.create({
  name: 'image',
  group: 'block',
  selectable: true,
  draggable: true,
  inline: false,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      caption: { default: '' },
      width: { default: '100%' },
      alignment: { default: 'center' },
      float: { default: 'none' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (element) => ({
          src: element.getAttribute('src'),
          alt: element.getAttribute('alt'),
          caption: element.getAttribute('data-caption') || '',
          width: element.style.width || element.getAttribute('width') || '100%',
          alignment: element.getAttribute('data-align') || 'center',
          float: element.style.float || 'none',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { float, width, alignment, caption } = HTMLAttributes;
    const style = `width: ${width || '100%'}; float: ${float || 'none'};`;
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        style,
        'data-align': alignment,
        'data-caption': caption,
        class: 'resizable-blog-image rounded-xl border border-zinc-800 my-4 shadow-lg',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
