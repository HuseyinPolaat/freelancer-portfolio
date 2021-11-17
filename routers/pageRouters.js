const express = require('express');
const pageController = require('../controllers/pageControllers');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/add').get(pageController.getAddPage);
router.route('/projects/edit/:id').get(pageController.getEditPage);
router.route('/').post(pageController.sendEmail)

module.exports = router;