// models/project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of team members
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

// to create a new project
export const createProject = async (body) => {
    try {
        const project = new Project(body);
        const result = await project.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'Project not created ' + error };
    }
};

// Controller to get a project by ID
export const getProjectById = async (id) => {
    try {
        const project = await Project.findById(id);
        if (!project) {
            return { success: false, message: 'Project not found' };
        }
        return { success: true, data: project };
    } catch (error) {
        return { success: false, message: 'Error getting Project' + error };
    }
};

export const countAllProjects = async () => {
    try {
        const count = await Project.countDocuments();
        if (!count) {
            return { success: false, message: "can't count Projects" };
        }
        return { success: true, data: count };
    } catch (error) {
        return { success: false, message: 'Error counting documents' + error };
    }
}

export const findAllProjects = async () => {
    try {
        const projects = await Project.find();
        if (!projects) {
            return { success: false, message: 'projects not found' };
        }
        return { success: true, data: projects };
    } catch (error) {
        return { success: false, message: 'Error finding Projects:' + error };
    }
}
