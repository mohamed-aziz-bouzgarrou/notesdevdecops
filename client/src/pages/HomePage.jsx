import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { noteService } from "../api";
import NoteCard from "../components/NoteCard";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getAllNotes();
      setNotes(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await noteService.deleteNote(id);
        setNotes(notes.filter((note) => note._id !== id));
      } catch (err) {
        setError("Failed to delete note");
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>My Notes</h1>
          <button
            onClick={() => navigate("/new")}
            className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors'>
            + New Note
          </button>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <p className='text-gray-600'>Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg mb-4'>
              No notes yet. Create your first note!
            </p>
            <button
              onClick={() => navigate("/new")}
              className='inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors'>
              Create Note
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
