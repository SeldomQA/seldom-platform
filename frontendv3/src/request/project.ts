import request from "./HttpCommon";
import { TNomalObject } from "./HttpCommon";

class ProjectApi {
  createProject(data: TNomalObject) {
    return request.post("/api/project/create", data);
  }

  getProjects(data: TNomalObject) {
    return request.get("/api/project/list", data);
  }

  getProject(pid: string) {
    return request.get("/api/project/" + pid + "/");
  }

  updateProject(pid: string, data: TNomalObject) {
    return request.put("/api/project/" + pid + "/", data);
  }

  syncCode(pid: string) {
    return request.get("/api/project/" + pid + "/sync_code");
  }

  syncCase(pid: string) {
    return request.get("/api/project/" + pid + "/sync_case");
  }

  syncResult(pid: string) {
    return request.get("/api/project/" + pid + "/sync_result");
  }

  syncMerge(pid: string, data: TNomalObject) {
    return request.post("/api/project/" + pid + "/sync_merge", data);
  }

  getSyncLog() {
    return request.get("/api/project/sync_log");
  }

  deleteProject(pid: string) {
    return request.del("/api/project/" + pid + "/");
  }

  cloneProject(pid: string) {
    return request.get("/api/project/" + pid + "/clone");
  }

  // 后续有具体删除需求备用
  // removeProjectCover(pid:string) {
  //   return request.put('/api/project/cover/remove/' + pid + '/')
  // }

  syncProjectCase(pid: string) {
    return request.get("/api/project/" + pid + "/sync");
  }

  getProjectTree(pid: string) {
    return request.get("/api/project/" + pid + "/files");
  }

  getProjectCases(pid: string, file_name: string) {
    return request.get("/api/project/" + pid + "/cases", { file_name });
  }

  getProjectSubdirectory(pid: string, file_name: string) {
    return request.get("/api/project/" + pid + "/subdirectory", { file_name });
  }

  // Env functions
  createEnv(data: TNomalObject) {
    return request.post("/api/project/env", data);
  }

  getEnv(id: string) {
    return request.get("/api/project/env/" + id + "/");
  }

  getEnvs() {
    return request.get("/api/project/env/list");
  }

  deleteEnv(id: string) {
    return request.del("/api/project/env/" + id + "/");
  }

  updateEnv(id: string, data: TNomalObject) {
    return request.put("/api/project/env/" + id + "/", data);
  }
}

export default new ProjectApi();
