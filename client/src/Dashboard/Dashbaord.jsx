import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { NotesProvider } from "../context/NotesContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CreateNoteButtons from "./components/CreateNoteButtons";
import NoteCard from "./components/NoteCard";
import NoteEditor from "./components/NoteEditor";
import DrawingCanvas from "./components/DrawingCanvas";
import { useNotes } from "../context/NotesContext";
import { Maximize2 } from "lucide-react";

const NotesContainer = () => {
  const { notes, addNote } = useNotes();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDrawingOpen, setIsDrawingOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = (type) => {
    if (type === "text") {
      setIsEditorOpen(true);
      setEditingNote(null);
    } else if (type === "drawing") {
      setIsDrawingOpen(true);
    } else if (type === "image") {
      // For simplicity, we'll just create a note with a placeholder image
      addNote(
        "New Image Note",
        "This is a note with an image. In a real app, you would upload an image here.",
        "image",
        "cyan"
      );
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
          <span className="text-sm text-gray-500 font-normal">
            {notes.length} Notes
          </span>
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-700">
          See All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onEdit={handleEditNote} />
        ))}
      </div>

      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        editingNote={editingNote}
      />

      {isDrawingOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <DrawingCanvas
            onSave={handleSaveDrawing}
            onCancel={() => setIsDrawingOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

const TaskManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs text-blue-600 font-medium">
            Task Management
          </span>
          <h3 className="text-sm font-medium">
            Organize your tasks efficiently
          </h3>
        </div>
        <button className="p-1 rounded hover:bg-gray-100">
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex flex-col space-y-2">
          <div className="w-full h-[120px] bg-white rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-400">Task management preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashbaord = () => {
  return (
    <NotesProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <NotesContainer />

            <div className="w-[280px] p-4 border-l border-gray-100 hidden lg:block">
              <TaskManagement />

              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium mb-3">Quick Sketch</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    <div className="w-full h-[200px] bg-white rounded border border-gray-200">
                      {/* Simplified sketch area */}
                      <div className="p-4">
                        <div className="w-16 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-full h-px bg-gray-200 mb-3"></div>
                        <div className="flex space-x-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        </div>
                        <div className="w-full h-px bg-gray-200 mb-3"></div>
                        <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="w-20 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex space-x-1">
                        <button className="w-5 h-5 rounded-full bg-gray-800"></button>
                        <button className="w-5 h-5 rounded-full bg-red-500"></button>
                        <button className="w-5 h-5 rounded-full bg-blue-500"></button>
                        <button className="w-5 h-5 rounded-full bg-green-500"></button>
                        <button className="w-5 h-5 rounded-full bg-yellow-500"></button>
                      </div>

                      <div className="flex space-x-2">
                        <button className="text-xs bg-amber-500 text-white px-2 py-1 rounded">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </NotesProvider>
  );
};

export default Dashbaord;
