import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
});

export default mongoose.model("Url", UrlSchema);
