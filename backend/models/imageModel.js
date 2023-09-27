import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  file: String,
});

const Image = model("Image", imageSchema);
export default Image;
