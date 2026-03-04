import Work from '../models/Works.js';

export const createWork = async (req, res) => {
    try {
        const { title, category } = req.body;
        const newWork = new Work({
            title,
            category,
            imageURL: '/uploads/' + req.file.filename
        });
        await newWork.save();
        res.status(201).json(newWork);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to create work', error: error.message });
    };
};

export const getWorks = async (req, res) => {
    try {
        const works = await Work.find({
            category: req.params.category
        });
        res.status(200).json(works);
    }
    catch (error){
        res.status(500).json({ message: 'Failed to fetch works', error: error.message });
    };
};

export const deleteWork = async (req, res) => {
    try {
        const deletedWork = await Work.findByIdAndDelete(req.params.id);
        if (!deletedWork) {
            return res.status(404).json({ message: 'Work not found' });
        }
        res.status(200).json({ message: 'Work deleted successfully' });
    }
    catch (error){
        res.status(500).json({ message: 'Failed to delete work', error: error.message });
    }
};