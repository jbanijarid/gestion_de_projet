import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    state: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

export const createTask = async (body) => {
    try {
        const task = new Task(body);
        const result = await task.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'Task not added ' + err };
    }
};

// Controller to get a task by ID
export const getTaskById = async (id) => {
    try {
      const task = await Task.findById(id);
      if (!task) {
        return { success: false, message: 'Task not found' };
      }
      return { success: true, data: task };
    } catch (error) {
      return { success: false, message: 'Error getting task: ' + err };
    }
  };


export const countTasksByProject = async (projectId) => {
    try {
        const count = await Task.countDocuments({ project: projectId });
        if (!count) {
            return { success: false, message: "can't count Tasks in " + projectId};
        }
        return { success: true, data: count };
    } catch (error) {
        return { success: false, message: 'Error counting documents' + error };
    }
}

export const findTasksByProject = async (projectId) => {
    try {
        const tasks = await Task.find({ project: projectId });
        if (!tasks) {
            return { success: false, message: 'tasks not found' };
        }
        return { success: true, data: tasks };
    } catch (error) {
        return { success: false, message: 'Error finding tasks:' + error };
    }
}