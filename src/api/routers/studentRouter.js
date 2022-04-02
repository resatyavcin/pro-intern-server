const express = require('express');
const router = express.Router();

const {
  createStudent,
  findAllStudents,
  findByIdStudent,
  updateStudent,
  deleteStudent,
  deleteSelectedStudents
} = require('../controllers/studentController');

router.post('/create', createStudent);
router.get('/find-all', findAllStudents);
router.get('/find/:id', findByIdStudent);
router.patch('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);
router.delete('/delete-selected', deleteSelectedStudents);

module.exports = router;
