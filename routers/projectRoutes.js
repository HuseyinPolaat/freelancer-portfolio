const express = require('express')
const projectController = require('../controllers/projectControllers');

const router = express.Router();

router.route('/projects').post(projectController.createProject);
router.route('/projects/:id').put(projectController.updateProject);
router.route('/projects/:id').delete(projectController.deleteProject);


module.exports = router;    