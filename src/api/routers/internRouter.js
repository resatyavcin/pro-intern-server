const express = require('express');
const router = express.Router();
const {
  internshipApplication,
  fetchAllIntern,
  createSignatureFileForApplicationDoc,
  fetchInternById
} = require('../controllers/internController');

//middleware import
const permission = require('../middlewares/permission');
const upload = require('../middlewares/upload');

router.get('/fetch-all-interns', permission(['STUDENT', 'ADMIN']), fetchAllIntern);
router.get('/fetch-intern/:intern_id', permission(['STUDENT']), fetchInternById);

router.post('/application', permission(['STUDENT']), internshipApplication);
//create STS-1

router.post(
  '/create-signature-file',
  permission(['STUDENT']),
  upload.single('new-signature-file'),
  createSignatureFileForApplicationDoc
);
//update STS-2

module.exports = router;
