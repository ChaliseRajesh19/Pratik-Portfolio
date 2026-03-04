import express from 'express';
import Work from '../models/Works.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file?.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }
    const newWork = new Work({
      title,
      category,
      imageURL: req.file.path
    });
    await newWork.save();

    res.status(201).json({ message: "Work uploaded successfully", work: newWork });
    } catch (error) {
      console.error("Error uploading work:", error);
      res.status(500).json({ message: "Error uploading work", error: error.message });
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