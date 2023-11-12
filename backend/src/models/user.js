
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'team member'], default: 'team member' },
});

const User = mongoose.model('User', userSchema);

export default User;

// to create a new user
export const createUser = async (body) => {
    try {
        const user = new User(body);
        const result = await user.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'User not added ' + error };
    }
};

// To get a user by ID
export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, data: user };

    } catch (error) {
        return { success: false, message: 'Error getting user: ' + error };
    }
};

export const countAllUsers = async () => {
    try {
        const count = await User.countDocuments();
        return count;
    } catch (err) {
        console.error('Error counting users:', err);
        return 0;
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.error('Error finding users:', err);
        return [];
    }
}


