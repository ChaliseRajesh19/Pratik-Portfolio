import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Plus, ChevronUp, ChevronDown, Check, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { contentServices } from '../services/contentService';

const getSeoTitleColor = (length) => {
  if (length === 0) return '#71717a'; // gray
  if (length < 30) return '#71717a';
  if (length <= 60) return '#22c55e'; // green
  if (length <= 70) return '#f59e0b'; // orange
  return '#ef4444'; // red
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
      {label && <label className="block text-sm font-medium text-zinc-400">{label}</label>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800/50">
          <img src={value} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-black/60 text-zinc-300 hover:text-white rounded-md backdrop-blur-sm"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-zinc-900/30">
          <Upload className="text-zinc-500 mb-3" size={24} />
          <span className="text-sm text-zinc-400">
            {uploading ? 'Uploading...' : 'Click or drag image to upload'}
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
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-zinc-300">
            {tag}
            <button type="button" onClick={() => removeTag(idx)} className="text-zinc-500 hover:text-zinc-300">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-shadow"
      />
    </div>
  );
};


export default function EditForm({ item, type, onCancel, onSave, allWorks = [], allBlogs = [] }) {
  const [formData, setFormData] = useState(() => ({
    ...item,
    services: item.services || [],
    gallery: item.gallery || [],
    caseStudy: item.caseStudy || { sections: [] }
  }));
  
  const originalDataRef = useRef(formData);
  const [activeTab, setActiveTab] = useState('Content');
  const [isSaved, setIsSaved] = useState(false);
  
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalDataRef.current);

  const getTabs = () => {
    if (type === 'works') return ['Content', 'Case Study', 'Gallery', 'SEO'];
    if (type === 'blogs') return ['Content', 'SEO'];
    return [];
  };
  const tabs = getTabs();

  // Auto-save draft
  useEffect(() => {
    const draftKey = `admin_draft_${type}_${item.id || 'new'}`;
    const interval = setInterval(() => {
      if (hasChanges) {
        localStorage.setItem(draftKey, JSON.stringify(formData));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [formData, type, item.id, hasChanges]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const val = inputType === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const next = { ...prev, [name]: val };
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        next.slug = generateSlug(val);
      }
      return next;
    });
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] || {}),
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-semibold text-lg capitalize flex items-center gap-2">
              {item.id ? 'Edit' : 'New'} {type.slice(0, -1)}
              {type === 'works' || type === 'blogs' ? (
                <span className={`px-2 py-0.5 text-xs rounded-full border ${formData.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                  {formData.status || 'Draft'}
                </span>
              ) : null}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isSaved && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="text-xs text-zinc-400 flex items-center gap-1"
              >
                <Check size={14} className="text-green-500" /> Draft saved
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="relative px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium transition-colors"
          >
            Save Changes
            {hasChanges && <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 border-2 border-zinc-950 rounded-full"></span>}
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tabs.length > 0 && (
          <div className="px-6 pt-6 border-b border-zinc-800">
            <div className="flex gap-6">
              {tabs.map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-indigo-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab || 'single-form'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form className="space-y-6">
                
                {/* --- WORKS TABS --- */}
                {type === 'works' && activeTab === 'Content' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                        <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Slug</label>
                        <input name="slug" value={formData.slug || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Tagline</label>
                        <textarea name="tagline" value={formData.tagline || ''} onChange={handleChange} rows={2} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Client</label>
                        <input name="client" value={formData.client || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Year</label>
                          <input type="number" name="year" value={formData.year || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Index (Order)</label>
                          <input type="number" name="index" value={formData.index || 0} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                        <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                          <option value="">Select Category</option>
                          <option value="Web Design">Web Design</option>
                          <option value="Development">Development</option>
                          <option value="Branding">Branding</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Services</label>
                        <TagsInput tags={formData.services} onChange={(tags) => setFormData({...formData, services: tags})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                        <div className="flex gap-2">
                          {['Draft', 'Published'].map(status => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setFormData({...formData, status})}
                              className={`flex-1 py-2 text-sm font-medium rounded-md border ${formData.status === status ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800'}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {type === 'works' && activeTab === 'Case Study' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-zinc-200">Case Study Sections</h3>
                      <button 
                        type="button"
                        onClick={() => {
                          const sections = formData.caseStudy?.sections || [];
                          setFormData({...formData, caseStudy: { ...formData.caseStudy, sections: [...sections, { heading: '', paragraphs: [{ text: '', highlights: [] }] }] }});
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 rounded-md transition-colors"
                      >
                        <Plus size={16} /> Add Section
                      </button>
                    </div>

                    <div className="space-y-8">
                      {(formData.caseStudy?.sections || []).map((section, sIdx) => (
                        <div key={sIdx} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
                          <div className="flex justify-between">
                            <input
                              placeholder="Section Heading (e.g. The Challenge)"
                              value={section.heading}
                              onChange={(e) => {
                                const newSections = [...formData.caseStudy.sections];
                                newSections[sIdx].heading = e.target.value;
                                setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                              }}
                              className="bg-transparent border-b border-zinc-700 focus:border-indigo-500 px-1 py-1 text-lg font-medium text-zinc-200 focus:outline-none w-2/3"
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const newSections = formData.caseStudy.sections.filter((_, i) => i !== sIdx);
                                setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                              }}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="space-y-4 pl-4 border-l-2 border-zinc-800">
                            {(section.paragraphs || []).map((p, pIdx) => (
                              <div key={pIdx} className="space-y-2 relative">
                                <textarea
                                  placeholder="Paragraph text..."
                                  value={p.text}
                                  onChange={(e) => {
                                    const newSections = [...formData.caseStudy.sections];
                                    newSections[sIdx].paragraphs[pIdx].text = e.target.value;
                                    setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                                  }}
                                  rows={3}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none text-sm"
                                />
                                <input
                                  placeholder="Highlights (comma separated words to bold)"
                                  value={(p.highlights || []).join(', ')}
                                  onChange={(e) => {
                                    const newSections = [...formData.caseStudy.sections];
                                    newSections[sIdx].paragraphs[pIdx].highlights = e.target.value.split(',').map(h => h.trim()).filter(Boolean);
                                    setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                                  }}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs"
                                />
                                {section.paragraphs.length > 1 && (
                                  <button type="button" onClick={() => {
                                      const newSections = [...formData.caseStudy.sections];
                                      newSections[sIdx].paragraphs = newSections[sIdx].paragraphs.filter((_, i) => i !== pIdx);
                                      setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                                  }} className="absolute top-2 -right-8 text-zinc-500 hover:text-red-400">
                                    <X size={16} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button 
                              type="button" 
                              onClick={() => {
                                const newSections = [...formData.caseStudy.sections];
                                newSections[sIdx].paragraphs.push({ text: '', highlights: [] });
                                setFormData({...formData, caseStudy: {...formData.caseStudy, sections: newSections}});
                              }}
                              className="text-xs text-indigo-400 hover:text-indigo-300"
                            >
                              + Add Paragraph
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {type === 'works' && activeTab === 'Gallery' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-zinc-200">Image Gallery</h3>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, gallery: [...(formData.gallery || []), { url: '', caption: '' }]})}
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 rounded-md transition-colors"
                      >
                        <Plus size={16} /> Add Image Slot
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(formData.gallery || []).map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                          <div className="w-1/3">
                            <ImageUpload 
                              value={item.url} 
                              onChange={(url) => {
                                const newGallery = [...formData.gallery];
                                newGallery[idx].url = url;
                                setFormData({...formData, gallery: newGallery});
                              }}
                            />
                          </div>
                          <div className="flex-1 space-y-3">
                            <input
                              placeholder="Caption (optional)"
                              value={item.caption || ''}
                              onChange={(e) => {
                                const newGallery = [...formData.gallery];
                                newGallery[idx].caption = e.target.value;
                                setFormData({...formData, gallery: newGallery});
                              }}
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm"
                            />
                            <div className="flex gap-2">
                              <button type="button" disabled={idx === 0} onClick={() => {
                                const newG = [...formData.gallery];
                                [newG[idx-1], newG[idx]] = [newG[idx], newG[idx-1]];
                                setFormData({...formData, gallery: newG});
                              }} className="p-1.5 bg-zinc-800 text-zinc-400 rounded-md hover:bg-zinc-700 disabled:opacity-50">
                                <ChevronUp size={16} />
                              </button>
                              <button type="button" disabled={idx === formData.gallery.length - 1} onClick={() => {
                                const newG = [...formData.gallery];
                                [newG[idx+1], newG[idx]] = [newG[idx], newG[idx+1]];
                                setFormData({...formData, gallery: newG});
                              }} className="p-1.5 bg-zinc-800 text-zinc-400 rounded-md hover:bg-zinc-700 disabled:opacity-50">
                                <ChevronDown size={16} />
                              </button>
                              <button type="button" onClick={() => {
                                setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== idx)});
                              }} className="ml-auto p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20">
                                <X size={16} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- SEO TAB (Works & Blogs) --- */}
                {((type === 'works' || type === 'blogs') && activeTab === 'SEO') && (
                  <div className="space-y-6 max-w-2xl">
                    <ImageUpload 
                      label="Social Share Image (OG Image)" 
                      value={formData.seoImage || ''} 
                      onChange={(val) => setFormData({...formData, seoImage: val})} 
                    />
                    
                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <label className="block text-sm font-medium text-zinc-400">SEO Title</label>
                        <span className="text-xs" style={{ color: getSeoTitleColor((formData.seoTitle || '').length) }}>
                          {(formData.seoTitle || '').length} / 60
                        </span>
                      </div>
                      <input 
                        name="seoTitle" 
                        value={formData.seoTitle || ''} 
                        onChange={handleChange} 
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" 
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <label className="block text-sm font-medium text-zinc-400">SEO Description</label>
                        <span className="text-xs" style={{ color: getSeoDescColor((formData.seoDescription || '').length) }}>
                          {(formData.seoDescription || '').length} / 160
                        </span>
                      </div>
                      <textarea 
                        name="seoDescription" 
                        value={formData.seoDescription || ''} 
                        onChange={handleChange} 
                        rows={3}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" 
                      />
                    </div>
                  </div>
                )}


                {/* --- BLOG CONTENT TAB --- */}
                {type === 'blogs' && activeTab === 'Content' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                        <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-lg font-medium" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Slug</label>
                        <input name="slug" value={formData.slug || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm text-zinc-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Excerpt</label>
                        <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Content (Markdown/HTML)</label>
                        <textarea name="content" value={formData.content || ''} onChange={handleChange} rows={20} className="w-full bg-zinc-950 border border-zinc-700 rounded-md px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm leading-relaxed" />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <ImageUpload label="Featured Image" value={formData.featuredImage || ''} onChange={(val) => setFormData({...formData, featuredImage: val})} />
                      
                      <div className="space-y-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                          <div className="flex gap-2">
                            {['Draft', 'Published'].map(status => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setFormData({...formData, status})}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md border ${formData.status === status ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700'}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                          <input name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Publish Date</label>
                          <input type="date" name="publishDate" value={formData.publishDate || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm [color-scheme:dark]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Read Time (mins)</label>
                          <input type="number" name="readTime" value={formData.readTime || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {/* --- TESTIMONIALS --- */}
                {type === 'testimonials' && (
                  <div className="space-y-6 max-w-xl">
                    <div className="flex items-start gap-6">
                      <div className="w-32">
                        <ImageUpload label="Avatar" value={formData.avatar || ''} onChange={(val) => setFormData({...formData, avatar: val})} />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                          <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
                            <input name="role" value={formData.role || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
                            <input name="company" value={formData.company || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Quote</label>
                      <textarea name="quote" value={formData.quote || ''} onChange={handleChange} rows={4} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none text-lg" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Order</label>
                        <input type="number" name="order" value={formData.order || 0} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                        <select name="status" value={formData.status || 'Active'} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                          <option value="Active">Active</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- CAPABILITIES --- */}
                {type === 'capabilities' && (
                  <div className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Capability Name</label>
                      <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-lg font-medium" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                      <textarea name="desc" value={formData.desc || ''} onChange={handleChange} rows={4} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Order</label>
                      <input type="number" name="order" value={formData.order || 0} onChange={handleChange} className="w-24 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                  </div>
                )}

                {/* --- MILESTONES --- */}
                {type === 'milestones' && (
                  <div className="space-y-6 max-w-xl">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Year</label>
                        <input name="year" value={formData.year || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono" />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                        <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                      <textarea name="desc" value={formData.desc || ''} onChange={handleChange} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Order</label>
                      <input type="number" name="order" value={formData.order || 0} onChange={handleChange} className="w-24 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                  </div>
                )}
                
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
