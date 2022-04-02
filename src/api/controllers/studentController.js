const User = require('../models/User');

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
const findByIdStudent = async (req, res) => {
  const id = req.params.id;

  try {
    const student = User.findOne({ id });

    res.status(200).send(student);
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};
const findAllStudents = async (req, res) => {
  try {
    const students = User.find({});

    res.status(200).send(students);
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};
const updateStudent = async (req, res) => {
  res.status(200).send('OK');
};
const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
    User.findOneAndDelete({ id });

    res.status(200).send('Success deleted');
  } catch (err) {
    res.sattus(500).send('FAILED');
  }
};
const deleteSelectedStudents = (req, res) => {
  res.status(200).send('OK');
};

module.exports = {
  createStudent,
  findByIdStudent,
  findAllStudents,
  updateStudent,
  deleteStudent,
  deleteSelectedStudents
};
