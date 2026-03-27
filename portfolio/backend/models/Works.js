import { Schema, model } from 'mongoose';

const WorksSchema = new Schema(
    {
        headline : {type : String, default : ''},
        category : {type : String, required : true},
        imageURL : {type : String, required : true},
        galleryImages: { type: [String], default: [] },
    },
    {timestamps : true}
);

export default model('Works', WorksSchema);
