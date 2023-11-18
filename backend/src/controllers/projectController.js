import { countAllProjects, findAllProjects, createProject, getProjectById } from "../models/project.js";
import {
    getUserByUsername
  } from '../models/user.js';
export const addProject = async (req, res) => {
    try {
        const response = await createProject(req.body);
        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getProject = async (req, res) => {
    try {
        const response = await getProjectById(req.params.id);
        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Controller to get a list of all projects
export const getAllProjects = async (req, res) => {
    try {
        const total = await countAllProjects();
        const project = await findAllProjects();
        res.status(total.success && project.success ? 200 : 404).json({ total: total.data, data: project.data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const getAllProjectsByUsername = async (req, res) => {
    try {
        const projects = await findAllProjects();
        const val = [];
        const user = await getUserByUsername(req.params.username);
        projects.data.forEach(pro => {
            if (pro.teamMembers.find(member => member.toString() === user.data._id.toString())){
                val.push(pro);
            }
        });
        
        res.status(projects.success ? 200 : 404).json({ success: projects.success, data: val });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};