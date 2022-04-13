const express = require('express');
const router = express.Router();

const {
  createStudent,
  fetchAllStudents,
  fetchStudent,
  updateStudent,
  deleteStudentPermanently,
  moveToTrash
} = require('../controllers/studentController');

router.post('/create', createStudent);
router.get('/find-all', fetchAllStudents);
router.get('/find/:id', fetchStudent);
router.patch('/update/:id', updateStudent);
router.delete('/delete-permanently', deleteStudentPermanently);
router.delete('/move-trash', moveToTrash);

module.exports = router;
