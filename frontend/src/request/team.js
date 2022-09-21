import request from '@/HttpCommon.js'

class TeamApi {

  createTeam(data) {
    return request.post('/api/team/create', data)
  }

  getTeamAll(data) {
    return request.get('/api/team/list', data)
  }

  getTeamDetails(tid) {
    return request.get('/api/team/' + tid + '/')
  }

  updateTeam(tid, data) {
    return request.put('/api/team/' + tid + '/', data)
  }

  deleteTeam(tid) {
    return request.delete('/api/team/' + tid + '/')
  }

}

export default new TeamApi()
