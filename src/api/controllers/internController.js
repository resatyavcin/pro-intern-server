//import Models
const Intern = require('../models/Intern');
const User = require('../models/User');
const File = require('../models/File');

/* ----------------------------------------------------------- */
//ENDPOINTS
/* ----------------------------------------------------------- */

const fetchAllIntern = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.user._id }).populate('interns');

    res.status(200).send(student.interns);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Endpoints to be made by the student
//Student applies
//STATUS - 1 -OK
const internshipApplication = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const intern = new Intern({
      student: req.user._id,
      startDate,
      endDate
    });

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

//Endpoints to be made by the student
//Student upload application file
//STATUS - 2 -OK
const uploadApplicationFile = async (req, res) => {
  const file = req.file;

  console.log('file');

  const stundentInternsCount = req.user.interns.length;

  try {
    const dir = file.destination + '/' + file.filename;
    const applicationFile = new File({ filePath: dir, intern: req.user.interns[stundentInternsCount - 1] });

    await applicationFile.save();

    await Intern.findOneAndUpdate({ id: req.user.interns[stundentInternsCount - 1] }, { status: 'STS-2' });

    return res.status(201).send(applicationFile);
  } catch (err) {
    res.status(500).send(req.file);
  }
};

//Endpoints to be made by the company
//Company signature application file
//STATUS - 3 -PROCESSING
const signatureApplicationFile = async (req, res) => {
  try {
    res.status(200).send('MOVE TO TRASH');
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Admin confirm or reject
//STATUS - 4 -OK
const confirmApplicationFile = async (req, res) => {
  const file_id = req.params.file_id;
  const { reply } = req.body;

  try {
    if (reply != 'YES' && reply != 'NO') {
      return res.status(500).send('WRONG_REPLY_FOR_CONFIRM');
    }

    const file = await File.findOne({ id: file_id });

    if (!file) {
      return res.status(500).send('FILE_NOT_FOUND');
    }

    if (file.isTrash === true || file.approve === true) {
      return res.status(500).send('CANNOT_BE_PROCESSED');
    }

    if (reply == 'YES') {
      file.approver = req.user._id;
      file.approve = true;
      await file.save();

      await Intern.findOneAndUpdate({ id: file.intern }, { status: 'STS-4' });

      return res.status(200).send('CONFIRM OKE');
    }

    await File.findOneAndUpdate({ id: file_id }, { isTrash: true });

    res.status(200).send('MOVE TO TRASH');
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the student
//if admin confirm application file, student uploads completion files
//STATUS - 5 -OK
const uploadCompletionFiles = async (req, res) => {
  const files = req.files;

  const stundentInternsCount = req.user.interns.length;

  try {
    for (let i = 0; i < files.length; i++) {
      const dir = files[i].destination + '/' + files[i].filename;
      const applicationFile = new File({ filePath: dir, intern: req.user.interns[stundentInternsCount - 1] });

      await applicationFile.save();

      await Intern.findOneAndUpdate({ id: req.user.interns[stundentInternsCount - 1] }, { status: 'STS-5' });
    }

    return res.status(201).send(files);
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the student
////Company signature completion files
//STATUS - 6 -PROCESSING
const signatureCompletionFiles = async (req, res) => {
  try {
    res.status(200).send('MOVE TO TRASH');
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

//Endpoints to be made by the admin
//Admin confirm or reject, if confirm intern complated.
//STATUS - 7 -PROCESSING
const confirmCompletionFiles = async (req, res) => {
  const file_one_id = req.query.file_one;
  const file_two_id = req.query.file_two;

  try {
    // if (reply != 'YES' && reply != 'NO') {
    //   return res.status(500).send('WRONG_REPLY_FOR_CONFIRM');
    // }

    // const file = await File.findOne({ id: file_id });

    // if (!file) {
    //   return res.status(500).send('FILE_NOT_FOUND');
    // }

    // if (file.isTrash === true || file.approve === true) {
    //   return res.status(500).send('CANNOT_BE_PROCESSED');
    // }

    // if (reply == 'YES') {
    //   file.approver = req.user._id;
    //   file.approve = true;
    //   await file.save();

    //   await Intern.findOneAndUpdate({ id: file.intern }, { status: 'STS-7' });

    //return
    res.status(200).send('CONFIRM OKE');
    // }

    // await File.findOneAndUpdate({ id: file_id }, { isTrash: true });

    //res.status(200).send('MOVE TO TRASH');
  } catch (err) {
    res.status(500).send('FAILED');
  }
};

module.exports = {
  signatureApplicationFile,
  signatureCompletionFiles,
  internshipApplication,
  uploadApplicationFile,
  uploadCompletionFiles,
  confirmApplicationFile,
  confirmCompletionFiles,
  fetchAllIntern
};
