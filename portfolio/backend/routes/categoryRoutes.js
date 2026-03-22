import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const newCategory = new Category({ name, slug, description });
        await newCategory.save();
        res.status(201).json({ message: "Category created", category: newCategory });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ message: "Category slug already exists" });
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, slug, description, icon } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name, slug, description, icon }, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Failed to update category", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
});

export default router;
