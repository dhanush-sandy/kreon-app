import { Notes } from "../models/notes.model.js";

export const getNotes = async (req, res) => {
  try {
    const { userId } = req.query;

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

// Create a New Note
export const createNotes = async (req, res) => {
  try {
    console.log("Request body received:", req.body);

    let { title, description, userId, color, type, drawingData, reminderDate } =
      req.body;

    // Trim input values
    title = title?.trim();
    description = description?.trim();
    color = color?.trim();

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    // Create note object based on type
    const noteData = {
      userId,
      title,
      description,
      color: color || "amber-200",
      type: type || "text",
    };

    // Add type-specific data
    if (type === "drawing" && drawingData) {
      noteData.drawingData = drawingData;
    } else if (type === "reminder" && reminderDate) {
      noteData.reminderDate = new Date(reminderDate);
    }

    const newNote = new Notes(noteData);
    const savedNote = await newNote.save();

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


// Update a Note
export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description, color } = req.body;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { title, description, color },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a Note
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const deletedNote = await Notes.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateDrawing = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { drawingData } = req.body;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    if (!drawingData) {
      return res.status(400).json({
        success: false,
        message: "Drawing data is required",
      });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { drawingData },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Drawing updated successfully",
    });
  } catch (error) {
    console.error("Error updating drawing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add controller for reminder functionality
export const updateReminderStatus = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { reminderStatus } = req.body;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const validStatuses = ["pending", "completed", "missed"];
    if (!reminderStatus || !validStatuses.includes(reminderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Valid reminder status is required",
      });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { reminderStatus },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Reminder status updated successfully",
    });
  } catch (error) {
    console.error("Error updating reminder status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};