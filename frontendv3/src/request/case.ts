import request from "./HttpCommon";
import { TNomalObject } from "./HttpCommon";

class CaseApi {

  runningCase(case_id: string, data: TNomalObject) {
    return request.post("/api/case/" + case_id + "/running", data);
  }

  getCaseResult(case_id: string) {
    return request.get("/api/case/" + case_id + "/result");
  }

  getSyncLog() {
    return request.get("/api/project/sync_log")
  }

}

export default new CaseApi();
