import request from '@/HttpCommon.js'

class CaseApi {

  runningCase(case_id, data) {
    return request.post('/api/case/' + case_id + '/running', data)
  }

  getCaseResult(case_id) {
    return request.get('/api/case/' + case_id + '/result')
  }

}

export default new CaseApi()
