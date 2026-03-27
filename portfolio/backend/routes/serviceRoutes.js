import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Service from '../models/Service.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file?.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }
    const newService = new Service({
      title,
      description,
      imageURL: req.file.path
    });
    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };
    
    // Update image if a new one was uploaded
    if (req.file?.path) {
      updateData.imageURL = req.file.path;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

export default router;
