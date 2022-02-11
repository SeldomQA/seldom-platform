import request from '@/HttpCommon.js'

class ProjectApi {
  getProjects(data) {
    return request.get('/api/v1/projects/list', data)
  }

  getProject(pid) {
    return request.get('/api/v1/project/detail', { id: pid })
  }

  deleteProject(pid) {
    return request.post('/api/v1/project/delete', { id: pid })
  }

  createProject(data) {
    return request.post('/api/v1/project/create', data)
  }

  updateProject(data) {
    return request.put('/api/v1/project/update', data)
  }

  getProjectTree() {
    return request.get('/api/project/files/')
  }

  getProjectClass(file) {
    return request.get('/api/project/cases/', { file_name: file })
  }

}

export default new ProjectApi()
