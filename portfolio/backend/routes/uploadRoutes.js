import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    res.status(201).json({
      message: 'Image uploaded successfully',
      url: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to upload image',
      error: error.message,
    });
  }
});

export default router;
