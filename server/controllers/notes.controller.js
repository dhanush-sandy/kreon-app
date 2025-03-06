import { Notes } from "../models/notes.model.js";

export const getNotes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const notes = await Notes.find({ userId });

    return res.status(200).json({
      success: true,
      data: notes,
      message: notes.length
        ? "Notes retrieved successfully"
        : "No notes found for this user",
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createNotes = async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Debugging log

    const { title, description, userId, color } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!title || !description || !color) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, color, and description",
      });
    }

    const newNote = new Notes({
      userId,
      title,
      description,
      color,
    });

    const savedNote = await newNote.save();
    
    if (!savedNote) {
      return res.status(500).json({
        success: false,
        message: "Failed to create note",
      });
    }

    return res.status(201).json({
      success: true,
      data: savedNote,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
