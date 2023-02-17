import request from "./HttpCommon.js";
import { TNomalObject } from "./HttpCommon";

class TaskApi {
  createTask(data: TNomalObject) {
    return request.post("/api/task/create", data);
  }

  getTaskAll(data: TNomalObject) {
    return request.get("/api/task/list", data);
  }

  getTaskDetails(tid: string) {
    return request.get("/api/task/" + tid + "/");
  }

  updateTask(tid: string, data: TNomalObject) {
    return request.put("/api/task/" + tid + "/", data);
  }

  deleteTask(tid: string) {
    return request.del("/api/task/" + tid + "/");
  }

  runningTask(tid: string) {
    return request.post("/api/task/" + tid + "/running");
  }

  addTimed(tid: string, data: TNomalObject) {
    return request.post("/api/task/" + tid + "/timed", data);
  }

  deleteTimed(tid: string) {
    return request.del("/api/task/" + tid + "/timed");
  }

  getReportAll(data: TNomalObject) {
    return request.get("/api/task/reports", data);
  }

  getReportResult(rid: string, data: TNomalObject) {
    return request.post("/api//task/report/" + rid + "/results", data);
  }
}

export default new TaskApi();
