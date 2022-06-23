import request from './HttpCommon.js'

class CaseApi {

  runningCase(case_id) {
    return request.post('/api/case/' + case_id + '/running')
  }

}

export default new CaseApi()
