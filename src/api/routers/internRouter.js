const express = require('express');
const router = express.Router();

const {
  internshipApplication,
  uploadApplicationFile,
  uploadCompletionFiles,
  confirmApplicationFile,
  confirmCompletionFiles
} = require('../controllers/internController');

//middleware import
const permission = require('../middlewares/permission');

router.post('/application', permission(['STUDENT']), internshipApplication);
router.post('/upload/application-file', permission(['STUDENT']), uploadApplicationFile);
router.post('/upload/completion-file', permission(['STUDENT']), uploadCompletionFiles);
router.post('/confirm/application-file', permission(['ADMIN']), confirmApplicationFile);
router.post('/confirm/completion-file', permission(['ADMIN']), confirmCompletionFiles);

module.exports = router;
