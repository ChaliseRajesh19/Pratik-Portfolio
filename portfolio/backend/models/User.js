import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


export default model('User', userSchema);