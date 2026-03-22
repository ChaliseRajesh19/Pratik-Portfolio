import express from 'express';
import Work from '../models/Works.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'galleryImages', maxCount: 50 }
]), async (req, res) => {
  try {
    const { title, category, description, tags, link } = req.body;
    
    // req.files is an object where keys are field names
    const mainImageFile = req.files && req.files['image'] ? req.files['image'][0] : null;
    const galleryFiles = req.files && req.files['galleryImages'] ? req.files['galleryImages'] : [];

    if (!mainImageFile) {
      return res.status(400).json({ message: 'Main image upload failed or is missing' });
    }
    
    // Convert comma-separated string to array
    const parsedTags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    
    // Extract paths for gallery images
    const galleryImagePaths = galleryFiles.map(file => file.path);

    const newWork = new Work({
      title,
      category,
      description: description || '',
      tags: parsedTags,
      link: link || '',
      imageURL: mainImageFile.path,
      galleryImages: galleryImagePaths
    });
    
    await newWork.save();

    res.status(201).json({ message: "Work uploaded successfully", work: newWork });
    } catch (error) {
      console.error("Error uploading work:", error);
      res.status(500).json({ message: "Error uploading work", error: error.message });
    }
});

router.get('/', async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch works', error: error.message });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const works = await Work.find({ category: req.params.category });
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch works', error: error.message });
  }
});

router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'galleryImages', maxCount: 50 }
]), async (req, res) => {
  try {
    const { title, category, description, tags, link, existingGalleryImages } = req.body;
    let updateData = {
      title,
      category,
      description: description || '',
      link: link || ''
    };
    
    // Parse tags if provided
    if (tags !== undefined) {
      updateData.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    
    // Parse existing gallery images to retain (from frontend)
    let currentGallery = [];
    if (existingGalleryImages) {
      try {
        currentGallery = JSON.parse(existingGalleryImages);
      } catch (e) {
        currentGallery = typeof existingGalleryImages === 'string' ? [existingGalleryImages] : existingGalleryImages;
      }
    }
    
    // Add any newly uploaded gallery images
    if (req.files && req.files['galleryImages']) {
      const newGalleryPaths = req.files['galleryImages'].map(f => f.path);
      currentGallery = [...currentGallery, ...newGalleryPaths];
    }
    
    updateData.galleryImages = currentGallery;
    
    // Update main image if a new one is uploaded
    if (req.files && req.files['image']) {
      updateData.imageURL = req.files['image'][0].path;
    }

    const updatedWork = await Work.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedWork) {
      return res.status(404).json({ message: 'Work not found' });
    }
    
    res.status(200).json({ message: 'Work updated successfully', work: updatedWork });
  } catch (error) {
    console.error("Error updating work:", error);
    res.status(500).json({ message: 'Failed to update work', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedWork = await Work.findByIdAndDelete(req.params.id);
    if (!deletedWork) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.status(200).json({ message: 'Work deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete work', error: error.message });
  }
});

export default router;
