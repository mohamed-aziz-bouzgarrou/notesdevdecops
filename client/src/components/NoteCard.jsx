import React from "react";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
      <h3 className='text-xl font-semibold text-gray-800 mb-2 truncate'>
        {note.title}
      </h3>
      <p className='text-gray-600 mb-4 line-clamp-3'>
        {note.content || "No content"}
      </p>
      <p className='text-sm text-gray-400 mb-4'>
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
      <div className='flex gap-2'>
        <button
          onClick={() => onEdit(note._id)}
          className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors'>
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className='flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors'>
          Delete
        </button>
      </div>
    </div>
  );
}
