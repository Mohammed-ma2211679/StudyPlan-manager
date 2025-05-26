"use client";

import Image from "next/image";
import cuid from "cuid";
import CreateCourseModal from "./components/CreateCourseModal"; // Adjust path

import React, { useEffect, useState } from "react";
import {
  getYearsAction,
  createYearAction,
  addCourseToYearAction,
  addYearAction,
  updateYearAction,
  saveYearsAction,
  deleteYearAction,
  deleteCourseAction,
  getFinalCreditsAction,
} from "./actions/server-actions";

export default function Home() {
  const [years, setYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYearId, setSelectedYearId] = useState(null);
  const [FinalGPA, setFinalGPA] = useState(0);
  const [FinalPoints, setFinalPoints] = useState(0);
  const [FinalCredits, setFinalCredits] = useState(0);
  const userId = localStorage.getItem("userId") || cuid();
  localStorage.setItem("userId", userId);

  const loadYears = async () => {
    try {
      const fetchedYears = await getYearsAction();
      setYears(fetchedYears);
      setFinalCredits(await getFinalCreditsAction());
    } catch (error) {
      console.error("Error loading years:", error);
    }
  };

  useEffect(() => {
    loadYears();
  }, []);

  const handleAddYear = async () => {
    await createYearAction();
    loadYears();
  };

  const handleCreateCourse = async (newCourse) => {
    addCourseToYearAction(selectedYearId, selectedSemester, newCourse);
    setShowModal(false);
    setSelectedSemester("");
    setSelectedYearId(null);

    loadYears();
  };

  const handleDeleteCourse = async (yearId, semester, courseIndex) => {
    try {
      await deleteCourseAction(yearId, semester, courseIndex);
      loadYears();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <main>
      <div className="header">
        Here you can create components and drag them to the content grid
      </div>
      <div className="content">
        {years.map((year) => (
          <div className={`year year-${year.id}`} key={year.id}>
            <div className="year-header">
              <h2>Year {year.id}</h2>
              <button
                className="remove-year-btn"
                onClick={() => {
                  deleteYearAction(year.id)
                    .then(() => loadYears())
                    .catch((error) =>
                      console.error("Error deleting year:", error)
                    );
                }}
              >
                ❌
              </button>
            </div>

            {["fall", "winter", "spring", "summer"].map((sem) => (
              <div className={`semester ${sem}`} key={sem}>
                <h3>{sem.charAt(0).toUpperCase() + sem.slice(1)}</h3>
                {year.courses[sem].map((course, idx) => (
                  <div className="course-card" key={idx}>
                    <button
                      className="remove-btn"
                      onClick={() => {
                        handleDeleteCourse(year.id, sem, idx);
                      }}
                    >
                      ❌
                    </button>
                    <p>Title : {course.title}</p>
                    <p>Course Code: {course.code}</p>
                    <p>Grade: {course.grade}</p>
                    <p>Credits : {course.credits}</p>
                  </div>
                ))}
                <button
                  className="btn"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedSemester(sem);
                    setSelectedYearId(year.id);
                    console.log(year.id, sem);
                  }}
                >
                  Add Course
                </button>
                <CreateCourseModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  onCreate={handleCreateCourse}
                />
              </div>
            ))}
          </div>
        ))}
        <button className="add-year btn" onClick={handleAddYear}>
          Add a new year
        </button>
      </div>
      <div className="details">
        Final GPA: {FinalGPA}
        <br />
        Final Points: {FinalPoints}
        <br />
        Final Credits: {FinalCredits}
      </div>
    </main>
  );
}
