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


export async function countAllDocuments() {
    try {
        const count = await Project.countDocuments();
        return count;
    } catch (err) {
        console.error('Error counting documents:', err);
        return 0;
    }
}

export async function findAllProjects() {
    try {
        const projects = await Project.find();
        return projects;
    } catch (err) {
        console.error('Error finding Projects:', err);
        return [];
    }
}
