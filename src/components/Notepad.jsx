import React, { useState, useEffect } from 'react';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'notepad-note';

/**
 * Notepad Component
 * A simple, professional notepad with save functionality and localStorage persistence.
 */
const Notepad = () => {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  // Load note from localStorage on mount
  useEffect(() => {
    const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNote) setNote(savedNote);
  }, []);

  // Handle textarea change
  const handleChange = (e) => {
    setNote(e.target.value);
    setSaved(false);
  };

  // Save note to localStorage
  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, note);
    setSaved(true);
  };

  return (
    <section className="notepad-container">
      <h2 className="notepad-title">📝 Notepad</h2>
      <textarea
        className="notepad-textarea"
        value={note}
        onChange={handleChange}
        rows={10}
        placeholder="Type your note here..."
      />
      <div className="notepad-actions">
        <button className="notepad-save-btn" onClick={handleSave}>
          Save
        </button>
        {saved && <span className="notepad-saved">Saved!</span>}
      </div>
      <style jsx>{`
        .notepad-container {
          max-width: 480px;
          margin: 48px auto;
          padding: 32px 24px 24px 24px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .notepad-title {
          margin-bottom: 20px;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          color: #222;
        }
        .notepad-textarea {
          width: 100%;
          min-height: 160px;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 1.1rem;
          margin-bottom: 18px;
          resize: vertical;
          background: #f7fafc;
          color: #222;
          transition: border 0.2s;
        }
        .notepad-textarea:focus {
          outline: none;
          border: 1.5px solid #0070f3;
        }
        .notepad-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .notepad-save-btn {
          padding: 10px 28px;
          border-radius: 6px;
          border: none;
          background: #0070f3;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,112,243,0.08);
          transition: background 0.2s;
        }
        .notepad-save-btn:hover {
          background: #0059c1;
        }
        .notepad-saved {
          color: #22c55e;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default Notepad; 