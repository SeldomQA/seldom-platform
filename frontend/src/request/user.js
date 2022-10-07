import request from '../HttpCommon.js';

class UserApi {
  login(data) {
    return request.post('/api/user/login', data);
  }

  logout(data) {
    return request.post('/api/user/logout', data);
  }

  register(data) {
    return request.post('/api/user/register', data);
  }
}

export default new UserApi();
