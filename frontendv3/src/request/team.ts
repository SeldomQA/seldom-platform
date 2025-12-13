import request from "./common/http";
import { TNomalObject } from "./common/http";

class TeamApi {
  createTeam(data: TNomalObject) {
    return request.post("/api/project/team/create", data);
  }

  getTeamAll(data?: TNomalObject) {
    return request.get("/api/project/team/list", data);
  }

  getTeamDetails(tid: string) {
    return request.get("/api/project/team/" + tid + "/");
  }

  updateTeam(tid: string, data: TNomalObject) {
    return request.put("/api/project/team/" + tid + "/", data);
  }

  deleteTeam(tid: string) {
    return request.del("/api/project/team/" + tid + "/");
  }
}

export default new TeamApi();
