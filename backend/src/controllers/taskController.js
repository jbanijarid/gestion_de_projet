import { createTask, getTaskById, findTasksByProject, countTasksByProject } from "../models/task.js";

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

export const getAllTasksByProject = async (req, res) => {
  try {
    const tasks = await findTasksByProject(projectId);
    const total = await countTasksByProject(projectId);
    res.status(total.success && tasks.success ? 200 : 404).json({ total: total.data, data: tasks.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};