import {
  createTask,
  getTaskById,
  findTasksByProject,
  countTasksByProject,
  findAllTasks,
  countAllTasks,
  deleteTask,
  updateTask,
  addMember
} from "../models/task.js";

// Controller to create a new task within a project
export const addTask = async (req, res) => {
  try {
    const response = await createTask(req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getTask = async (req, res) => {
  try {
    const response = await getTaskById(req.params.id);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await findAllTasks();
    const total = await countAllTasks();
    res.status(total.success && tasks.success ? 200 : 404).json({ total: total.data, data: tasks.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getAllTasksByProject = async (req, res) => {
  try {
    const tasks = await findTasksByProject(req.params.projectId);
    const total = await countTasksByProject(req.params.projectId);
    res.status(total.success && tasks.success ? 200 : 404).json({ total: total.data, data: tasks.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const removeTask = async (req, res) => {
  try {
    const response = await deleteTask(req.params.id);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const modifyTask = async (req, res) => {
  try {
    const response = await updateTask(req.params.id, req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


export const addMemberToTask = async (req, res) => {
  try {
      const taskId = req.params.taskId;
      const memberId = req.body.memberId; // Assuming memberId is provided in the request body
      const response = await addMember(taskId, memberId);
      res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};