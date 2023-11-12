import { countAllUsers, findAllUsers ,createUser,getUserById} from '../models/user.js';


export const addUser = async (req,res)=>{
  try {
    const response = await createUser(req.body);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getUser = async (req,res)=>{
  try {
    const response = await getUserById(req.params.id);
    res.status(response.success ? 200 : 404).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Controller to get a list of all users
export const getAllUsers = async (req, res) => {
  try {
    const total = await countAllUsers();
    const users = await findAllUsers();
    res.status(response.success ? 200 : 404).json({total: total,data:users});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}