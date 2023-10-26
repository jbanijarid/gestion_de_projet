import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

export async function findTasksInProject(projectId) {
    try {
        const tasks = await Task.find({ project: projectId });
        return tasks;
    } catch (err) {
        console.error('Error counting task:', err);
        return 0;
    }
}

export async function countTasksInProject(projectId) {
    try {
        const count = await Task.countDocuments({ project: projectId });
        return count;
    } catch (err) {
        console.error('Error finding task:', err);
        return [];
    }
}
