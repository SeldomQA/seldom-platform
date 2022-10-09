import request from "./HttpCommon.js";
import { TNomalObject } from "./HttpCommon";

class TaskApi {
  createTask(data: TNomalObject) {
    return request.post("/api/task/create", data);
  }

  getTasks() {
    return request.get("/api/task/list");
  }

  getTask(pid: string) {
    return request.get("/api/task/" + pid + "/");
  }

  updateTask(pid: string, data: TNomalObject) {
    return request.put("/api/task/" + pid + "/", data);
  }
}

export default new TaskApi();
