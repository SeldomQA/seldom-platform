import request from "./HttpCommon.js";

class TaskApi {
  createTask(data) {
    return request.post("/api/task/create", data);
  }

  getTasks() {
    return request.get("/api/task/list");
  }

  getTask(pid) {
    return request.get("/api/task/" + pid + "/");
  }
  
  updateTask(pid, data) {
    return request.put("/api/task/" + pid + "/", data);
  }
}

export default new TaskApi();
