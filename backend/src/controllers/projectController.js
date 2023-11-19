import { countAllProjects, findAllProjects, createProject, getProjectById } from "../models/project.js";

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

export const getAllProjectsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projects = await findAllProjects(); 
        const filteredProjects = projects.data.filter(
            (project) => project.owner.toString() === userId || project.teamMembers.includes(userId)
        );
        res.status(projects.success ? 200 : 404).json({ success:projects.success, data: filteredProjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
