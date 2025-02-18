import { Schema, model, Model, Document } from 'mongoose';
import mongoose from "mongoose"; 

const LinkSchema = new Schema(
    {
      url : { type: String, required: true },
      token: { type: String, required: true },
      password: { type: String, required: true },
      expiresAt: {type: Number, required : false},
      createdAt: { type: Date, required: true },
      clickCount: { type: Number, required: true },
    }
  );


export let Link = mongoose.model("Links", LinkSchema); 
