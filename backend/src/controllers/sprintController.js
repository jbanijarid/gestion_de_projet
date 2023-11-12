import { createSprint, getSprintById, getAllSprints } from '../models/sprint.js';

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

export const getAllSprintsHandler = async (req, res) => {
  try {
    const response = await getAllSprints();
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

