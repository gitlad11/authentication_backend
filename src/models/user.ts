import { Schema, model, Model, Document } from 'mongoose';
import mongoose from "mongoose"; 

const UserSchema = new Schema(
    {
      name : { type: String, required: true },
      email : { type: String, required: true },
      password: { type: String, required: true },
      role: { type: String, required : false },
    }
  );


export let User = mongoose.model("Users", UserSchema); 
