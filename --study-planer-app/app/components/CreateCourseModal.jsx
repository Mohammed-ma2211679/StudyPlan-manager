"use client";
import React from "react";
import "@/app/components/CreateCourseModal.css"; // Make sure to include this CSS file
import { useState } from "react";

export default function CreateCourseModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");

  const handleCreate = () => {
    if (!title || !code || credits <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newCourse = {
      title,
      code,
      grade,
      credits,
    };
    onCreate(newCourse);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create New Course</h2>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          required
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleCreate} className="create-btn">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
