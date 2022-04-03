const express = require('express');
const router = express.Router();

const {
  createStudent,
  fetchAllStudents,
  fetchStudent,
  updateStudent,
  deleteStudent,
  deleteSelectedStudents
} = require('../controllers/studentController');

router.post('/create', createStudent);
router.get('/find-all', fetchAllStudents);
router.get('/find/:id', fetchStudent);
router.patch('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);
router.delete('/delete-selected', deleteSelectedStudents);

module.exports = router;
