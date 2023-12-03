import {
  createSprint,
  getSprintById,
  countAllSprints,
  findAllSprints,
  findSprintsByProject,
  findTasksBySprint,
  countTasksBySprint,
  countSprintsByProject,
  updateSprint,
  addTaskToSprint,
  removeTaskFromSprint
} from '../models/sprint.js';

export const addSprint = async (req, res) => {
  try {
    const response = await createSprint(req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const getSprint = async (req, res) => {
  try {
    const response = await getSprintById(req.params.id);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const getAllSprints = async (req, res) => {
  try {
    const sprints = await findAllSprints();
    const total = await countAllSprints();
    res.status(total.success && sprints.success ? 200 : 404).json({ total: total.data, data: sprints.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const getAllSprintsByProject = async (req, res) => {
  try {
    const sprints = await findSprintsByProject(req.params.projectId);
    const total = await countSprintsByProject(req.params.projectId);
    res.status(total.success && sprints.success ? 200 : 404).json({ total: total.data, data: sprints.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getTasksBySprint = async (req, res) => {
  try {
    const tasks = await findTasksBySprint(req.params.id);
    const total = await countTasksBySprint(req.params.id);
    res.status(total.success && tasks.success ? 200 : 404).json({ total: total.data, data: tasks.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export const addTask = async (req, res) => {
  try {
    const response = await addTaskToSprint(req.params.id, req.params.taskId);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
}

export const removeTask = async (req, res) => {
  try {
    const response = await removeTaskFromSprint(req.params.id, req.params.taskId);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
}

export const modifySprint = async (req, res) => {
  try {
    const response = await updateSprint(req.params.id, req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}