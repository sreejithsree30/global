const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;
