import { createSprint, getSprintById, findAllSprints } from '../models/sprint.js';

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
    //TODO : add cunter sprints
    const response = await findAllSprints();
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

