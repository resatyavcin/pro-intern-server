//import Models
const User = require('../models/User');

/* ----------------------------------------------------------- */
//ENDPOINTS
/* ----------------------------------------------------------- */

//Endpoints to be made by the admin
//Create new student
const createStudent = async (req, res) => {
  const body = req.body;

  try {
    const student = new User({ ...body });

    student.save();

    res.status(201).send('OK');
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Returns student information by id
const fetchStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const student = User.findOne({ id });

    res.status(200).send(student);
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Returns all students information
const fetchAllStudents = async (req, res) => {
  try {
    const students = User.find({});

    res.status(200).send(students);
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Purpose not set
const updateStudent = async (req, res) => {
  res.status(200).send('OK');
};

//Endpoints to be made by the admin
const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    User.findOneAndDelete({ id });

    res.status(200).send('Success deleted');
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Purpose not set
const deleteSelectedStudents = (req, res) => {
  res.status(200).send('OK');
};

module.exports = {
  createStudent,
  fetchStudent,
  fetchAllStudents,
  updateStudent,
  deleteStudent,
  deleteSelectedStudents
};
