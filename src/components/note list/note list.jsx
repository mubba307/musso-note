"use client";

export default function NoteList({ notes, onDelete, onEdit }) {
  return (
    <ul className="space-y-4">
      {notes.map((note, idx) => (
        <li
          key={idx}
          className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center transition-transform hover:scale-[1.02] hover:shadow-lg"
        >
          <span className="text-lg break-words max-w-xs">{note}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(idx)}
              className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(idx)}
              className="px-4 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
