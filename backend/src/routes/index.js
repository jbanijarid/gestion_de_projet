import { Router } from 'express';
// import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import * as userController from '../controllers/userController.js';
import * as projectController from '../controllers/projectController.js';
import * as taskController from "../controllers/taskController.js";
import * as sprintController from '../controllers/sprintController.js';
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
router.route('/users').get(userController.getAllUsers);

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
router.route('/users/:id').get(userController.getUser);

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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                  type : string
 *     responses:
 *       200:
 *         description: The new user.
 *       404:
 *         description: Error 
 *     tags:
 *       - Users
 */
router.route('/users').post(userController.addUser);

router.route('/users/login').post(userController.loginUser);

// ****************************************************** Project : 
router.route('/projectsUser/:username').get(projectController.getAllProjectsByUsername);
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
router.route('/projects').get(projectController.getAllProjects);

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
router.route('/projects/:id').get(projectController.getProject);

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
 *                 type: string
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The new project.
 *       404:
 *         description: Error.
 *     tags:
 *       - Projects
 */
router.route('/projects').post(projectController.addProject);

// ****************************************************** TASKS : 

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Get a list of all tasks.
 *     responses:
 *       '200':
 *         description: Successful response with a list of tasks.
 *     tags:
 *       - Tasks
 */
router.route('/tasks').get(taskController.getAllTasks);

/**
 * @openapi
 * /tasks/project/{projectId}:
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
router.route('/tasks/project/:projectId').get(taskController.getAllTasksByProject);

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
router.route('/tasks/:id').get(taskController.getTask);

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
 *               state:
 *                  type: string
 *     responses:
 *       200:
 *         description: The new task.
 *       404:
 *         description: Error.
 *     tags:
 *       - Tasks
 */
router.route('/tasks').post(taskController.addTask);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: delete a task by ID.
 *     description: none
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Error deleting task
 *     tags:
 *       - Tasks
 */
router.route('/tasks/:id').delete(taskController.removeTask);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID.
 *     description: Updates a task with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               state:
 *                  type: string
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: taskID
 *                 name: updatedName
 *                 description: updatedDescription
 *                 state: updatedState
 *               message: Task updated successfully.
 *       404:
 *         description: Task not found or error updating task.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Task not found or error updating task.
 *     tags:
 *       - Tasks
 */
router.route('/tasks/:id').put(taskController.modifyTask);

// ****************************************************** SPRINTS : 

/**
 * @openapi
 * /sprints:
 *   get:
 *     summary: Get all sprints
 *     description: Get a list of all sprints.
 *     responses:
 *       200:
 *         description: Successful response with a list of sprints.
 *       404:
 *         description: sprints not found.
 *     tags:
 *       - Sprints
 */
router.route('/sprints').get(sprintController.getAllSprints);

/**
 * @openapi
 * /sprints:
 *   post:
 *     summary: Create a new sprint.
 *     description: Creates a new sprint with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               project:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date  
 *               end_date:
 *                 type: string
 *                 format: date 
 *               tasks:
 *                  type: array
 *                  items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The new sprint.
 *       404:
 *         description: Error.
 *     tags:
 *       - Sprints
 */
router.route('/sprints').post(sprintController.addSprint);

/**
 * @openapi
 * /sprints/{id}:
 *   get:
 *     summary: Get a sprint by ID.
 *     description: Returns a single sprint by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the sprint to retrieve.
 *     responses:
 *       200:
 *         description: The sprint with the specified ID.
 *       404:
 *         description: sprint not found.
 *     tags:
 *       - Sprints
 */
router.route('/sprints/:id').get(sprintController.getSprint);

/**
 * @openapi
 * /sprints/project/{projectId}:
 *   get:
 *     summary: Get all sprints
 *     description: Get a list of all sprints.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The projectId of the project to get all it's sprints.
 *     responses:
 *       '200':
 *         description: Successful response with a list of sprints of a gevin project.
 *     tags:
 *       - Sprints
 */
router.route('/sprints/project/:projectId').get(sprintController.getAllSprintsByProject);

/**
 * @openapi
 * /sprints/{id}/tasks:
 *   get:
 *     summary: Get the tasks of a specific sprint by ID.
 *     description: Returns the tasks of a sprint by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the sprint to retrieve.
 *     responses:
 *       200:
 *         description: The sprint with the specified ID.
 *       404:
 *         description: sprint not found.
 *     tags:
 *       - Sprints
 */
router.route('/sprints/:id/tasks').get(sprintController.getTasksBySprint);

/**
 * @openapi
 * /sprints/{id}:
 *   put:
 *     summary: Update a sprint by ID.
 *     description: Updates a sprint with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the sprint to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_date:
 *                  type: string
 *                  format: date
 *               end_date:
 *                  type: string
 *                  format: date
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Sprint updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: sprintID
 *                 name: updatedName
 *                 project: updatedProjectID
 *                 start_date: updatedStartDate
 *                 end_date: updatedEndDate
 *                 tasks: [updatedTaskID1, updatedTaskID2]
 *               message: Sprint updated successfully.
 *       404:
 *         description: Sprint not found or error updating sprint.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Sprint not found or error updating sprint.
 *     tags:
 *       - Sprints
 */
router.route('/sprints/:id').put(sprintController.modifySprint);

export default router;