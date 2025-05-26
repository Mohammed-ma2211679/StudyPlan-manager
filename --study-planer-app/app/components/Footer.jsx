import React from "react";
import myPic from "@/public/img/happy.gif";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Study Planner. All rights reserved.
      </p>
    </footer>
  );
}
