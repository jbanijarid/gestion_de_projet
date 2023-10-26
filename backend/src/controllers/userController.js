import  User from '../models/user.js';
import { countAllUsers,findAllUsers } from '../models/user.js';
// Controller to get a list of all users
export async function getAllUsers() {
  try {
    const total = await countAllUsers();
    const users = await findAllUsers();
    return {
      success: true,
      data: users,
      total: total.toString(),
    };
  } catch (err) {
    return { success: false, message: 'Users not found ' + err };
  }
}

// Controller to get a user by ID
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, data: user };

  } catch (error) {
    return { success: false, message: 'Error getting user: ' + err };
  }
};

// Controller to create a new user
export const addUser = async (body) => {
  try {
    const user = new User(body);
    const result = await user.save();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'User not added ' + err };
  }
};

