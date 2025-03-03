import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Bell} from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

const NoteCard = ({ note, onEdit }) => {
  const { deleteNote } = useNotes();
  const [showActions, setShowActions] = useState(false);
  
  const cardColors = {
    'orange': 'bg-orange-200',
    'amber': 'bg-amber-200',
    'yellow': 'bg-yellow-200',
    'lime': 'bg-lime-200',
    'emerald': 'bg-emerald-200',
    'cyan': 'bg-cyan-200',
    'blue': 'bg-blue-200',
    'violet': 'bg-violet-200',
    'purple': 'bg-purple-200',
    'pink': 'bg-pink-200',
    'red': 'bg-red-200',
  };
  
  const bgColor = cardColors[note.color] || 'bg-amber-200';
  
  return (
    <div 
      className={`${bgColor} rounded-lg p-4 relative overflow-hidden transition-all duration-200 hover:shadow-md`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <h3 className="text-lg font-semibold mb-2 pr-6">{note.title}</h3>
      <p className="text-sm mb-4 line-clamp-3">{note.content}</p>
      
      {note.reminder && (
        <div className="flex items-center text-xs mb-3 text-gray-700">
          <Bell size={14} className="mr-1" />
          <span>
            {format(new Date(note.reminder.date), "MMM d, yyyy 'at' h:mm a")}
            {note.reminder.isCompleted ? " (Completed)" : ""}
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-auto">
        <div className="text-xs text-gray-600">{note.updatedAt}</div>
        
        <div className={`flex space-x-1 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-full hover:bg-white/30"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => deleteNote(note.id)}
            className="p-1.5 rounded-full hover:bg-white/30"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;