const Intern = require('../models/Intern');
const User = require('../models/User');

//Endpoints to be made by the student
const internshipApplication = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const intern = new Intern({
      startDate,
      endDate,
      student: req.user._id
    });

    const student = await User.findOne({ _id: req.user._id });

    if (!student.remainingIntern === 0) {
      return res.status(500).send('RESPONSE.FULL_LIMIT_INTERN');
    }

    const dataApplicationIntern = await Intern.create(intern);

    await User.findByIdAndUpdate(
      { _id: req.user._id.toString() },
      { $push: { interns: dataApplicationIntern }, $inc: { remainingIntern: -1 } }
    );

    res.status(200).send(dataApplicationIntern);
  } catch (err) {
    res.status(500).send(err);
  }
};

const uploadApplicationFile = async (req, res) => {
  res.status(200).send('OK');
};

const uploadCompletionFiles = async (req, res) => {
  res.status(200).send('OK');
};

//Endpoints to be made by the admin
const confirmApplicationFile = async (req, res) => {
  res.status(200).send('OK');
};

const confirmCompletionFiles = async (req, res) => {
  res.status(200).send('OK');
};

module.exports = {
  internshipApplication,
  uploadApplicationFile,
  uploadCompletionFiles,
  confirmApplicationFile,
  confirmCompletionFiles
};
