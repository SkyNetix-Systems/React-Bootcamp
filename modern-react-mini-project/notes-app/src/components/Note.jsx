import React from 'react'

const Note = ({ note, deleteNote }) => {
    return (
        <div
            className='p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500'
            style={{
                borderLeftColor: note.priority === 'High' ? 'red' : note.priority === 'Medium' ? 'orange' : 'green'
            }}
        >
            <h3 className="text-lg font-bold">{note.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
                {note.description}
            </p>
            <button onClick={() => deleteNote(note.id)} className='mt-3 text-red-500 cursor-pointer transition hover:text-red-700'>
                🗑️ Delete
            </button>

            <div className="mt-2 text-xs text-gray-400">
                <span className='mr-4'>Priority: {note.priority}</span>
                <span>Category: {note.category}</span>
            </div>
        </div>
    )
}

export default Note;
