import axios from 'axios';

const instance = axios.create({
  baseURL: "/api", 
  timeout: 15000,
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, params) => instance.get(url, { params }).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  put:(url,body)=> instance.put(url,body).then(responseBody),
  delete:(url)=>{instance.delete(url).then(responseBody)}
};

export const api = {
  getAllUsers: () => requests.get('users', {}),
  getUserById: (id) => requests.get(`users/${id}`),
  addUSer: (body) => requests.post('users', body),
  login: (body) => requests.post('users/login',body),
  getAllProjects: () => requests.get('projects', {}),
  getProjectById: (id) => requests.get(`projects/${id}`),
  addProject: (body) => requests.post('projects', body),
  getAllTasksByProjectId: (id) => requests.get(`tasks/${id}`),
  getAllProjectsByUserId : (id) => requests.get(`/projects/user/${id}`),
  getTaskById: (id) => requests.get(`tasks/${id}`),
  addTask: (body) => requests.post('tasks', body),
  getTasks: () => requests.get(`tasks`,{}),
  updateTask:(id,body)=>requests.put(`tasks/${id}`,body),
  deleteTask:(id)=> requests.delete(`tasks/${id}`),
};



