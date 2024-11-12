import request from "./common/http";
import { TNomalObject } from "./common/http";

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
