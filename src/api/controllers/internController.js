//import Models
const Intern = require('../models/Intern');
const User = require('../models/User');
const File = require('../models/File');

/* ----------------------------------------------------------- */
//ENDPOINTS
/* ----------------------------------------------------------- */

//Utils
const fetchAllIntern = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.user._id }).populate('interns');

    res.status(200).send(student.interns);
  } catch (err) {
    res.status(500).send(err);
  }
};

const fetchInternById = async (req, res) => {
  const id = req.params.intern_id;

  try {
    const intern = await Intern.findOne({ _id: id });

    res.status(200).send(intern);
  } catch (err) {
    res.status(500).send(err);
  }
};

//STATUS-1 Öğrenci başvuru yaptı genel olarak tüm bilgiler tamamlnır.
const internshipApplication = async (req, res) => {
  try {
    const form = req.body;

    const startDate = form.rangeInternDate[0];
    const endDate = form.rangeInternDate[1];

    delete form.rangeInternDate;

    const newInternForm = { ...form, startDate, endDate };

    const intern = new Intern({
      student: req.user._id,
      ...newInternForm
    });

    console.log(intern);

    const student = await User.findOne({ _id: req.user._id }).populate('interns');

    if (student.remainingIntern === 0) {
      return res.status(500).send('RESPONSE.FULL_LIMIT_INTERN');
    }

    if (student.interns) {
      let interns_count = student.interns.length;

      if (interns_count === 1 && student.interns[0].completed === false) {
        return res.status(500).send('RESPONSE.SAME_TIME_INTERN_ERROR');
      }
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

const createSignatureFileForApplicationDoc = async (req, res) => {
  const { path } = req.body;

  const stundentInternsCount = req.user.interns.length;

  try {
    const signatureFile = new File({
      studentSignaturePath: path,
      intern: req.user.interns[stundentInternsCount - 1]
    });

    await signatureFile.save();

    await Intern.findOneAndUpdate({ id: req.user.interns[stundentInternsCount - 1] }, { status: 'STS-2' });

    res.status(200).send('Öğrenci tarafından başarı ile imzalandı');
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  internshipApplication,
  fetchAllIntern,
  fetchInternById,
  createSignatureFileForApplicationDoc
};
