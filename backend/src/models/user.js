
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, enum: ['manager', 'team member'], default: 'team member' },
});

const User = mongoose.model('User', userSchema);

export default User;

export async function countAllUsers() {
    try {
        const count = await User.countDocuments();
        return count;
    } catch (err) {
        console.error('Error counting users:', err);
        return 0;
    }
}

export async function findAllUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.error('Error finding users:', err);
        return [];
    }
}

// Controller to get a user by Username
export async function getUserByUsername (username) {
    try {
        const user = await User.findOne({ username: username });      
        if (!user) {
            return { success: false, message: 'User not found' };
        }
      return { success: true, data: user };
  
    } catch (error) {
      return { success: false, message: 'Error getting user: ' + error };
    }
  };


