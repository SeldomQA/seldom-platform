import request from '../HttpCommon.js';

class UserApi {
  login(data) {
    return request.post('/api/user/login', data);
  }

  logout(data) {
    return request.delete('/api/user/login/', data);
  }

  register(data) {
    return request.post('/api/user/register', data);
  }
}

export default new UserApi();
