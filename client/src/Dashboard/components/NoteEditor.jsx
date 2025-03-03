import React, { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";
import { format } from "date-fns";
import { useNotes } from "../../context/NotesContext";

const NoteEditor = ({ isOpen, onClose, editingNote }) => {
  const { addNote, updateNote, addReminder } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("amber");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [notificationType, setNotificationType] = useState("email");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color);

      if (editingNote.reminder) {
        const date = new Date(editingNote.reminder.date);
        setReminderDate(format(date, "yyyy-MM-dd"));
        setReminderTime(format(date, "HH:mm"));
        setNotificationType(editingNote.reminder.notificationType);
      }
    } else {
      resetForm();
    }
  }, [editingNote, isOpen]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setColor("amber");
    setReminderDate("");
    setReminderTime("");
    setNotificationType("email");
    setShowColorPicker(false);
    setShowReminderPicker(false);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingNote) {
      updateNote(editingNote.id, {
        title,
        content,
        color,
      });
    } else {
      const noteId = addNote(title, content, "text", color);

      // Add reminder if set
      if (reminderDate && reminderTime) {
        const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
        addReminder(noteId, reminderDateTime.toISOString(), notificationType);
      }
    }

    onClose();
    resetForm();
  };

  const colorOptions = [
    { name: "red", hex: "#fecaca" },
    { name: "orange", hex: "#fed7aa" },
    { name: "amber", hex: "#fde68a" },
    { name: "yellow", hex: "#fef08a" },
    { name: "lime", hex: "#d9f99d" },
    { name: "emerald", hex: "#a7f3d0" },
    { name: "cyan", hex: "#a5f3fc" },
    { name: "blue", hex: "#bfdbfe" },
    { name: "violet", hex: "#ddd6fe" },
    { name: "purple", hex: "#e9d5ff" },
    { name: "pink", hex: "#fbcfe8" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {editingNote ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-medium border-none focus:outline-none focus:ring-0 p-0"
            />
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full border-none focus:outline-none focus:ring-0 p-0 resize-none"
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-8 h-8 rounded-full border border-gray-200"
                  style={{
                    backgroundColor: colorOptions.find((c) => c.name === color)
                      ?.hex,
                  }}
                />

                {showColorPicker && (
                  <div className="absolute left-0 top-10 z-10 bg-white p-2 rounded-lg shadow-lg">
                    <div className="grid grid-cols-6 gap-1 mb-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            setColor(option.name);
                            setShowColorPicker(false);
                          }}
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: option.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowReminderPicker(!showReminderPicker)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <Bell size={16} className="mr-1" />
                  {reminderDate && reminderTime
                    ? "Edit reminder"
                    : "Add reminder"}
                </button>

                {showReminderPicker && (
                  <div className="absolute left-0 top-8 z-10 bg-white p-4 rounded-lg shadow-lg w-72">
                    <h3 className="text-sm font-medium mb-2">Set Reminder</h3>

                    <div className="mb-3">
                      <label className="block text-xs text-gray-500 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="w-full border rounded p-1.5 text-sm"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs text-gray-500 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full border rounded p-1.5 text-sm"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs text-gray-500 mb-1">
                        Notification Type
                      </label>
                      <select
                        value={notificationType}
                        onChange={(e) => setNotificationType(e.target.value)}
                        className="w-full border rounded p-1.5 text-sm"
                      >
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="both">Both</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowReminderPicker(false)}
                        className="text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={handleSave}
                disabled={!title.trim()}
                className={`px-4 py-2 rounded-lg text-white ${
                  title.trim()
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {editingNote ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
