"use client";

import yearRepo from "../repo/yearRepo";

export async function getYearsAction() {
  try {
    const years = await yearRepo.getYears();
    return years;
  } catch (error) {
    console.error("Error fetching years:", error);
    throw new Error("Failed to fetch years");
  }
}

export async function saveYearsAction(years) {
  try {
    await yearRepo.saveYears(years);
  } catch (error) {
    console.error("Error saving years:", error);
    throw new Error("Failed to save years");
  }
}

export async function addYearAction(newYear) {
  try {
    return await yearRepo.addYear(newYear);
  } catch (error) {
    console.error("Error adding year:", error);
    throw new Error("Failed to add year");
  }
}

export async function createYearAction() {
  try {
    return await yearRepo.createYear();
  } catch (error) {
    console.error("Error creating year:", error);
    throw new Error("Failed to create year");
  }
}

export async function updateYearAction(updatedYear) {
  try {
    return await yearRepo.updateYear(updatedYear);
  } catch (error) {
    console.error("Error updating year:", error);
    throw new Error("Failed to update year");
  }
}

export async function addCourseToYearAction(yearId, semester, course) {
  try {
    return await yearRepo.addCourseToYear(yearId, semester, course);
  } catch (error) {
    console.error("Error adding course to year:", error);
    throw new Error("Failed to add course to year");
  }
}

export async function deleteYearAction(yearId) {
  try {
    return await yearRepo.deleteYear(yearId);
  } catch (error) {
    console.error("Error deleting year:", error);
    throw new Error("Failed to delete year");
  }
}

export async function deleteCourseAction(yearId, semester, courseIndex) {
  try {
    const year = await yearRepo.getYearById(yearId);
    if (year) {
      year.courses[semester].splice(courseIndex, 1);
      return await yearRepo.updateYear(year);
    } else {
      throw new Error("Year not found");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course");
  }
}

export async function getFinalCreditsAction() {
  try {
    const years = await yearRepo.getYears();
    let totalCredits = 0;

    years.forEach((year) => {
      Object.values(year.courses).forEach((semesterCourses) => {
        semesterCourses.forEach((course) => {
          totalCredits += course.credits || 0; // Ensure credits is a number
        });
      });
    });

    return totalCredits;
  } catch (error) {
    console.error("Error calculating total credits:", error);
    throw new Error("Failed to calculate total credits");
  }
}
