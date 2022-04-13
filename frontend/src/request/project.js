import request from '@/HttpCommon.js'

class ProjectApi {

  createProject(data) {
    return request.post('/api/project/create', data)
  }

  getProjects(data) {
    return request.get('/api/project/list', data)
  }

  getProject(pid) {
    return request.get('/api/project/' + pid + '/')
  }

  updateProject(pid, data) {
    return request.put('/api/project/' + pid + '/', data)
  }

  deleteProject(pid) {
    return request.delete('/api/project/' + pid + '/')
  }

  getProjectTree(pid) {
    return request.get('/api/project/' + pid + '/files/')
  }

  getProjectClass(pid, file) {
    return request.get('/api/project/' + pid + '/cases/', { file_name: file })
  }

}

export default new ProjectApi()
