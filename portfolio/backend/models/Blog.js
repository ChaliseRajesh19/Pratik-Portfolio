import {Schema, model} from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model('Blog', BlogSchema);