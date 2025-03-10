import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon, Edit2Icon, TrashIcon, XIcon, CheckIcon, PlusCircleIcon, CalendarIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const NoteCard = () => {
  const { userId } = useAuth();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedColor, setUpdatedColor] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Available colors for notes with more vibrant options
  const colorOptions = [
    "amber-200", "blue-200", "green-200", "red-200",
    "purple-200", "pink-200", "yellow-200", "indigo-200",
    "teal-200", "cyan-200", "lime-200", "orange-200"
  ];

  useEffect(() => {
    if (!userId) return;
    fetchNotes();
  }, [userId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/v1/notes/get-notes?userId=${userId}`
      );
      setNotes(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note._id);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
    setUpdatedColor(note.color);
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  const saveUpdate = async (noteId) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/api/v1/notes/update-note/${noteId}`, {
        title: updatedTitle,
        description: updatedDescription,
        color: updatedColor
      });
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:3000/api/v1/notes/delete-note/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note");
    } finally {
      setIsDeleting(false);
    }
  };

  const getTextColorClass = (bgColor) => {
    const darkColors = ['red', 'blue', 'black', 'purple', 'green', 'gray', 'indigo'];
    const colorBase = bgColor.split('-')[0];

    if (darkColors.includes(colorBase) && (bgColor.includes('-700') || bgColor.includes('-800') || bgColor.includes('-900'))) {
      return 'text-white';
    }
    return 'text-neutral-700';
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading && !notes.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <Loader2Icon className="w-8 h-8 animate-spin text-amber-400 mb-2" />
        <p className="text-neutral-600 font-medium">Loading your notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="mt-6">
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-neutral-400 mb-4">
            <PlusCircleIcon className="w-12 h-12" />
          </div>
          <p className="text-neutral-600 text-center mb-2">You don't have any notes yet</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Create your first note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => {
            // Handle background color safely
            const bgColorClass = note.color && note.color.startsWith('bg-')
              ? note.color
              : `bg-${note.color}`;

            const textColorClass = getTextColorClass(note.color);

            return (
              <div
                key={note._id}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${editingNote === note._id ? 'bg-white border border-gray-200' : bgColorClass
                  }`}
              >
                {editingNote === note._id ? (
                  // Edit mode
                  <div className="p-4 flex flex-col gap-3">
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Note title"
                      />
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-neutral-700 min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Note content"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setUpdatedColor(color)}
                            className={`w-8 h-8 rounded-full cursor-pointer bg-${color} transition-all duration-200 ${updatedColor === color
                                ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-110'
                                : 'hover:scale-105'
                              }`}
                            aria-label={`Select ${color} color`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                      >
                        <XIcon className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={() => saveUpdate(note._id)}
                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Note</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(note)}
                            className="p-1.5 bg-white bg-opacity-70 text-blue-500 rounded-full hover:bg-opacity-100 transition-all"
                            aria-label="Edit note"
                          >
                            <Edit2Icon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="p-1.5 bg-white bg-opacity-70 text-red-500 rounded-full hover:bg-opacity-100 transition-all"
                            disabled={isDeleting}
                            aria-label="Delete note"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h2 className={`font-bold ${textColorClass} text-xl mb-2 line-clamp-2`}>{note.title}</h2>
                      <div className={`${textColorClass} opacity-80 mb-4 line-clamp-4 text-sm min-h-16`}>
                        {note.description}
                      </div>
                      <div className="flex justify-end mt-3">
                        <div className="flex items-center text-xs text-neutral-500">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {formatDate(note.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className={`h-1 w-full ${bgColorClass.replace('-200', '-300')}`}></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NoteCard;