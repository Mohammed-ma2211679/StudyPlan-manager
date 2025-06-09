import fse from "fs-extra";
import path from "path";

class FileRepo {
  constructor() {
    this.basePath = path.join(process.cwd(), "app", "data", "myStudyPlan.json");
  }

  async getData() {
    const data = await fse.readJSON(this.basePath);
    return data || {};
  }

  async saveData(data) {
    return await fse.writeJSON(this.basePath, data);
  }
}

export default new FileRepo();
