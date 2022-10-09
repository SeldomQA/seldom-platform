import request from "./HttpCommon";
import { TNomalObject } from "./HttpCommon";

class UserApi {
  login(data: TNomalObject) {
    return request.post("/api/user/login", data);
  }

  logout(data: TNomalObject) {
    return request.post("/api/user/logout", data);
  }

  register(data: TNomalObject) {
    return request.post("/api/user/register", data);
  }
}

export default new UserApi();
