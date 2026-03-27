import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Blog from '../models/Blog.js';

const router = express.Router();

function normalizeTags(tags = []) {
    if (Array.isArray(tags)) {
        return tags.map((tag) => `${tag}`.trim()).filter(Boolean);
    }

    if (typeof tags === 'string') {
        return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }

    return [];
}

function buildBlogPayload(body = {}, existingBlog = null) {
    const status = body.status === 'published' ? 'published' : 'draft';
    const publishedAt = status === 'published'
        ? existingBlog?.publishedAt || new Date()
        : null;

    return {
        title: body.title?.trim(),
        content: body.content,
        author: body.author?.trim(),
        excerpt: body.excerpt?.trim() || '',
        coverImage: body.coverImage?.trim() || '',
        tags: normalizeTags(body.tags),
        status,
        publishedAt,
        date: existingBlog?.date || new Date(),
    };
}

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const newBlog = new Blog(buildBlogPayload(req.body));
        await newBlog.save();
        res.status(201).json(newBlog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to create blog', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ publishedAt: -1, createdAt: -1, date: -1 });
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

router.delete('/:id', authMiddleware, async (req, res) => {
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

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const existingBlog = await Blog.findById(req.params.id);

        if (!existingBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const updateData = buildBlogPayload(req.body, existingBlog);
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedBlog);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to update blog', error: error.message });
    }
});

export default router;
