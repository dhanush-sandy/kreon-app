import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "amber-200",
    },
    // New fields for drawing notes
    type: {
      type: String,
      enum: ["text", "drawing", "reminder"],
      default: "text",
    },
    drawingData: {
      type: String, // Store drawing as SVG or canvas data URL
      default: null,
    },
    // New fields for reminder notes
    reminderDate: {
      type: Date,
      default: null,
    },
    reminderStatus: {
      type: String,
      enum: ["pending", "completed", "missed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("Notes", notesSchema);
