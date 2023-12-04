import {
    createNote,
    findNotesByProjectId,
    addNoteToProjectById
} from "../models/note.js"



export const addNote = async (req, res) => {
    try {
        const response = await createNote(req.body);
        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getNotesByProject = async (req, res) => {
    try {
        const values = await findNotesByProjectId(req.params.projectId);
        res.status(values.success ? 200 : 404).json(values);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



export const addNoteToProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const value = req.body.value; // Assuming memberId is provided in the request body
        const response = await addNoteToProjectById(projectId, value);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};