import mongoose from 'mongoose';
import Task from './task.js';  // Adjust the path based on your project structure
const sprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Sprint = mongoose.model('Sprint', sprintSchema);

export default Sprint;

export const createSprint = async (data) => {
  try {
    const sprint = new Sprint(data);
    const result = await sprint.save();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'Sprint not created ' + error };
  }
}

export const getSprintById = async (id) => {
  try {
    const sprint = await Sprint.findById(id).populate('tasks');
    if (!sprint) {
      return { success: false, message: 'Sprint not found' };
    }
    return { success: true, data: sprint };
  } catch (error) {
    return { success: false, message: 'Error getting sprint: ' + error };
  }
}

export const countSprintsByProject = async (projectId) => {
  try {
    const count = await Sprint.countDocuments({ project: projectId });
    if (!count) {
      return { success: false, message: "can't count Sprints in " + projectId };
    }
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: 'Error counting documents' + error };
  }
}

export const findSprintsByProject = async (projectId) => {
  try {
    const sprints = await Sprint.find({ project: projectId }).populate('tasks');
    if (!sprints) {
      return { success: false, message: 'sprints not found' };
    }
    return { success: true, data: sprints };
  } catch (error) {
    return { success: false, message: 'Error finding sprints:' + error };
  }
}

export const countAllSprints = async () => {
  try {
    const count = await Sprint.countDocuments();
    if (!count) {
      return { success: false, message: "can't count Sprint" };
    }
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: 'Error counting documents' + error };
  }
}

export const findAllSprints = async () => {
  try {
    const sprints = await Sprint.find().populate('tasks');
    return { success: true, data: sprints };
  } catch (error) {
    return { success: false, message: 'Sprints not found ' + error };
  }
}

export const findTasksBySprint = async (sprintId) => {
  try {
    const sprint = await Sprint.findById(sprintId).populate('tasks');
    if (!sprint) {
      return { success: false, message: 'Sprint not found' };
    }
    return { success: true, data: sprint.tasks };
  } catch (error) {
    return { success: false, message: 'Error getting tasks for sprint: ' + error };
  }
}

export const countTasksBySprint = async (sprintId) => {
  try {
    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return { success: false, message: 'Sprint not found' };
    }
    const taskCount = await Task.countDocuments({ _id: { $in: sprint.tasks } });
    return { success: true, data: taskCount };
  } catch (error) {
    return { success: false, message: 'Error getting task count for sprint: ' + error };
  }
}

