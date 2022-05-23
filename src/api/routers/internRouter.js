const express = require('express');
const router = express.Router();
const {
  internshipApplication,
  fetchAllIntern,
  createSignature,
  fetchInternById,
  signatureFile,
  commitSignatureToFile
} = require('../controllers/internController');

//middleware import
const permission = require('../middlewares/permission');

router.get('/fetch-all-interns', permission(['STUDENT']), fetchAllIntern);
router.get('/fetch-intern/:intern_id', permission(['STUDENT']), fetchInternById);
router.post('/create-signature', permission(['STUDENT', 'ADMIN']), createSignature);

router.post('/application', permission(['STUDENT']), internshipApplication);
router.post('/sign-file', permission(['STUDENT', 'ADMIN']), signatureFile);
router.post('/commit-signature', permission(['STUDENT', 'ADMIN']), commitSignatureToFile);

module.exports = router;
