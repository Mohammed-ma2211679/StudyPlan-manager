class YearRepo {
  storageKey = "years";

  getYears() {
    if (typeof window === "undefined") return []; // Server-side safety
    const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveYears(years) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(this.storageKey, JSON.stringify(years));
  }

  getYearById(id) {
    const years = this.getYears();
    return years.find((year) => year.id === id);
  }

  addYear(newYear) {
    const years = this.getYears();
    years.push(newYear);
    this.saveYears(years);
    return newYear;
  }

  createYear() {
    const years = this.getYears();
    const newYearId = years.length + 1;
    const newYear = {
      id: newYearId,
      courses: {
        fall: [],
        winter: [],
        spring: [],
        summer: [],
      },
    };
    years.push(newYear);
    this.saveYears(years);
    return newYear;
  }

  updateYear(updatedYear) {
    const years = this.getYears();
    const index = years.findIndex((year) => year.id === updatedYear.id);
    if (index !== -1) {
      years[index] = updatedYear;
      this.saveYears(years);
      return updatedYear;
    } else {
      throw new Error("Year not found");
    }
  }

  addCourseToYear(yearId, semester, course) {
    const year = this.getYearById(yearId);
    year.courses[semester].push(course);
    return this.updateYear(year);
  }

  deleteYear(yearId) {
    let years = this.getYears();
    const updatedYears = years.filter((year) => year.id !== yearId);
    updatedYears.forEach((year, idx) => {
      year.id = idx + 1;
    });
    this.saveYears(updatedYears);
    return updatedYears;
  }

  deleteCourseFromYear(yearId, semester, courseIndex) {
    const year = this.getYearById(yearId);
    if (year && year.courses[semester]) {
      year.courses[semester].splice(courseIndex, 1);
      return this.updateYear(year);
    } else {
      throw new Error("Year or semester not found");
    }
  }

  getFinalCredits() {
    const years = this.getYears();
    return years.reduce((total, year) => {
      return (
        total +
        Object.values(year.courses).reduce((sum, courses) => {
          return (
            sum +
            courses.reduce((acc, course) => acc + (course.credits || 0), 0)
          );
        }, 0)
      );
    }, 0);
  }

  getFinalPoints() {
    const years = this.getYears();
    const pointsSystem = {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      F: 0,
    };
  }

  getFinalGPA() {}

  getYearCredits(yearId) {
    const year = this.getYearById(yearId);
    if (!year) return 0;
    return Object.values(year.courses).reduce((total, semesterCourses) => {
      return (
        total +
        semesterCourses.reduce((sum, course) => sum + (course.credits || 0), 0)
      );
    }, 0);
  }

  getYearPoints(yearId) {}

  getYearGPA(yearId) {}

  getSemesterCredits(yearId, semester) {
    const year = this.getYearById(yearId);
    if (!year || !year.courses[semester]) return 0;
    return year.courses[semester].reduce(
      (total, course) => total + (course.credits || 0),
      0
    );
  }

  getSemesterPoints(yearId, semester) {}

  getSemesterGPA(yearId, semester) {}
}

export default new YearRepo();
