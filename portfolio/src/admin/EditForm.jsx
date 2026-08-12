import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, Plus, ChevronUp, ChevronDown, Check, Image as ImageIcon, ArrowLeft,
  SlidersHorizontal, Search, Sparkles, Globe, Calendar, Clock, Tag, Folder, Eye, Layers
} from 'lucide-react';
import { contentServices } from '../services/contentService';
import RichTextEditor from './RichTextEditor';

const getSeoTitleColor = (length) => {
  if (length === 0) return '#71717a';
  if (length < 30) return '#71717a';
  if (length <= 60) return '#22c55e';
  if (length <= 70) return '#f59e0b';
  return '#ef4444';
};

const getSeoDescColor = (length) => {
  if (length === 0) return '#71717a';
  if (length < 100) return '#71717a';
  if (length <= 160) return '#22c55e';
  if (length <= 180) return '#f59e0b';
  return '#ef4444';
};

const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const ImageUpload = ({ label, value, onChange, className = '' }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await contentServices.uploadFile(file);
      if (url) {
        onChange(url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">{label}</label>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-black/70 text-zinc-300 hover:text-white rounded-lg backdrop-blur-md transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 hover:border-sky-500/50 rounded-xl p-6 text-center cursor-pointer transition-all bg-zinc-950/60 group">
          <Upload className="text-zinc-500 group-hover:text-sky-400 mb-2 transition-colors" size={22} />
          <span className="text-xs text-zinc-300 font-medium">
            {uploading ? 'Uploading graphic...' : 'Click or drop image file'}
          </span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
    </div>
  );
};

const TagsInput = ({ tags = [], onChange }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input.trim();
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
      }
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 p-2 bg-zinc-950 border border-zinc-800 rounded-xl min-h-[42px]">
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800 text-zinc-200 text-xs font-mono rounded-lg border border-zinc-700">
            {tag}
            <button type="button" onClick={() => removeTag(index)} className="hover:text-red-400">
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Type tag and press Enter..." : ""}
          className="flex-1 bg-transparent border-none focus:outline-none text-xs text-zinc-100 placeholder-zinc-500 min-w-[120px]"
        />
      </div>
    </div>
  );
};

const GalleryManager = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const galleryList = Array.isArray(formData.gallery) ? formData.gallery : [];

  const updateGallery = (newList) => {
    setFormData((prev) => ({
      ...prev,
      gallery: newList,
      images: newList.map((item) => (typeof item === 'string' ? item : item.url)).filter(Boolean),
    }));
  };

  const handleBatchUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await contentServices.uploadFile(file);
        if (url) uploadedUrls.push(url);
      }

      const newGalleryItems = uploadedUrls.map((url) => ({
        url,
        caption: '',
        alt: '',
      }));

      updateGallery([...galleryList, ...newGalleryItems]);
    } catch (err) {
      console.error('Batch upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newList = galleryList.filter((_, i) => i !== index);
    updateGallery(newList);
  };

  const handleMoveImage = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= galleryList.length) return;
    const newList = [...galleryList];
    const [moved] = newList.splice(fromIdx, 1);
    newList.splice(toIdx, 0, moved);
    updateGallery(newList);
  };

  const handleCaptionChange = (idx, caption) => {
    const newList = [...galleryList];
    newList[idx] = { ...newList[idx], caption };
    updateGallery(newList);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-xl">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <ImageIcon size={18} className="text-sky-400" /> Project Image Gallery & Scrubber Assets
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Upload multiple artwork graphics. These images populate project detail pages and desktop hover scrubbers.
          </p>
        </div>

        <label className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-lg shadow-sky-600/20 shrink-0">
          <Upload size={15} />
          {uploading ? 'Uploading...' : '+ Add Gallery Images'}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleBatchUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {galleryList.length === 0 && (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800 hover:border-sky-500/50 bg-zinc-950/40 rounded-2xl cursor-pointer transition-all group">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-sky-400 group-hover:scale-110 transition-all shadow-md">
            <Upload size={20} />
          </div>
          <span className="text-sm font-medium text-zinc-200 mt-4">No gallery images uploaded</span>
          <span className="text-xs text-zinc-500 mt-1">Click to select and batch upload artwork graphics</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleBatchUpload}
            disabled={uploading}
          />
        </label>
      )}

      {galleryList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryList.map((item, idx) => {
            const imgUrl = typeof item === 'string' ? item : item.url;
            return (
              <div key={idx} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg space-y-2 p-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
                  <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => handleMoveImage(idx, idx - 1)}
                      disabled={idx === 0}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-200 rounded-lg transition-colors"
                      title="Move Left"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveImage(idx, idx + 1)}
                      disabled={idx === galleryList.length - 1}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-200 rounded-lg transition-colors rotate-180"
                      title="Move Right"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                      title="Delete Image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Image caption..."
                  value={typeof item === 'object' ? item.caption || '' : ''}
                  onChange={(e) => handleCaptionChange(idx, e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-sky-500/50"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function EditForm({ item = {}, type, onCancel, onSave, allWorks = [], allBlogs = [] }) {
  const [formData, setFormData] = useState({ ...item });
  const [inspectorTab, setInspectorTab] = useState('settings'); // 'settings' | 'seo'
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSave(formData);
    setHasChanges(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const categoryOptions = [
    'Graphic Design',
    'Brand Identity & Rebranding',
    'UI/UX & Web Design',
    'Motion Graphics',
    'Development',
    'Editorial Design',
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-50 min-h-screen">
      {/* ── 1. TOP BAR HEADER (Matches exact reference image) ───────────────── */}
      <div className="bg-zinc-950 border-b border-zinc-800/80 px-6 py-4 space-y-2 sticky top-0 z-30 backdrop-blur-md">
        <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Layers size={13} className="text-sky-400" />
          {type === 'works' ? 'Works & Case Studies' : type === 'blogs' || type === 'blog' ? 'Blog Posts' : type}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
              title="Back to table"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
              {item.id ? 'Edit Post' : 'New Post'}
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold shadow-md ${
                  formData.status === 'Published'
                    ? 'bg-[#0284c7] text-white shadow-sky-500/20'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {formData.status || 'Draft'}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isSaved && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-emerald-400 flex items-center gap-1 font-mono"
                >
                  <Check size={14} /> Updated
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm rounded-full shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              Update
              {hasChanges && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. SPLIT LAYOUT: EDITOR CANVAS (LEFT) + INSPECTOR SIDEBAR (RIGHT) ── */}
      <div className="flex-1 flex flex-col lg:flex-row h-full min-h-0 overflow-hidden">
        
        {/* LEFT COLUMN: MAIN EDITOR CANVAS */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-zinc-950">
          {/* Post Title Field */}
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Add title..."
              className="w-full text-2xl sm:text-3xl font-bold text-white bg-transparent border-b border-zinc-800 pb-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-zinc-600"
            />
          </div>

          {/* Post Excerpt / Subtitle Field */}
          {(type === 'blogs' || type === 'blog') && (
            <div className="space-y-1">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Post Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt || ''}
                onChange={handleChange}
                rows={2}
                placeholder="Brief summary for blog cards and search engines..."
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-sky-500 resize-none placeholder-zinc-600"
              />
            </div>
          )}

          {/* Visual Rich Text Content Editor */}
          <div className="space-y-2">
            <RichTextEditor
              value={formData.content || ''}
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
              placeholder="Start writing article content or type '/' for slash commands..."
            />
          </div>

          {/* Work Case Study / Gallery Sections if editing a Work item */}
          {type === 'works' && (
            <div className="pt-6 border-t border-zinc-800 space-y-6">
              <GalleryManager formData={formData} setFormData={setFormData} />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INSPECTOR SIDEBAR (Matches exact reference screenshot) */}
        <div className="w-full lg:w-96 border-l border-zinc-800/90 bg-zinc-900/95 p-6 overflow-y-auto shrink-0 shadow-2xl">
          
          {/* Pill Tab Switcher: [ Settings ] | [ SEO ] */}
          <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800/90 mb-6 shadow-inner">
            <button
              type="button"
              onClick={() => setInspectorTab('settings')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                inspectorTab === 'settings'
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <SlidersHorizontal size={14} className="text-sky-400" /> Settings
            </button>
            <button
              type="button"
              onClick={() => setInspectorTab('seo')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                inspectorTab === 'seo'
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Search size={14} className="text-sky-400" /> SEO
            </button>
          </div>

          {/* INSPECTOR TAB CONTENT: SETTINGS */}
          {inspectorTab === 'settings' && (
            <div className="space-y-6">
              
              {/* Section 1: Status & Visibility */}
              <div className="space-y-3 pb-6 border-b border-zinc-800/80">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Eye size={14} className="text-sky-400" /> Status & Visibility
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-xs text-zinc-400 font-medium">Post Status</label>
                  <select
                    name="status"
                    value={formData.status || 'Published'}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 font-medium focus:outline-none focus:border-sky-500 [color-scheme:dark]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Organization / Category */}
              <div className="space-y-3 pb-6 border-b border-zinc-800/80">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Folder size={14} className="text-sky-400" /> Organization
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-xs text-zinc-400 font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 font-medium focus:outline-none focus:border-sky-500 [color-scheme:dark]"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section 3: Featured Image */}
              <div className="space-y-3 pb-6 border-b border-zinc-800/80">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={14} className="text-sky-400" /> Featured Image
                </h4>
                <ImageUpload
                  value={formData.featuredImage || formData.image || ''}
                  onChange={(val) => setFormData((prev) => ({ ...prev, featuredImage: val, image: val }))}
                />
              </div>

              {/* Section 4: Publish Meta */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-sky-400" /> Meta & Publishing
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-zinc-400 font-medium mb-1">Publish Date</label>
                    <input
                      type="date"
                      name="publishDate"
                      value={formData.publishDate || ''}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500 [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 font-medium mb-1">Read Time (minutes)</label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime || '5 min read'}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* INSPECTOR TAB CONTENT: SEO */}
          {inspectorTab === 'seo' && (
            <div className="space-y-6">
              
              {/* Section 1: URL Slug */}
              <div className="space-y-1.5 pb-4 border-b border-zinc-800/80">
                <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Section 2: SEO Title */}
              <div className="space-y-1.5 pb-4 border-b border-zinc-800/80">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">SEO Title</label>
                  <span className="text-[10px] font-mono" style={{ color: getSeoTitleColor((formData.seoTitle || '').length) }}>
                    {(formData.seoTitle || '').length} / 60
                  </span>
                </div>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle || ''}
                  onChange={handleChange}
                  placeholder="SEO meta title..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Section 3: SEO Description */}
              <div className="space-y-1.5 pb-4 border-b border-zinc-800/80">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">SEO Description</label>
                  <span className="text-[10px] font-mono" style={{ color: getSeoDescColor((formData.seoDescription || '').length) }}>
                    {(formData.seoDescription || '').length} / 160
                  </span>
                </div>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Compelling meta description for search results..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {/* Section 4: Social Share Image (OG Image) */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">Social Share (OG) Image</label>
                <ImageUpload
                  value={formData.seoImage || ''}
                  onChange={(val) => setFormData((prev) => ({ ...prev, seoImage: val }))}
                />
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
