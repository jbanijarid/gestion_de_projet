import Task from '../models/task.js';
import {findTasksInProject ,countTasksInProject } from "../models/task.js";

export async function getAllTasksInProject(projectId) {
  try {
    const tasks = await findTasksInProject(projectId);
    const taskCount = await countTasksInProject(projectId);

    return {
      success: true,
      data: tasks,
      totalTasks: taskCount.toString(),
    };
  } catch (err) {
    return { success: false, message: 'Failed to fetch tasks in the project ' + err };
  }
}

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

// Controller to create a new task within a project
export const addTask = async (body) => {
  try {
    const task = new Task(body);
    const result = await task.save();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'Task not added ' + err };
  }
};