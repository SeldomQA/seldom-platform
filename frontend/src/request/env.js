import request from '@/HttpCommon.js'

class EnvApi {
  CreateEnv(data) {
    return request.post('/api/project/env', data)
  }
  GetEnvDetail(eid) {
    return request.get('/api/project/env/' + eid + '/')
  }
  DeleteEnv(eid) {
    return request.delete('/api/project/env/' + eid + '/')
  }
  UpdateEnv(eid, data) {
    return request.put('/api/project/env/' + eid + '/', data)
  }
  GetEnvList() {
    return request.get('/api/project/env/list')
  }
}

export default new EnvApi()
