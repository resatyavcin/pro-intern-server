//import Models
const User = require('../models/User');

/* ----------------------------------------------------------- */
//ENDPOINTS
/* ----------------------------------------------------------- */

//Endpoints to be made by the admin
//Create new student
//PROCESSING
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
//PROCESSING
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
//OK
const fetchAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'STUDENT' });

    res.status(200).send(students);
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Purpose not set
//PROCESSING
const updateStudent = async (req, res) => {
  res.status(200).send('OK');
};

//Endpoints to be made by the admin
//OK
const deleteStudentPermanently = async (req, res) => {
  const { selectedStudents } = req.body;

  let deleted = [];
  let rejectDeleted = [];

  try {
    for (let i = 0; i < selectedStudents.length; i++) {
      const nextStudent = await User.findOne({ _id: selectedStudents[i] });

      if (nextStudent.isTrash) {
        await User.findOneAndDelete({ _id: selectedStudents[i] });
        deleted.push(nextStudent);
      } else {
        rejectDeleted.push(nextStudent);
      }
    }

    return res.status(200).send({
      deleted,
      rejectDeleted
    });
  } catch (err) {
    return res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//OK
const moveToTrash = async (req, res) => {
  const { selectedStudents } = req.body;

  let deleted = [];
  let rejectDeleted = [];

  try {
    for (let i = 0; i < selectedStudents.length; i++) {
      console.log(selectedStudents[i]);

      const nextStudent = await User.findOne({ _id: selectedStudents[i] });

      console.log(nextStudent);
      if (!nextStudent.isTrash) {
        nextStudent.isTrash = true;
        nextStudent.save();
        deleted.push(nextStudent);
      } else {
        rejectDeleted.push(nextStudent);
      }
    }

    return res.status(200).send({
      deleted,
      rejectDeleted
    });
  } catch (err) {
    return res.status(500).send('FAILED');
  }
};

module.exports = {
  createStudent,
  fetchStudent,
  fetchAllStudents,
  updateStudent,
  deleteStudentPermanently,
  moveToTrash
};
