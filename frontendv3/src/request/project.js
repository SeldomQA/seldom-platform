import request from './HttpCommon.js'

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
  
  // 后续有具体删除需求备用
  // removeProjectCover(pid) {
  //   return request.put('/api/project/cover/remove/' + pid + '/')
  // }

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
