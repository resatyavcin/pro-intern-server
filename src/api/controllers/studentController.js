const User = require('../models/User');

const createStudent = async (req, res) => {
  res.status(201).send('OK');
};
const findByIdStudent = async (req, res) => {
  res.status(200).send('OK');
};
const findAllStudents = async (req, res) => {
  res.status(200).send('OK');
};
const updateStudent = async (req, res) => {
  res.status(200).send('OK');
};
const deleteStudent = async (req, res) => {
  res.status(200).send('OK');
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
