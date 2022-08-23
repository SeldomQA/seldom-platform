import request from '@/HttpCommon.js'

class TaskApi {

  createTask(data) {
    return request.post('/api/task/create', data)
  }

  getTaskAll(data) {
    return request.get('/api/task/list', data)
  }

  getTaskDetails(tid) {
    return request.get('/api/task/' + tid + '/')
  }

  updateTask(tid, data) {
    return request.put('/api/task/' + tid + '/', data)
  }

  deleteTask(tid) {
    return request.delete('/api/task/' + tid + '/')
  }

  runningTask(tid) {
    return request.post('/api/task/' + tid + '/running')
  }

  addTimed(tid, data) {
    return request.post('/api/task/' + tid + '/timed', data)
  }

  deleteTimed(tid) {
    return request.delete('/api/task/' + tid + '/timed')
  }

}

export default new TaskApi()
