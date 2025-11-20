import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { noteService } from "../api";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await noteService.createNote({ title, content });
      navigate("/");
    } catch (err) {
      setError("Failed to create note");
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8'>
          Create New Note
        </h1>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='bg-white p-8 rounded-lg shadow-md space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter note title'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor='content'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Content
            </label>
            <textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='Enter note content'
              rows='10'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              disabled={loading}
            />
          </div>

          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded transition-colors'>
              {loading ? "Creating..." : "Create Note"}
            </button>
            <button
              type='button'
              onClick={() => navigate("/")}
              disabled={loading}
              className='flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded transition-colors'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
