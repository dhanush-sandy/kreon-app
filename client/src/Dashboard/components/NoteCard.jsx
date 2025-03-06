import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const NoteCard = () => {
  const { userId } = useAuth();
  console.log(userId);   
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/notes/get-notes/${userId}`
        );
        setNotes(res.data || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [userId]); 

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p>{error}</p>;
  console.log(notes.data)

  return (
    <div>
      <h2>Your Notes</h2>
      <div className="">
        {notes.data.length > 0 ? (
          <div className="grid grid-cols-2 w-screen">
            {notes.data.map((note) => (
              <div
                key={note._id}
                className="bg-white shadow-lg rounded-lg p-6 border-l-4"
                style={{ borderColor: note.color }}
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-700">Title</h3>
                  <p className="text-gray-900 font-medium">{note.title}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Description
                  </h3>
                  <p className="text-gray-600">{note.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
