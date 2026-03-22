import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
    {
        name:        { type: String, required: true }, 
        slug:        { type: String, required: true, unique: true }, 
        description: { type: String, required: true },
        icon:        { type: String, default: '🎨' },
    },
    { timestamps: true }
);

export default model('Category', CategorySchema);
