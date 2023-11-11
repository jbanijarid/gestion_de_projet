import { Router } from 'express';
// import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import * as user from '../controllers/userController.js';
import * as project from '../controllers/projectController.js';
import * as task from "../controllers/taskController.js";
const router = Router();


router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

// ************************************************ USER : 
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users.
 *     responses:
 *       '200':
 *         description: Successful response with a list of users.
 *     tags:
 *       - Users
 */

router.route('/users').get(async (req, res) => {
    let response = await user.getAllUsers();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


router.route('/login').post(async (req, res) => {
    let response = await user.loginUser(req.body.username, req.body.password);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     description: Returns a single user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user with the specified ID.
 *       404:
 *         description: user not found.
 *     tags:
 *       - Users
 */
router.route('/users/:id').get(async (req, res) => {
    let response = await user.getUserById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Creates a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                  type : string
 *     responses:
 *       200:
 *         description: The new user.
 *       404:
 *         description: Error.
 *     tags:
 *       - Users
 */
router.route('/users').post(async (req, res) => {
    let response = await user.addUser(req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});



// ****************************************************** Project : 
 

/**
 * @openapi
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Get a list of all projects.
 *     responses:
 *       '200':
 *         description: Successful response with a list of projects.
 *     tags:
 *       - Projects
 */

router.route('/projects').get(async (req, res) => {
    let response = await project.getAllProjects();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID.
 *     description: Returns a single project by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to retrieve.
 *     responses:
 *       200:
 *         description: The project with the specified ID.
 *       404:
 *         description: project not found.
 *     tags:
 *       - Projects
 */
router.route('/projects/:id').get(async (req, res) => {
    let response = await project.getProjectById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Create a new project.
 *     description: Creates a new project with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               owner: 
 *                  type: string
 *               teamMembers:
 *                  type: string
 *     responses:
 *       200:
 *         description: The new project.
 *       404:
 *         description: Error.
 *     tags:
 *       - Projects
 */
router.route('/projects').post(async (req, res) => {
    let response = await project.addProject(req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});



// ****************************************************** TASKS : 
 

/**
 * @openapi
 * /tasks/{projectId}:
 *   get:
 *     summary: Get all tasks
 *     description: Get a list of all tasks.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The projectId of the project to get all it's tasks.
 *     responses:
 *       '200':
 *         description: Successful response with a list of tasks of a gevin project.
 *     tags:
 *       - Tasks
 */

router.route('/tasks/:projectId').get(async (req, res) => {
    let response = await task.getAllTasksInProject(req.params.projectId);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID.
 *     description: Returns a single task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: The task with the specified ID.
 *       404:
 *         description: task not found.
 *     tags:
 *       - Tasks
 */
router.route('/tasks/:id').get(async (req, res) => {
    let response = await task.getTaskById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task.
 *     description: Creates a new task with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               project: 
 *                  type: string
 *     responses:
 *       200:
 *         description: The new task.
 *       404:
 *         description: Error.
 *     tags:
 *       - Tasks
 */
router.route('/tasks').post(async (req, res) => {
    let response = await task.addTask(req.body);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});



export default router;