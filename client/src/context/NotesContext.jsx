import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Check for reminders that need to be triggered
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      notes.forEach(note => {
        if (note.reminder && !note.reminder.isCompleted) {
          const reminderDate = new Date(note.reminder.date);
          
          if (reminderDate <= now) {
            // Simulate notification
            toast.success(`Reminder: ${note.title}`, {
              duration: 5000,
              position: 'top-right',
              icon: '🔔',
            });
            
            // In a real app, here you would call an API to send WhatsApp or email
            console.log(`Sending ${note.reminder.notificationType} notification for: ${note.title}`);
            
            // Mark reminder as completed
            completeReminder(note.reminder.id);
          }
        }
      });
    };

    // Check on load and every minute
    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    
    return () => clearInterval(interval);
  }, [notes]);

  const addNote = (title, content, type, color) => {
    const now = format(new Date(), "yyyy/MM/dd");
    const newNote = {
      id: uuidv4(),
      title,
      content,
      type,
      color,
      createdAt: now,
      updatedAt: now,
      tags: []
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    return newNote.id;
  };

  const updateNote = (id, updates) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              ...updates, 
              updatedAt: format(new Date(), "yyyy/MM/dd") 
            } 
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const addReminder = (noteId, date, notificationType) => {
    const reminderId = uuidv4();
    
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { 
              ...note, 
              reminder: {
                id: reminderId,
                noteId,
                date,
                notificationType,
                isCompleted: false
              } 
            } 
          : note
      )
    );
    
    return reminderId;
  };

  const completeReminder = (reminderId) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.reminder && note.reminder.id === reminderId 
          ? { 
              ...note, 
              reminder: {
                ...note.reminder,
                isCompleted: true
              } 
            } 
          : note
      )
    );
  };

  const deleteReminder = (reminderId) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.reminder && note.reminder.id === reminderId 
          ? { 
              ...note, 
              reminder: undefined 
            } 
          : note
      )
    );
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      updateNote,
      deleteNote,
      addReminder,
      completeReminder,
      deleteReminder
    }}>
      {children}
    </NotesContext.Provider>
  );
};