"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NoteEditor from "@/components/note editor/note editor";
import NoteList from "@/components/note list/note list";
import Navbar from "@/components/Navbar";
import jsPDF from "jspdf";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(saved);
  }, []);

  const saveNote = (note) => {
    let updated;
    if (editIdx !== null) {
      // Edit mode
      updated = notes.map((n, i) => (i === editIdx ? note : n));
      setNotes(updated);
      localStorage.setItem("notes", JSON.stringify(updated));
      setEditIdx(null);
      setEditValue("");
    } else {
      // Add mode
      updated = [note, ...notes];
      setNotes(updated);
      localStorage.setItem("notes", JSON.stringify(updated));
    }
    // Download all notes after save or update
    const content = updated.join("\n\n----------------------\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    if (editIdx === index) {
      setEditIdx(null);
      setEditValue("");
    }
  };

  const handleEdit = (index) => {
    setEditIdx(index);
    setEditValue(notes[index]);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    notes.forEach((note, idx) => {
      doc.text(`${idx + 1}. ${note}`, 10, y);
      y += 15;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("notes.pdf");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold text-center mb-4">📝 My Notepad</h1>
        <button
          onClick={handleDownloadPDF}
          style={{
            display: "block",
            margin: "0 auto 24px auto",
            padding: "10px 28px",
            borderRadius: "6px",
            border: "none",
            background: "#10b981",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(16,185,129,0.08)",
            transition: "background 0.2s",
          }}
        >
          Download as PDF
        </button>
        <NoteEditor
          onSave={saveNote}
          editValue={editValue}
          editIdx={editIdx}
          onCancelEdit={() => {
            setEditIdx(null);
            setEditValue("");
          }}
        />
        <NoteList notes={notes} onDelete={deleteNote} onEdit={handleEdit} />
      </main>
    </>
  );
}
