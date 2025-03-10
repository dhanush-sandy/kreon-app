import React, { useState } from "react";
import CreateNoteButtons from "./CreateNoteButtons";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";
import ReminderNote from "./ReminderNote";

const NotesComponent = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isReminder, setIsReminder] = useState(false);

  const handleCreateNote = (type) => {
    setEditingNote(null);
    if (type === "text") {
      setIsEditorOpen(true);
    } else if (type === "reminder") {
      setIsReminder(true);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <CreateNoteButtons onCreateNote={handleCreateNote} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          All Notes <span className="text-xs text-gray-500 font-normal">manage notes</span>
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-700">
          See All →
        </button>
      </div>

      <div>
        <NoteCard />
      </div>

      {/* Conditionally render NoteEditor */}
      {isEditorOpen && (
        <NoteEditor isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} editingNote={editingNote} />
      )}

      {/* Conditionally render ReminderNote */}
      {isReminder && <ReminderNote onClose={() => setIsReminder(false)} />}
    </div>
  );
};

export default NotesComponent;
