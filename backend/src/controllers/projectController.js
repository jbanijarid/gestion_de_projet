import Project from '../models/project.js';
import {countAllDocuments,findAllProjects} from "../models/project.js";
// Controller to get a list of all projects
export const getAllProjects = async () => {
    try {
        const total = await countAllDocuments();
        const projects = await findAllProjects();
        return {
            success: true,
            data: projects,
            total: total.toString(),
        };
    } catch (err) {
        return { success: false, message: 'Projects not found ' + err };
    }
};

// Controller to get a project by ID
export const getProjectById = async (id) => {
    try {
        const project = await Project.findById(id);
        if (!project) {
            return { success: false, message: 'Project not found' };
        }
        return { success: true, data: project};
    } catch (error) {
        return { success: false, message: 'Error getting Project' + error };
    }
};


// Controller to create a new project
export const addProject = async (body) => {
    try {
        const project = new Project(body);
        const result = await project.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'Project not added ' + error };
    }
};