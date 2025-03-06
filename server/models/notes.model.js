import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  color: {
    type: String,
    default: "#ffffff",
  },
});

export const Notes = mongoose.model("Notes", notesSchema);
