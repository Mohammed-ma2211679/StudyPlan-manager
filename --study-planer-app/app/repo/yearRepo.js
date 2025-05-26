import fse from "fs-extra";
import path from "path";

class YearRepo {
  constructor() {
    this.basePath = path.join(process.cwd(), "app/data");
  }

  async getYears() {
    return fse.readJSON(path.join(this.basePath, "years.json"));
  }

  async saveYears(years) {
    return fse.writeJSON(path.join(this.basePath, "years.json"), years);
  }

  async getYearById(id) {
    const years = await this.getYears();
    return years.find((year) => year.id === id);
  }

  // add a new year
  async addYear(newYear) {
    const years = await this.getYears();
    years.push(newYear);
    await this.saveYears(years);
    return newYear;
  }

  async createYear() {
    const years = await this.getYears();
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
    await this.saveYears(years);
    return newYear;
  }

  async updateYear(updatedYear) {
    const years = await this.getYears();
    const index = years.findIndex((year) => year.id === updatedYear.id);

    if (index !== -1) {
      years[index] = updatedYear;
      await this.saveYears(years);
      return updatedYear;
    } else {
      throw new Error("Year not found");
    }
  }

  // add a new course
  async addCourseToYear(yearId, semester, course) {
    const year = await this.getYearById(yearId);

    year.courses[semester].push(course);

    return this.updateYear(year);
  }

  async deleteYear(yearId) {
    const years = await this.getYears();
    const updatedYears = years.filter((year) => year.id !== yearId);
    // loop through each year and update the id
    updatedYears.forEach((year, index) => {
      year.id = index + 1; // Reset IDs to be sequential
    });
    await this.saveYears(updatedYears);
    return updatedYears;
  }

  async deleteCourseFromYear(yearId, semester, courseIndex) {
    const year = await this.getYearById(yearId);
    if (year && year.courses[semester]) {
      year.courses[semester].splice(courseIndex, 1);
      return this.updateYear(year);
    } else {
      throw new Error("Year or semester not found");
    }
  }

  async getFinalCredits() {
    const years = await this.getYears();
    return years.reduce((total, year) => {
      return (
        total +
        Object.values(year.courses).reduce((sum, courses) => {
          return (
            sum +
            courses.reduce((courseSum, course) => {
              return courseSum + (course.credits || 0);
            }, 0)
          );
        }, 0)
      );
    }, 0);
  }
}

export default new YearRepo();
