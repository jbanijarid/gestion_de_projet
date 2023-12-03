import axios from 'axios';

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: (url) => { instance.delete(url).then(responseBody) }
};

export const api = {
  getAllUsers: () => requests.get('users', {}),
  getUserById: (id) => requests.get(`users/${id}`),
  addUSer: (body) => requests.post('users', body),
  login: (body) => requests.post('users/login', body),
  getUserByName: (name) => requests.get(`users/name/${name}`),
  getAllProjects: () => requests.get('projects', {}),
  getProjectById: (id) => requests.get(`projects/${id}`),
  // getProjectOwner: (id,body) => requests.get(`projects/${id}/owner`,body),
  addProject: (body) => requests.post('projects', body),
  getAllTasksByProjectId: (id) => requests.get(`tasks/project/${id}`),
  getAllProjectsByUserId: (id) => requests.get(`/projects/user/${id}`),
  addProjectMember: (id, body) => requests.put(`/projects/${id}/members`, body),
  removeProjectMember: (projectId, memberId) => requests.delete(`/projects/${projectId}/members/${memberId}`),
  getTaskById: (id) => requests.get(`tasks/${id}`),
  addTask: (body) => requests.post('tasks', body),
  getTasks: () => requests.get(`tasks`, {}),
  updateTask: (id, body) => requests.put(`tasks/${id}`, body),
  distributeTaskTo: (id, body) => requests.put(`tasks/${id}/members`, body),
  deleteTask: (id) => requests.delete(`tasks/${id}`),
  getAllSprints:() => requests.get('sprints', {}),
  getAllSprintsByProject:(id) => requests.get(`sprints/project/${id}`),
  getSprintById:(id) => requests.get(`sprints/${id}`),
  addSprint: (body) => requests.post('sprints', body),
  getTasksBySprintId: (id) => requests.get(`sprints/${id}/tasks`),
  updateSprint: (id, body) => requests.put(`sprints/${id}`, body),
  addTaskToSprint: (id, taskId) => requests.put(`sprints/${id}/tasks/${taskId}`),
  removeTaskFromSprint: (id, taskId) => requests.put(`sprints/${id}/tasks/remove/${taskId}`)
};