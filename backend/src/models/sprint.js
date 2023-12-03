import mongoose from 'mongoose';
import Task from './task.js';

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

export const addTaskToSprint = async (sprintId, taskId) => {
    try {
      const sprint = await Sprint.findById(sprintId).populate('tasks');
      console.log(sprint);
      sprint.tasks.push(taskId);
      const updatedSprint = await sprint.save();
      return { success: true, data: updatedSprint, message: 'Task added successfully'};
    } catch (error) {
      return { success: false, message: 'Error adding task: ' + error };
    }


}

export const removeTaskFromSprint = async (sprintId, taskId) => {
  try {
    const sprint = await Sprint.findById(sprintId);
    const existingTaskIds = sprint.tasks.map(task => task.toString());
    const newTaskList = existingTaskIds.filter(task => task !== taskId);
    sprint.tasks = newTaskList;
    const updatedSprint = await sprint.save();
    return { success: true, data: updatedSprint, message: 'Task removed successfully'};
  } catch (error) {
    return { success: false, message: 'Error removing task: ' + error};
  }
}

export const updateSprint = async (sprintId, newData)=> {
  try {
    const sprint = await Sprint.findById(sprintId).populate('tasks');

    // If tasks are provided in the request, add them to the existing tasks
    if (newData.tasks && newData.tasks.length > 0) {
      const existingTaskIds = sprint.tasks.map(task => task.toString());
      const newTaskIds = newData.tasks.map(task => task.toString());

      // Add only the tasks that are not already in the sprint
      const tasksToAdd = newTaskIds.filter(taskId => !existingTaskIds.includes(taskId));
      sprint.tasks = sprint.tasks.concat(tasksToAdd);

    }

    // Update other properties if needed
    if (newData.name) sprint.name = newData.name;

    // Save the updated sprint
    const updatedSprint = await sprint.save();
    return { success: true, data: updatedSprint, message: 'Sprint updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error updating sprint: ' + error };
  }
}