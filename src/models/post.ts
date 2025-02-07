import { Schema, model, Model, Document } from 'mongoose';
import mongoose from "mongoose"; 

const PostSchema = new Schema(
    {
      name : { type: String, required: true },
      likes: { type: Array, required: false },
      desc: { type: String, required: true },
      image: { type: String, required: false },
      status: { type: String, required: false },
      
    }
  );


export let Post = mongoose.model("Posts", PostSchema); 