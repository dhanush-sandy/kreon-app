import React, { useState } from "react";
import CreateNoteButtons from "./CreateNoteButtons";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";
import DrawingCanvas from "./DrawingCanvas";

const NotesComponent = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = (type) => {
    setEditingNote(null);
    if (type === "text") {
      setIsEditorOpen(true);
    } else if (type === "drawing") {
      setIsDrawingOpen(true);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveDrawing = (imageData) => {
    addNote("Drawing Note", imageData, "drawing", "violet");
    setIsDrawingOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <CreateNoteButtons onCreateNote={handleCreateNote} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          All Notes{" "}
          <span className="text-sm text-gray-500 font-normal">Notes</span>
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-700">
          See All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NoteCard />
      </div>

      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        editingNote={editingNote}
      />

      {isDrawingOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <DrawingCanvas
            onSave={handleSaveDrawing}
            onCancel={() => setIsDrawingOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default NotesComponent;
