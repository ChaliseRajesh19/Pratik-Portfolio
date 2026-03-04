import express from 'express';
import Blog from '../models/Blog.js';
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, content, author, tags = [] } = req.body;    
        const newBlog = new Blog({
            title,
            content,
            author,
            tags
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to create blog', error: error.message });
    }   
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
    }   
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to fetch blog', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to fetch blog', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    }
    catch (error){
        res.status(500).json({ message: 'Failed to delete blog', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, content, author, tags = [] } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, author, tags },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to update blog', error: error.message });
    }
});

export default router;
