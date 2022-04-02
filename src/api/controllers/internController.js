const Intern = require('../models/Intern');
const User = require('../models/User');

//Endpoints to be made by the student
const internshipApplication = async (req, res) => {
  const {
    companyName,
    companyAddress,
    companyPhone,
    companyFax,
    companyEmail,
    companyActivity,
    companyTotalEmployee,
    personFullName,
    personPhone,
    personEmail,
    personJobTitle,
    personTaskArea
  } = req.body;

  try {
    const intern = new Intern({
      student: req.user._id,
      companyInfo: {
        companyName,
        companyAddress,
        companyPhone,
        companyFax,
        companyEmail,
        companyActivity,
        companyTotalEmployee
      },
      authorizedPersonName: {
        personFullName,
        personPhone,
        personEmail,
        personJobTitle,
        personTaskArea
      }
    });

    const student = await User.findOne({ _id: req.user._id }).populate('interns');

    if (student.remainingIntern === 0) {
      return res.status(500).send('RESPONSE.FULL_LIMIT_INTERN');
    }

    let interns_count = student.interns.length;

    if (interns_count === 1 && student.interns[0].companyInfo.companyName === companyName) {
      return res.status(500).send('RESPONSE.SAME_COMPANY_BEFORE_INTERN_ERROR');
    }
    if (interns_count === 1 && student.interns[0].completed === false) {
      return res.status(500).send('RESPONSE.SAME_TIME_INTERN_ERROR');
    }

    const dataApplicationIntern = await intern.save();

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
