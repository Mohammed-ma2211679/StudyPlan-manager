"use client";
import { Download, Upload } from "lucide-react";

import Image from "next/image";
import cuid from "cuid";
import CreateCourseModal from "./components/CreateCourseModal.jsx";

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
} from "./actions/client-actions";
import yearRepo from "./repo/yearRepo.js";

export default function Home() {
  const [years, setYears] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYearId, setSelectedYearId] = useState(null);
  const [FinalGPA, setFinalGPA] = useState(0);
  const [FinalPoints, setFinalPoints] = useState(0);
  const [FinalCredits, setFinalCredits] = useState(0);

  const loadYears = async () => {
    try {
      const fetchedYears = await getYearsAction();
      setYears(fetchedYears);
      setFinalCredits(await getFinalCreditsAction());
      setFinalPoints(yearRepo.getFinalPoints());
      setFinalGPA(yearRepo.getFinalGPA());
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
    await addCourseToYearAction(selectedYearId, selectedSemester, newCourse);
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
        <a href="" className="btn">
          Download your study plan 📥
        </a>
        <a href="" className="btn">
          Upload your study plan 📤
        </a>
      </div>

      <div className="content">
        {years.map((year) => {
          const yearCredits = yearRepo.getYearCredits(year.id);
          const yearPoints = yearRepo.getYearPoints(year.id);
          const yearGPA = yearRepo.getYearGPA(year.id);
          return (
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

              {["spring", "summer", "fall", "winter"].map((sem) => {
                const semesterCredits = yearRepo.getSemesterCredits(
                  year.id,
                  sem
                );
                const semesterPoints = yearRepo.getSemesterPoints(year.id, sem);
                const semesterGPA = yearRepo.getSemesterGPA(year.id, sem);

                return (
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
                        <p>Points : {course.points}</p>
                        <p>GPA : {course.GPA}</p>
                      </div>
                    ))}
                    <button
                      className="btn"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedSemester(sem);
                        setSelectedYearId(year.id);
                      }}
                    >
                      Add Course
                    </button>
                    <div>
                      <p>Credits: {semesterCredits}</p>
                      <p>Points: {semesterPoints}</p>
                      <p>GPA: {semesterGPA}</p>
                    </div>
                  </div>
                );
              })}
              <CreateCourseModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateCourse}
              />

              <div className="year-summary">
                <h3>Year Summary</h3>
                <p>Total Credits: {yearCredits}</p>
                <p>Total Points: {yearPoints}</p>
                <p>GPA: {yearGPA}</p>
              </div>
            </div>
          );
        })}
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
