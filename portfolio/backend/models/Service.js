import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema(
    {
        title : {type : String, required : true},
        description : {type : String, required : true},
        imageURL : {type : String, required : true},
    },
    {timestamps : true}
);

export default model('Service', ServiceSchema);
