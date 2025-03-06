import React, { useState } from "react";
import axios from "axios";
import { Loader2Icon, X, Check, Palette } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const NoteEditor = ({ isOpen, onClose, onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("white");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();

  const colorOptions = [
    { name: "white", hex: "#ffffff", label: "White" },
    { name: "red", hex: "#fecaca", label: "Red" },
    { name: "orange", hex: "#fed7aa", label: "Orange" },
    { name: "amber", hex: "#fde68a", label: "Amber" },
    { name: "yellow", hex: "#fef08a", label: "Yellow" },
    { name: "lime", hex: "#d9f99d", label: "Lime" },
    { name: "emerald", hex: "#a7f3d0", label: "Emerald" },
    { name: "cyan", hex: "#a5f3fc", label: "Cyan" },
    { name: "blue", hex: "#bfdbfe", label: "Blue" },
    { name: "violet", hex: "#ddd6fe", label: "Violet" },
    { name: "purple", hex: "#e9d5ff", label: "Purple" },
    { name: "pink", hex: "#fbcfe8", label: "Pink" },
  ];

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/v1/notes/create-notes`,
        {
          title,
          description,
          color,
          userId,
        }
      );

      if (response.data.success) {
        setTitle("");
        setDescription("");
        setColor("white");
        if (onNoteCreated) onNoteCreated();
        onClose();
      } else {
        console.error("Failed to create note:", response.data.message);
        setTitle("");
        setDescription("");
        setColor("white");
        onClose();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: colorOptions.find((c) => c.name === color)?.hex,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Note</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pb-5">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-medium border-none focus:outline-none focus:ring-0 p-2 rounded-lg bg-transparent placeholder-black/40"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Write your note here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full border-none focus:outline-none focus:ring-0 p-2 rounded-lg bg-transparent placeholder-black/40 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/10">
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
                aria-label="Choose color"
                aria-expanded={showColorPicker}
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                  style={{
                    backgroundColor: colorOptions.find((c) => c.name === color)
                      ?.hex,
                  }}
                />
                <Palette size={18} />
              </button>

              {showColorPicker && (
                <div className="absolute left-0 bottom-12 z-10 bg-white p-3 rounded-xl shadow-xl border border-gray-200 min-w-[280px]">
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => {
                          setColor(option.name);
                          setShowColorPicker(false);
                        }}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={`Select ${option.label} color`}
                      >
                        <div className="relative">
                          <div
                            className="w-8 h-8 rounded-full border border-gray-200"
                            style={{ backgroundColor: option.hex }}
                          />
                          {color === option.name && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check size={16} className="text-black/70" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-600">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleCreate}
              disabled={!title.trim() || loading}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                title.trim() && !loading
                  ? "bg-amber-500 hover:bg-amber-600 shadow-md hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2Icon size={18} className="animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Note"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
