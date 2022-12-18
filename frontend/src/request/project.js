import request from '@/HttpCommon.js'

class ProjectApi {

  createProject(data) {
    return request.post('/api/project/create', data)
  }

  getProjects(data) {
    return request.get('/api/project/list', data)
  }

  getEnvs() {
    return request.get('/api/project/env/list')
  }

  getProject(pid) {
    return request.get('/api/project/' + pid + '/')
  }

  updateProject(pid, data) {
    return request.put('/api/project/' + pid + '/', data)
  }

  syncCode(pid) {
    return request.get('/api/project/' + pid + '/sync_code')
  }

  syncCase(pid) {
    return request.get('/api/project/' + pid + '/sync_case')
  }

  syncResult(pid) {
    return request.get('/api/project/' + pid + '/sync_result')
  }

  syncMerge(pid, data) {
    return request.post('/api/project/' + pid + '/sync_merge', data)
  }

  getSyncLog() {
    return request.get('/api/project/sync_log')
  }

  deleteProject(pid) {
    return request.delete('/api/project/' + pid + '/')
  }

  syncProjectCase(pid) {
    return request.get('/api/project/' + pid + '/sync')
  }

  getProjectTree(pid) {
    return request.get('/api/project/' + pid + '/files')
  }

  getProjectCases(pid, file_name) {
    return request.get('/api/project/' + pid + '/cases', { file_name })
  }

  getProjectSubdirectory(pid, file_name) {
    return request.get('/api/project/' + pid + '/subdirectory', { file_name })
  }

}

export default new ProjectApi()
