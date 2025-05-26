"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="about-container">
      <h1>About QU Study Plan Manager</h1>
      <p className="status">🚧 Under development 🚧</p>

      <section>
        <h2>What is it?</h2>
        <p>
          <strong>QU Study Plan Manager</strong> is a dynamic, interactive web
          application designed to help Qatar University (QU) students visualize
          and organize their academic journey. Inspired by QU's official
          flowcharts, the platform provides a clear, intuitive interface for
          course planning across multiple years and semesters.
        </p>
      </section>

      <section>
        <h2>🎨 Design</h2>
        <p>
          The design is responsive and intuitive, modeled after the official{" "}
          <a
            href="https://www.qu.edu.qa/en-us/colleges/engineering/documents/cse/cse_documents/study_plan/cs/2024-cs-prerequisite-flowchart.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            2024 CS Prerequisite Flowchart (PDF)
          </a>
          . This ensures consistency and ease of use for students already
          familiar with QU documentation.
        </p>
      </section>

      <section>
        <h2>📌 Features</h2>
        <ul>
          <li>
            <strong>Visual Course Blocks:</strong> Each course is shown as a
            block with code, title, and credits.
          </li>
          <li>
            <strong>Interactive Flowchart Layout:</strong> Organize courses by
            year and semester in a visual grid.
          </li>
          <li>
            <strong>Pre-Made Study Plans:</strong> Jumpstart planning with
            predefined templates for specific majors.
          </li>
          <li>
            <strong>Drag & Drop Functionality:</strong> Move course blocks
            around to build your own path.
          </li>
          <li>
            <strong>Automatic Credit Calculation:</strong> Instantly updates
            total credit hours per semester.
          </li>
          <li>
            <strong>Violation Warnings:</strong> Visual cues (like red blocks)
            highlight issues with prerequisites or credit limits.
          </li>
        </ul>
      </section>

      <section>
        <h2>❗ Disclaimer</h2>
        <p>
          This tool is <strong>not affiliated</strong> with Qatar University. It
          is a student-built project created to support fellow students in
          planning their academic progress with more ease and clarity.
        </p>
      </section>
    </main>
  );
}
