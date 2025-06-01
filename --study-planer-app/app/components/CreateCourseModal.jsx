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

    if (grade < 0 || grade > 100) {
      alert("Grade must be between 0 and 100.");
      return;
    }
    if (credits < 1 || credits > 4) {
      alert("Credits must be between 1 and 4.");
      return;
    }

    const GPA =
      grade >= 90
        ? 4
        : grade >= 85
        ? 3.5
        : grade >= 80
        ? 3
        : grade >= 75
        ? 2.5
        : grade >= 70
        ? 2
        : grade >= 65
        ? 1.5
        : grade >= 60
        ? 1
        : 0;

    const points = credits * GPA;

    const newCourse = {
      title,
      code,
      grade,
      credits,
      points,
      GPA,
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
          min={0}
          max={100}
          onChange={(e) => setGrade(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          min={1}
          max={4}
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
