import { Schema, model } from 'mongoose';

const WorksSchema = new Schema(
    {
        title : {type : String, required : true},
        category : {type : String, required : true},
        imageURL : {type : String, required : true},
    },
    {timestamps : true}
);

export default model('Works', WorksSchema);