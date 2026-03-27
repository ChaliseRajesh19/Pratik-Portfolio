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
  const [headline, setHeadline] = React.useState("");
  const [category, setCategory] = React.useState(defaultCategory || categories[0] || "");
  const [previewImage, setPreviewImage] = React.useState(null);
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = React.useState([]);
  const [previewImageUrl, setPreviewImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialWork) {
      setHeadline(initialWork.headline || initialWork.title || "");
      setCategory(initialWork.category || categories[0] || "");
      setExistingGalleryImages(initialWork.galleryImages || []);
      setPreviewImageUrl(initialWork.imageURL || "");
    } else if (defaultCategory && !category) {
      setCategory(defaultCategory);
    }
  }, [initialWork, defaultCategory, categories, category]);

  const getFileUrl = (url) => (url ? assetUrl(url) : "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (!initialWork && !previewImage) {
      toast.error("Please select at least one main image.");
      return;
    }

    const formData = new FormData();
    formData.append("headline", headline.trim());
    formData.append("title", headline.trim());
    formData.append("category", category);

    if (previewImage) formData.append("image", previewImage);

    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

    if (initialWork) {
      formData.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryImages),
      );
    }

    try {
      setLoading(true);
      await (initialWork
        ? api.put(`/api/works/${initialWork._id}`, formData)
        : api.post("/api/works/upload", formData));

      toast.success(
        initialWork
          ? `Updated images in ${category} successfully.`
          : `Uploaded images to ${category} successfully.`,
      );

      setHeadline("");
      setPreviewImage(null);
      setPreviewImageUrl("");
      setGalleryImages([]);
      setExistingGalleryImages([]);

      if (onUploaded) onUploaded(category);
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          initialWork
            ? `Failed to update images in ${category}`
            : `Failed to upload images to ${category}`,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-6 py-6 md:px-8">
      <h2 className="text-2xl font-semibold">
        {initialWork ? "Edit portfolio images" : "New portfolio images"}
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Add images to a category and optionally attach one short headline.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-6xl">
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
          Headline Text
          <input
            type="text"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
            placeholder="Optional short headline for this image set"
            className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-purple-400/50 transition focus:border-purple-400/70 focus:ring placeholder:text-slate-500"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">
              Main Image
            </span>
            <label className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[180px] cursor-pointer hover:border-purple-500/50 transition-colors">
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
                  className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-opacity"
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
                    ? "Change Main Image"
                    : "Upload Main Image"}
              </div>
            </label>
            <p className="mt-2 text-[11px] text-slate-500 italic">
              This image is used in the public category grid first.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="block text-sm font-medium text-slate-300 mb-2">
              Additional Images
            </span>
            <div className="relative rounded-2xl border border-dashed border-slate-700/80 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center overflow-hidden group min-h-[180px] hover:border-purple-500/50 transition-colors">
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {galleryImages.length + existingGalleryImages.length > 0
                    ? `${galleryImages.length + existingGalleryImages.length} additional images`
                    : "Upload More Images"}
                </div>
              </div>

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
            <p className="mt-2 text-[11px] text-slate-500 italic">
              These appear in the lightbox/gallery for users.
            </p>
          </div>
        </div>

        {(existingGalleryImages.length > 0 || galleryImages.length > 0) && (
          <div>
            <p className="text-sm font-medium text-slate-300 mb-3">All Uploaded Images</p>
            <div className="flex flex-wrap gap-3">
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
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400 disabled:opacity-60"
          >
            {loading
              ? initialWork
                ? "Saving..."
                : "Uploading..."
              : initialWork
                ? "Save Changes"
                : "Upload Images"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
