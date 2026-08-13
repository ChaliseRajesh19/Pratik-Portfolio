import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, Plus, ChevronUp, ChevronDown, Check, Image as ImageIcon, ArrowLeft,
  SlidersHorizontal, Search, Sparkles, Globe, Calendar, Clock, Tag, Folder, Eye, Layers, FileText
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
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const url = await contentServices.uploadFile(file);
      if (url) {
        onChange(url);
      }
    } catch (err) {
      console.error("Upload failed", err);
      setUploadError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">{label}</label>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={value} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-zinc-700/80 shadow-md" />
            <div className="text-xs text-zinc-400">
              <span className="text-emerald-400 font-mono font-bold block">✓ Image Selected</span>
              <span className="text-[10px] text-zinc-500 truncate max-w-[180px] block">{uploading ? 'Uploading to storage...' : 'Ready to save'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
            title="Remove image"
          >
            <X size={16} />
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
      {uploadError && (
        <p className="text-xs text-red-400 font-mono mt-1 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
          ⚠️ {uploadError}
        </p>
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

  const isWork = type === 'works' || type === 'work';
  const isBlog = type === 'blogs' || type === 'blog';
  const isTestimonial = type === 'testimonials';
  const isCapability = type === 'capabilities';
  const isMilestone = type === 'milestones';

  // Determine header labels
  const typeLabel = isWork ? 'Works & Case Studies'
    : isBlog ? 'Blog Posts'
    : isTestimonial ? 'Testimonials'
    : isCapability ? 'Capabilities'
    : isMilestone ? 'Milestones'
    : type;

  const editLabel = isWork ? (item.id ? 'Edit Case Study' : 'New Case Study')
    : isBlog ? (item.id ? 'Edit Blog Post' : 'New Blog Post')
    : isTestimonial ? (item.id ? 'Edit Testimonial' : 'New Testimonial')
    : isCapability ? (item.id ? 'Edit Capability' : 'New Capability')
    : isMilestone ? (item.id ? 'Edit Milestone' : 'New Milestone')
    : (item.id ? 'Edit Item' : 'New Item');

  // Simple forms for testimonials, capabilities, milestones
  const isSimpleType = isTestimonial || isCapability || isMilestone;

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-50 min-h-screen">
      {/* ── 1. TOP BAR HEADER ───────────────── */}
      <div className="bg-zinc-950 border-b border-zinc-800/80 px-6 py-4 space-y-2 sticky top-0 z-30 backdrop-blur-md">
        <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Layers size={13} className="text-sky-400" />
          {typeLabel}
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
              {editLabel}
              {(isWork || isBlog || isTestimonial) && (
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold shadow-md ${
                    formData.status === 'Published'
                      ? 'bg-[#0284c7] text-white shadow-sky-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {formData.status || 'Draft'}
                </span>
              )}
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
                  <Check size={14} /> Saved
                </motion.span>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm rounded-full shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              {item.id ? 'Update' : 'Save'}
              {hasChanges && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. FORM BODY ── */}
      {isSimpleType ? (
        /* ──────── SIMPLE FORM: Testimonials, Capabilities, Milestones ──────── */
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* ── TESTIMONIAL FORM ── */}
            {isTestimonial && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Client Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      placeholder="e.g. Niraj Joshi"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={handleChange}
                      placeholder="e.g. Joshi Media"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Role / Title</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ''}
                      onChange={handleChange}
                      placeholder="e.g. Founder"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order || ''}
                      onChange={handleChange}
                      placeholder="1"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Testimonial Quote</label>
                  <textarea
                    name="quote"
                    value={formData.quote || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What did the client say about your work..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-sky-500 resize-y placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Status</label>
                  <select
                    name="status"
                    value={formData.status || 'Published'}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 [color-scheme:dark]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Avatar Image (Optional)</label>
                  <ImageUpload
                    value={formData.avatarImage || formData.avatar_image || formData.avatar || ''}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, avatarImage: val, avatar_image: val, avatar: val }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </>
            )}

            {/* ── CAPABILITY FORM ── */}
            {isCapability && (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Capability Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="e.g. VISUAL BRANDING"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600 uppercase font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</label>
                  <textarea
                    name="desc"
                    value={formData.desc || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe this capability in detail..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-sky-500 resize-y placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order || ''}
                    onChange={handleChange}
                    placeholder="1"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                  />
                </div>
              </>
            )}

            {/* ── MILESTONE FORM ── */}
            {isMilestone && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year || ''}
                      onChange={handleChange}
                      placeholder="e.g. 2026"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600 font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Display Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order || ''}
                      onChange={handleChange}
                      placeholder="1"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Milestone Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder="e.g. STUDIO INCUBATION"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 placeholder-zinc-600 uppercase font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</label>
                  <textarea
                    name="desc"
                    value={formData.desc || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what happened during this milestone..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-sky-500 resize-y placeholder-zinc-600"
                  />
                </div>
              </>
            )}

          </div>
        </div>
      ) : (
        /* ──────── FULL FORM: Works & Blog ──────── */
        <div className="flex-1 flex flex-col lg:flex-row h-full min-h-0 overflow-hidden">
        
          {/* LEFT COLUMN: MAIN EDITOR CANVAS */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-zinc-950">
            
            {/* Main Title Field */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                {isWork ? 'Project Title' : 'Post Title'}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder={isWork ? 'Project title (e.g. PATHAO NEPAL SUPER-APP VISUAL SYSTEM)...' : 'Add blog post title...'}
                className="w-full text-2xl sm:text-3xl font-bold text-white bg-transparent border-b border-zinc-800 pb-3 focus:outline-none focus:border-sky-500 transition-colors placeholder-zinc-600"
              />
            </div>

            {/* WORK SPECIFIC FIELDS */}
            {isWork && (
              <div className="space-y-6 pt-2">
                {/* Tagline / Subtitle */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Tagline / Headline Subtitle</label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline || formData.subtitle || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({ ...prev, tagline: val, subtitle: val }));
                      setHasChanges(true);
                    }}
                    placeholder="e.g. THE OVERHAUL OF URBAN MOBILITY."
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-sky-500 placeholder-zinc-600 font-medium"
                  />
                </div>

                {/* Case Study Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Client Name</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client || ''}
                      onChange={handleChange}
                      placeholder="e.g. Pathao Nepal"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year || ''}
                      onChange={handleChange}
                      placeholder="e.g. 2026"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Watermark Word</label>
                    <input
                      type="text"
                      name="bgWord"
                      value={formData.bgWord || ''}
                      onChange={handleChange}
                      placeholder="e.g. PATHAO"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500 font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Badge Tag</label>
                    <input
                      type="text"
                      name="tag"
                      value={formData.tag || ''}
                      onChange={handleChange}
                      placeholder="e.g. TRANSFORMATION"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-sky-500 uppercase font-mono"
                    />
                  </div>
                </div>

                {/* Services Provided Tags */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Services & Roles Provided</label>
                  <TagsInput
                    tags={Array.isArray(formData.services) ? formData.services : (formData.services ? String(formData.services).split(',').map(s => s.trim()) : [])}
                    onChange={(newServices) => {
                      setFormData(prev => ({ ...prev, services: newServices }));
                      setHasChanges(true);
                    }}
                  />
                </div>

                {/* Case Study Narrative Sections */}
                <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                  <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} /> Case Study Narrative Sections
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 bg-zinc-900/30 p-4 border border-zinc-800/60 rounded-xl">
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">01 — The Challenge / Brief</label>
                      <textarea
                        name="challenge"
                        value={formData.challenge || ''}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe the client problem, objectives, and project scope..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 resize-y"
                      />
                    </div>

                    <div className="space-y-1 bg-zinc-900/30 p-4 border border-zinc-800/60 rounded-xl">
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">02 — The Approach & Development</label>
                      <textarea
                        name="approach"
                        value={formData.approach || ''}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe the grid systems, typography, color palettes, and strategy..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 resize-y"
                      />
                    </div>

                    <div className="space-y-1 bg-zinc-900/30 p-4 border border-zinc-800/60 rounded-xl">
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">03 — The Solution</label>
                      <textarea
                        name="solution"
                        value={formData.solution || ''}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe final execution, visual guidelines, packaging boxes, and digital interfaces..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 resize-y"
                      />
                    </div>

                    <div className="space-y-1 bg-zinc-900/30 p-4 border border-zinc-800/60 rounded-xl">
                      <label className="block text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">04 — The Outcome & Results</label>
                      <textarea
                        name="results"
                        value={formData.results || ''}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe key results, conversions, client feedback, and market response..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* Gallery Manager */}
                <div className="pt-4 border-t border-zinc-800/80">
                  <GalleryManager formData={formData} setFormData={setFormData} />
                </div>
              </div>
            )}

            {/* BLOG SPECIFIC FIELDS */}
            {isBlog && (
              <>
                {/* Post Excerpt */}
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

                {/* Visual Rich Text Content Editor */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">Article Content</label>
                  <RichTextEditor
                    value={formData.content || ''}
                    onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                    placeholder="Start writing article content or type '/' for slash commands..."
                  />
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN: INSPECTOR SIDEBAR */}
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
                    <label className="block text-xs text-zinc-400 font-medium">Status</label>
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

                {/* Section 3: Featured Cover Image */}
                <div className="space-y-3 pb-6 border-b border-zinc-800/80">
                  <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} className="text-sky-400" /> {isWork ? 'Thumbnail Cover Image' : 'Featured Cover Image'}
                  </h4>
                  <ImageUpload
                    value={formData.featuredImage || formData.image || formData.cover_image || ''}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, featuredImage: val, image: val, cover_image: val }));
                      setHasChanges(true);
                    }}
                  />
                </div>

                {/* Section 4: Publish Meta (For Blog posts) */}
                {isBlog && (
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
                        <label className="block text-xs text-zinc-400 font-medium mb-1">Read Time</label>
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
                )}

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
                    placeholder={isWork ? "pathao-super-app" : "post-url-slug"}
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
      )}
    </div>
  );
}

