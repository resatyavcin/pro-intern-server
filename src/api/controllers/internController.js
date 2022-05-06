//import Models
const Intern = require('../models/Intern');
const User = require('../models/User');
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

const createSignature = async (req, res) => {
  const { path } = req.body;

  try {
    const fetchedUser = await User.dinfONe({ id: req.user._id });

    if (fetchedUser.signature) {
      return res.status(500).send('Zaten bir imza var');
    }

    fetchedUser.signature = path;
    await fetchedUser.save();

    return res.status(200).send('Başarı ile imza oluşturuldu.');
  } catch (err) {
    return res.status(500).send(err);
  }
};

//STATUS-1 ---> Öğrenci başvurusunun yapıldığı endpoint.
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

const signatureFile = async (req, res) => {
  const { fileID, page, internID } = req.body;

  try {
    const fechedIntern = await Intern.findOne({ id: internID });

    const findFile = await fechedIntern.signature.filter((item) => item.fileId === fileID);

    if (!findFile[0]) {
      await Intern.findOneAndUpdate(
        { id: req.user.interns[stundentInternsCount - 1] },
        {
          $push: {
            signature: {
              fileId: fileID,
              signatureInfo: {
                signatureBy: req.user.id,
                signaturePage: page
              }
            }
          }
        }
      );

      return res.status(200).send(`${req.user.firstName} tarafından imzalandı`);
    } else {
      const findUser = await findFile[0].signatureInfo.filter((item) => {
        if (item.signatureBy.toString() === req.user.id) {
          return item;
        }
      });

      if (findUser.length === 0) {
        findFile[0].signatureInfo.push({
          signatureBy: req.user.id,
          signaturePage: page
        });
      } else {
        if (await findUser[0].signaturePage.includes(page)) {
          return res.status(500).send('Bu sayfa zaten bu kullanıcı tarafından imzalanmıştır.');
        } else {
          findUser[0].signaturePage = [...findUser[0].signaturePage, page];
        }
      }
    }

    await fechedIntern.save();

    return res.status(200).send(`${req.user.firstName} tarafından ${page}. sayfa imzalandı`);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  internshipApplication,
  fetchAllIntern,
  fetchInternById,
  createSignature,
  signatureFile
};
