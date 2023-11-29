import mongoose from 'mongoose';
import Sprint from './sprint.js';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    state: { type: String,  enum: ['todo', 'progress','done'], default: 'todo'  },
    distributeTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

export const createTask = async (body) => {
    try {
        const task = new Task(body);
        const result = await task.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'Task not added ' + error };
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
        return { success: false, message: 'Error getting task: ' + error };
    }
};


export const countTasksByProject = async (projectId) => {
    try {
        const count = await Task.countDocuments({ project: projectId });
        if (!count) {
            return { success: false, message: "can't count Tasks in " + projectId };
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

export const countAllTasks = async () => {
    try {
        const count = await Task.countDocuments();
        if (!count) {
            return { success: false, message: "can't count Tasks" };
        }
        return { success: true, data: count };
    } catch (error) {
        return { success: false, message: 'Error counting documents' + error };
    }
}

export const findAllTasks = async () => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            return { success: false, message: 'tasks not found' };
        }
        return { success: true, data: tasks };
    } catch (error) {
        return { success: false, message: 'Error finding tasks:' + error };
    }
}


export const deleteTask = async (taskId) => {
    try {
        const task = await Task.findByIdAndRemove(taskId);
        if (!task) {
            return { success: false, message: 'Task not found to be deleted' };
        }
        return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Error deleting task: ' + error };
    }
}


export const updateTask = async (taskId, newData) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, newData, { new: true });
        return { success: true, data: task, message: 'Task updated successfully' };
    } catch (error) {
        return { success: false, message: 'Error updating task: ' + error };
    }
}


export const addMember = async (taskId, memberId) => {
    try {
        const project = await Task.findOne({ _id: taskId, distributeTo: memberId });
        if (project) {
            return { success: false, message: 'User is already in this task ' };
        }
        const updatedProject = await Task.findByIdAndUpdate(
            taskId,
            { $push: { distributeTo: memberId } },
            { new: true }
        );
        return { success: true, data: updatedProject, message: 'Member added to the task successfully' };
    } catch (error) {
        return { success: false, message: 'Error adding member to the task: ' + error };
    }
}