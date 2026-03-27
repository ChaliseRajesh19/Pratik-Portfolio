import React from "react";
import { toast } from "react-hot-toast";
import api, { assetUrl, getErrorMessage } from "../../lib/api";

function UploadForm({
  categories,
  defaultCategory,
  onUploaded,
  initialWork,
  onCancel,
}) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(
    defaultCategory || categories[0],
  );
  const [description, setDescription] = React.useState("");
  const [tagsInput, setTagsInput] = React.useState("");
  const [link, setLink] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState(null);
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = React.useState([]);
  const [previewImageUrl, setPreviewImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialWork) {
      setTitle(initialWork.title || "");
      setCategory(initialWork.category || categories[0] || "");
      setDescription(initialWork.description || "");
      setTagsInput(initialWork.tags ? initialWork.tags.join(", ") : "");
      setLink(initialWork.link || "");
      setExistingGalleryImages(initialWork.galleryImages || []);
      setPreviewImageUrl(initialWork.imageURL || "");
    } else if (defaultCategory && !category) {
      setCategory(defaultCategory);
    }
  }, [initialWork, defaultCategory, categories, category]);

  const getFileUrl = (url) => {
    if (!url) return "";
    return assetUrl(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!initialWork && !previewImage) {
      toast.error("Please select a preview image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("category", category);
    formData.append("description", description.trim());
    formData.append("tags", tagsInput.trim());
    formData.append("link", link.trim());

    if (previewImage) formData.append("image", previewImage);

    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    if (initialWork && existingGalleryImages.length > 0) {
      formData.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryImages),
      );
    }

    try {
      setLoading(true);
      await (initialWork
        ? api.put(`/api/works/${initialWork._id}`, formData)
        : api.post('/api/works/upload', formData));

      toast.success(
        initialWork
          ? "Work updated successfully."
          : "Work uploaded successfully.",
      );
      setTitle("");
      setDescription("");
      setTagsInput("");
      setLink("");
      setPreviewImage(null);
      setPreviewImageUrl("");
      setGalleryImages([]);
      setExistingGalleryImages([]);
      if (onUploaded) {
        onUploaded(category);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err, initialWork ? "Update failed" : "Upload failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-6 py-6 md:px-8">
      <h2 className="text-2xl font-semibold">{initialWork ? 'Edit work' : 'New work'}</h2>
      <p className="mt-2 text-sm text-slate-400">
        Upload images and fill project details below.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-6xl">
        <label className="block text-sm font-medium text-slate-300">
          Work Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Skyline Logo"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
            required
          />
        </label>

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

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">
              Preview Image (For List)
            </span>
            <label className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[160px] cursor-pointer hover:border-purple-500/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPreviewImage(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {previewImage || previewImageUrl ? (
                <img
                  src={
                    previewImage
                      ? URL.createObjectURL(previewImage)
                      : getFileUrl(previewImageUrl)
                  }
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
                  alt="Preview"
                />
              ) : null}
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/30 transition-colors relative z-20">
                <svg
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="20"
                  width="20"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div className="text-sm font-semibold text-slate-200 relative z-20">
                {previewImage
                  ? previewImage.name
                  : previewImageUrl
                    ? "Change Image"
                    : "Upload"}
              </div>
              <div className="text-xs text-slate-400 mt-1 relative z-20 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-sm">
                PNG, JPG or WebP
              </div>
            </label>
            <p className="mt-2 text-[11px] text-slate-500 italic">
              Image shown in portfolio grid. Won't appear in gallery.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">
              Main Image (For Gallery)
            </span>
            <div className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[160px] hover:border-purple-500/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setGalleryImages((prev) => [
                    ...prev,
                    ...Array.from(e.target.files || []),
                  ])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title="Click to add more images"
              />
              <div className="flex flex-col items-center pointer-events-none relative z-20">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/30 transition-colors">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="20"
                    width="20"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {galleryImages.length + existingGalleryImages.length > 0
                    ? `${galleryImages.length + existingGalleryImages.length} images total`
                    : "Upload Images"}
                </div>
              </div>

              {/* Clear images button on top layer */}
              {galleryImages.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryImages([]);
                  }}
                  className="absolute top-2 right-2 z-20 px-2 py-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Clear New
                </button>
              )}
            </div>

            {/* Thumbnail Previews */}
            {(existingGalleryImages.length > 0 || galleryImages.length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {existingGalleryImages.map((imgUrl, idx) => (
                  <div
                    key={`exist-${idx}`}
                    className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-700 group shadow-lg"
                  >
                    <img
                      src={getFileUrl(imgUrl)}
                      className="w-full h-full object-cover bg-slate-800"
                      alt="Existing"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setExistingGalleryImages((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                      className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="w-5 h-5 text-rose-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                {galleryImages.map((file, idx) => {
                  const objectUrl = URL.createObjectURL(file);
                  return (
                    <div
                      key={`new-${idx}`}
                      className="relative w-24 h-24 rounded-xl overflow-hidden border border-purple-500/50 group shadow-lg"
                    >
                      <img
                        src={objectUrl}
                        className="w-full h-full object-cover"
                        alt="New"
                      />
                      <span className="absolute top-0 right-0 bg-purple-500 text-white text-[9px] font-bold px-1 rounded-bl leading-tight">
                        NEW
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(objectUrl);
                          setGalleryImages((prev) =>
                            prev.filter((_, i) => i !== idx),
                          );
                        }}
                        className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-5 h-5 text-rose-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="mt-2 text-[11px] text-slate-500 italic">
              {" "}
              Images for the project details gallery.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/50">
          <label className="block text-sm font-medium text-slate-300">
            Description (Optional)
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Briefly describe this project..."
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring resize-none"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-300">
            Tags (comma separated)
            <input
              type="text"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="e.g. UX Design, Web, Mobile"
              className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
            />
          </label>
          <label className="block text-sm font-medium text-slate-300">
            External Link (Optional)
            <input
              type="url"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring"
            />
          </label>
        </div>

        <div className="flex gap-3 pt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-700/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800/50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] rounded-xl bg-[#c084fc] px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(192,132,252,0.4)] transition hover:bg-[#d8b4fe] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? initialWork
                ? "Updating..."
                : "Creating..."
              : initialWork
                ? "Update Work"
                : "Create Work"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
