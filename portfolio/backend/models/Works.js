import { Schema, model } from 'mongoose';

const WorksSchema = new Schema(
    {
        title : {type : String, required : true},
        category : {type : String, required : true},
        imageURL : {type : String, required : true},
        galleryImages: { type: [String], default: [] },
        description: { type: String, default: '' },
        tags: { type: [String], default: [] },
        link: { type: String, default: '' },
    },
    {timestamps : true}
);

export default model('Works', WorksSchema);