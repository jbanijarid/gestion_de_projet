import axios from 'axios';

const instance = axios.create({
  baseURL: "/api", 
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
};

export const api = {
  getAllUsers: () => requests.get('users', {}),
  getUserById: (id) => requests.get(`users/${id}`),
  addUSer: (body) => requests.post('users', body),
  login: (body) => requests.post('login',body),
  getAllProjects: () => requests.get('projects', {}),
  getProjectById: (id) => requests.get(`projects/${id}`),
  addProject: (body) => requests.post('projects', body),
  getAllTasksByProjectId: (id) => requests.get(`tasks/${id}`),
  getTaskById: (id) => requests.get(`tasks/${id}`),
  addTask: (body) => requests.post('tasks', body)
};



