import React, { useState } from "react";
import axios from "axios";
import { Loader2Icon, Clock, Calendar, Bell, XIcon, Save, CheckCircle } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const ReminderNote = ({ onClose, onSave, initialData = null }) => {
    const { userId } = useAuth();
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [color, setColor] = useState(initialData?.color || "amber-200");
    const [date, setDate] = useState(
        initialData?.reminderDate
            ? new Date(initialData.reminderDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]
    );
    const [time, setTime] = useState(
        initialData?.reminderDate
            ? new Date(initialData.reminderDate).toTimeString().split(" ")[0].slice(0, 5)
            : new Date().toTimeString().split(" ")[0].slice(0, 5)
    );
    const [loading, setLoading] = useState(false);

    const colorOptions = [
        "amber-200", "blue-200", "green-200", "red-200",
        "purple-200", "pink-200", "yellow-200", "indigo-200"
    ];

    const saveReminder = async () => {
        if (!title.trim() || !description.trim()) return;

        setLoading(true);

        try {
            const reminderDate = new Date(`${date}T${time}`);

            const noteData = {
                userId,
                title,
                description,
                color,
                type: "reminder",
                reminderDate: reminderDate.toISOString()
            };

            let response;

            if (initialData?._id) {
                // Update existing reminder
                response = await axios.put(
                    `http://localhost:3000/api/v1/notes/update-note/${initialData._id}`,
                    noteData
                );
            } else {
                // Create new reminder
                response = await axios.post(
                    "http://localhost:3000/api/v1/notes/create-notes",
                    noteData
                );
            }

            if (onSave && response.data.success) {
                onSave(response.data.data);
            }

            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error("Error saving reminder:", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate the time difference for the countdown
    const calculateTimeRemaining = () => {
        const now = new Date();
        const reminderTime = new Date(`${date}T${time}`);
        const diffMs = reminderTime - now;

        if (diffMs <= 0) return "Time has passed";

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
        } else {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
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

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl transition-all duration-300 ease-in-out p-6 ${color && color.startsWith('bg-') ? color : `bg-${color}`}`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Bell size={20} className={getTextColorClass(color)} />
                        <h2 className={`text-lg font-semibold ${getTextColorClass(color)}`}>
                            Set Reminder
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-500 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full"
                    >
                        <XIcon size={18} />
                    </button>
                </div>

                <div className="bg-white bg-opacity-80 p-4 rounded-lg mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Reminder Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="mb-3">
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-24"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Date</label>
                            <div className="relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-8 pr-2 py-2 border rounded-lg"
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Time</label>
                            <div className="relative">
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Clock size={16} />
                                </div>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full pl-8 pr-2 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Reminder Color</label>
                        <div className="flex flex-wrap gap-2">
                            {colorOptions.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-full cursor-pointer bg-${c} transition-all duration-200 ${color === c
                                        ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-110'
                                        : 'hover:scale-105'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white bg-opacity-80 p-3 rounded-lg flex items-center mb-4">
                    <Bell size={16} className="text-amber-500 mr-2" />
                    <div className="text-sm">
                        Reminder set for{" "}
                        <span className="font-semibold">
                            {new Date(`${date}T${time}`).toLocaleString()}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                            {calculateTimeRemaining()} from now
                        </div>
                    </div>
                </div>


                <div className="p-4 border-t flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveReminder}
                        disabled={loading || !title.trim() || !description.trim()}
                        className={`px-4 py-2 rounded-lg flex items-center gap-1 ${loading || !title.trim() || !description.trim()
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                    >
                        {loading ? (
                            <Loader2Icon size={16} className="animate-spin" />
                        ) : (
                            <CheckCircle size={16} />
                        )}
                        Set Reminder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderNote;