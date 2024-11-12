import request from "./common/http";
import { TNomalObject } from "./common/http";

class TeamApi {
  createTeam(data: TNomalObject) {
    return request.post("/api/team/create", data);
  }

  getTeamAll(data?: TNomalObject) {
    return request.get("/api/team/list", data);
  }

  getTeamDetails(tid: string) {
    return request.get("/api/team/" + tid + "/");
  }

  updateTeam(tid: string, data: TNomalObject) {
    return request.put("/api/team/" + tid + "/", data);
  }

  deleteTeam(tid: string) {
    return request.del("/api/team/" + tid + "/");
  }
}

export default new TeamApi();
