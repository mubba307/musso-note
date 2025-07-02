"use client";
import { useState, useEffect } from "react";

export default function NoteEditor({ onSave, editValue, editIdx, onCancelEdit }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editIdx !== null && editValue !== undefined) {
      setText(editValue);
    } else {
      setText("");
    }
  }, [editIdx, editValue]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text);
    setText("");
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="5"
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {editIdx !== null ? (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Note
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleSave}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Note
        </button>
      )}
    </div>
  );
}
