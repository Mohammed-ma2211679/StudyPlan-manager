"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You'd send `form` to an API or email handler here
    console.log("Submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="contact-container">
      <h1>Contact Us</h1>
      {submitted && <p className="success">Thanks! We'll be in touch soon.</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            required
            value={form.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </main>
  );
}
