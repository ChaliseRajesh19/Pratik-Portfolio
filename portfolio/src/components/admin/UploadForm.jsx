import React from 'react';
import { toast } from 'react-hot-toast';
import { useWorks } from '../../hooks/useWorks';

function getFileId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

function createExistingImageItem(url, index) {
  return {
    id: `existing-${index}-${url}`,
    kind: 'existing',
    url,
    label: `Saved image ${index + 1}`,
  };
}

function createFileImageItem(file, prefix) {
  return {
    id: getFileId(prefix),
    kind: 'file',
    file,
    url: URL.createObjectURL(file),
    label: file.name,
  };
}

function moveItem(list, draggedId, targetId) {
  const fromIndex = list.findIndex((item) => item.id === draggedId);
  const targetIndex = list.findIndex((item) => item.id === targetId);

  if (fromIndex === -1 || targetIndex === -1 || fromIndex === targetIndex) {
    return list;
  }

  const nextItems = [...list];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(targetIndex, 0, movedItem);
  return nextItems;
}

function revokeObjectUrl(item) {
  if (item?.kind === 'file' && item.url?.startsWith('blob:')) {
    URL.revokeObjectURL(item.url);
  }
}

function UploadForm({ categories, defaultCategory, onUploaded, initialWork, onCancel }) {
  const { createWork, updateWork } = useWorks();
  const [headline, setHeadline] = React.useState('');
  const [category, setCategory] = React.useState(defaultCategory || categories[0] || '');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [imageItems, setImageItems] = React.useState([]);
  const [draggingId, setDraggingId] = React.useState(null);
  const [dragOverId, setDragOverId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const previousImageItemsRef = React.useRef([]);
  const currentImageItemsRef = React.useRef([]);

  React.useEffect(() => {
    currentImageItemsRef.current = imageItems;
  }, [imageItems]);

  React.useEffect(() => {
    const previousItems = previousImageItemsRef.current;
    const currentIds = new Set(imageItems.map((item) => item.id));

    previousItems
      .filter((item) => !currentIds.has(item.id))
      .forEach(revokeObjectUrl);

    previousImageItemsRef.current = imageItems;
  }, [imageItems]);

  React.useEffect(() => () => {
    currentImageItemsRef.current.forEach(revokeObjectUrl);
  }, []);

  React.useEffect(() => {
    if (initialWork) {
      const existingImages = [initialWork.imageURL, ...(initialWork.galleryImages || [])]
        .filter(Boolean)
        .map((url, index) => createExistingImageItem(url, index));

      setHeadline(initialWork.headline || initialWork.title || '');
      setCategory(initialWork.category || defaultCategory || categories[0] || '');
      setVideoUrl(initialWork.videoURL || '');
      setDisplayOrder(initialWork.displayOrder || 0);
      setImageItems(existingImages);
      return;
    }

    setHeadline('');
    setCategory(defaultCategory || categories[0] || '');
    setVideoUrl('');
    setDisplayOrder(0);
    setImageItems([]);
  }, [initialWork, defaultCategory, categories]);

  const replaceCoverImage = (file) => {
    if (!file) return;

    const nextCover = createFileImageItem(file, 'cover');
    setImageItems((previousItems) => {
      if (previousItems.length === 0) {
        return [nextCover];
      }

      return [nextCover, ...previousItems.slice(1)];
    });
  };

  const appendGalleryImages = (files) => {
    if (!files?.length) return;

    const nextItems = Array.from(files).map((file) => createFileImageItem(file, 'gallery'));
    setImageItems((previousItems) => [...previousItems, ...nextItems]);
  };

  const removeImageItem = (id) => {
    setImageItems((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  const moveImageByStep = (id, direction) => {
    setImageItems((previousItems) => {
      const currentIndex = previousItems.findIndex((item) => item.id === id);
      const targetIndex = currentIndex + direction;

      if (currentIndex === -1 || targetIndex < 0 || targetIndex >= previousItems.length) {
        return previousItems;
      }

      const nextItems = [...previousItems];
      const [movedItem] = nextItems.splice(currentIndex, 1);
      nextItems.splice(targetIndex, 0, movedItem);
      return nextItems;
    });
  };

  const makeCoverImage = (id) => {
    setImageItems((previousItems) => {
      const currentIndex = previousItems.findIndex((item) => item.id === id);
      if (currentIndex <= 0) return previousItems;

      const nextItems = [...previousItems];
      const [selectedItem] = nextItems.splice(currentIndex, 1);
      nextItems.unshift(selectedItem);
      return nextItems;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      toast.error('Please select a category.');
      return;
    }

    if (imageItems.length === 0) {
      toast.error('Please add at least one image.');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        headline: headline.trim(),
        category,
        imageItems,
        videoUrl: videoUrl.trim(),
        displayOrder: Number.isFinite(Number(displayOrder)) ? Number(displayOrder) : 0,
      };

      if (initialWork) {
        await updateWork(initialWork._id, payload);
        toast.success(`Updated images in ${category} successfully.`);
      } else {
        await createWork(payload);
        toast.success(`Uploaded images to ${category} successfully.`);
      }

      if (!initialWork) {
        setHeadline('');
        setVideoUrl('');
        setDisplayOrder(0);
        setImageItems([]);
      }

      if (onUploaded) onUploaded(category);
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-6 py-6 md:px-8">
      <h2 className="text-2xl font-semibold">{initialWork ? 'Edit portfolio images' : 'New portfolio images'}</h2>
      <p className="mt-2 text-sm text-slate-400">Set the category, headline, work order, and drag images into the exact sequence you want visitors to see.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-300">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-slate-950">
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Display Order
            <input
              type="number"
              min="0"
              value={displayOrder}
              onChange={(event) => setDisplayOrder(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring placeholder:text-slate-500"
            />
            <p className="mt-2 text-[11px] text-slate-500 italic">Lower numbers appear first inside the selected work category.</p>
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-300">
          Headline Text
          <input
            type="text"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
            placeholder="Optional short headline for this image set"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring placeholder:text-slate-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-300">
          Video Link (YouTube or Vimeo)
          <input
            type="url"
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            placeholder="e.g. https://youtube.com/shorts/xxxxx"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring placeholder:text-slate-500"
          />
          <p className="mt-2 text-[11px] text-slate-500 italic">Optional video link. It still appears after the ordered image gallery on the public page.</p>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">Cover Image</span>
            <label className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[180px] cursor-pointer hover:border-purple-500/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  replaceCoverImage(file);
                  event.target.value = '';
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {imageItems[0]?.url ? (
                <img src={imageItems[0].url} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-opacity" alt="Cover preview" />
              ) : null}

              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/30 transition-colors relative z-20">
                <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div className="text-sm font-semibold text-slate-200 relative z-20">
                {imageItems[0]?.url ? 'Replace Cover Image' : 'Upload Cover Image'}
              </div>
            </label>
            <p className="mt-2 text-[11px] text-slate-500 italic">The first image becomes the card cover automatically. You can also drag any image below into the first position.</p>
          </div>

          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">Additional Images</span>
            <label className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[180px] hover:border-purple-500/50 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  appendGalleryImages(event.target.files);
                  event.target.value = '';
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <div className="flex flex-col items-center pointer-events-none relative z-20">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/30 transition-colors">
                  <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="20" width="20">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {imageItems.length > 1 ? `${imageItems.length - 1} extra image${imageItems.length - 1 > 1 ? 's' : ''}` : 'Upload More Images'}
                </div>
              </div>
            </label>
            <p className="mt-2 text-[11px] text-slate-500 italic">These will appear after the cover image, following the exact order you arrange below.</p>
          </div>
        </div>

        {imageItems.length > 0 && (
          <div>
            <div className="flex flex-col gap-2 mb-3">
              <p className="text-sm font-medium text-slate-300">Gallery Display Order</p>
              <p className="text-[11px] text-slate-500 italic">Drag images to reorder them. The first tile is the cover used on the portfolio grid.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {imageItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => {
                    setDraggingId(item.id);
                    setDragOverId(item.id);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (dragOverId !== item.id) {
                      setDragOverId(item.id);
                    }
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (draggingId && draggingId !== item.id) {
                      setImageItems((previousItems) => moveItem(previousItems, draggingId, item.id));
                    }
                    setDraggingId(null);
                    setDragOverId(null);
                  }}
                  onDragEnd={() => {
                    setDraggingId(null);
                    setDragOverId(null);
                  }}
                  className={`relative rounded-xl overflow-hidden border transition-all ${
                    dragOverId === item.id
                      ? 'border-purple-400 shadow-[0_0_0_1px_rgba(192,132,252,0.3)]'
                      : 'border-slate-700'
                  } ${draggingId === item.id ? 'opacity-60 scale-[0.98]' : ''}`}
                >
                  <div className="absolute left-2 top-2 z-20 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    {index === 0 ? 'Cover' : `#${index + 1}`}
                  </div>

                  <div className="absolute right-2 top-2 z-20 flex gap-1">
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeCoverImage(item.id)}
                        className="rounded-full bg-emerald-500/85 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-400"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImageItem(item.id)}
                      className="rounded-full bg-rose-500/85 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-rose-400"
                    >
                      Remove
                    </button>
                  </div>

                  <img src={item.url} className="w-full aspect-square object-cover bg-slate-800" alt={item.label} />

                  <div className="border-t border-slate-800/80 bg-slate-950/95 p-2">
                    <p className="truncate text-[11px] text-slate-300">{item.label}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveImageByStep(item.id, -1)}
                        disabled={index === 0}
                        className="flex-1 rounded-lg border border-slate-700 px-2 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImageByStep(item.id, 1)}
                        disabled={index === imageItems.length - 1}
                        className="flex-1 rounded-lg border border-slate-700 px-2 py-1.5 text-[11px] font-semibold text-slate-200 transition hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Move Down
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sticky bottom-4 z-20 mt-8 flex justify-end">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400 disabled:opacity-60"
            >
              {loading ? (initialWork ? 'Saving...' : 'Uploading...') : (initialWork ? 'Save Changes' : 'Upload Images')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
