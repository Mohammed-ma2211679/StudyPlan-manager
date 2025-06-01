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
    return years.reduce((total, year) => {
      return (
        total +
        Object.values(year.courses).reduce((sum, courses) => {
          return (
            sum + courses.reduce((acc, course) => acc + (course.points || 0), 0)
          );
        }, 0)
      );
    }, 0);
  }
  truncateTo2Decimals(num) {
    return Math.trunc(num * 100) / 100;
  }

  getFinalGPA() {
    const years = this.getYears();
    let totalPoints = 0;
    let totalCredits = 0;

    years.forEach((year) => {
      Object.values(year.courses).forEach((semesterCourses) => {
        semesterCourses.forEach((course) => {
          totalPoints += course.points || 0;
          totalCredits += course.credits || 0;
        });
      });
    });
    return totalCredits > 0
      ? this.truncateTo2Decimals(totalPoints / totalCredits)
      : 0;
  }

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

  getYearPoints(yearId) {
    const year = this.getYearById(yearId);
    if (!year) return 0;
    return Object.values(year.courses).reduce((total, semesterCourses) => {
      return (
        total +
        semesterCourses.reduce((sum, course) => sum + (course.points || 0), 0)
      );
    }, 0);
  }

  getYearGPA(yearId) {
    const year = this.getYearById(yearId);
    if (!year) return 0;
    let totalPoints = 0;
    let totalCredits = 0;

    Object.values(year.courses).forEach((semesterCourses) => {
      semesterCourses.forEach((course) => {
        totalPoints += course.points || 0;
        totalCredits += course.credits || 0;
      });
    });

    return totalCredits > 0
      ? this.truncateTo2Decimals(totalPoints / totalCredits)
      : 0;
  }

  getSemesterCredits(yearId, semester) {
    const year = this.getYearById(yearId);
    if (!year || !year.courses[semester]) return 0;
    return year.courses[semester].reduce(
      (total, course) => total + (course.credits || 0),
      0
    );
  }

  getSemesterPoints(yearId, semester) {
    const year = this.getYearById(yearId);
    if (!year || !year.courses[semester]) return 0;
    return year.courses[semester].reduce(
      (total, course) => total + (course.points || 0),
      0
    );
  }

  getSemesterGPA(yearId, semester) {
    const year = this.getYearById(yearId);
    if (!year || !year.courses[semester]) return 0;
    let totalPoints = 0;
    let totalCredits = 0;

    year.courses[semester].forEach((course) => {
      totalPoints += course.points || 0;
      totalCredits += course.credits || 0;
    });

    return totalCredits > 0
      ? this.truncateTo2Decimals(totalPoints / totalCredits)
      : 0;
  }
}

export default new YearRepo();
