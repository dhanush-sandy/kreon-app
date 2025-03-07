import express from "express";
import {
  getNotes,
  createNotes,
  updateNote,
  deleteNote,
  updateDrawing,
  updateReminderStatus,
} from "../controllers/notes.controller.js";

const router = express.Router();

// Get all notes for a user
router.get("/get-notes", getNotes);

// Create a new note (handles all note types)
router.post("/create-notes", createNotes);

// Update an existing note
router.put("/update-note/:noteId", updateNote);

// Delete a note
router.delete("/delete-note/:noteId", deleteNote);

// Specific routes for drawing and reminder functionality
router.put("/update-drawing/:noteId", updateDrawing);
router.put("/update-reminder-status/:noteId", updateReminderStatus);

export default router;
