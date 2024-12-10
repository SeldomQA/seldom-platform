import request from "./common/http";
import { TNomalObject } from "./common/http";

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
    return request.get("/api/task/" + tid + "/running");
  }

  addTimed(tid: string, data: TNomalObject) {
    return request.post("/api/task/" + tid + "/timed", data);
  }
  
  switchTimed(taskId: string) {
    return request.put(`/api/task/timed/switch?task_id=${taskId}`);
  }

  deleteTimed(taskId: string) {
    return request.del(`/api/task/timed/delete?task_id=${taskId}`);
  }

  getReportAll(data: TNomalObject) {
    return request.get("/api/task/reports", data);
  }

  getReportResult(rid: string, data: TNomalObject) {
    return request.post("/api/task/report/" + rid + "/results", data);
  }

  createTimed(data: any) {
    return request.post("/api/task/timed/create", data);
  }
}

export default new TaskApi();
