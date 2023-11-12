import mongoose from 'mongoose';

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

export const findAllSprints = async () => {
  try {
    const sprints = await Sprint.find().populate('tasks');
    return { success: true, data: sprints };
  } catch (error) {
    return { success: false, message: 'Sprints not found ' + error };
  }
}
