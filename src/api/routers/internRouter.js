const express = require('express');
const router = express.Router();
const {
  internshipApplication,
  uploadApplicationFile,
  uploadCompletionFiles,
  confirmApplicationFile,
  confirmCompletionFiles,
  fetchAllIntern
} = require('../controllers/internController');

//middleware import
const permission = require('../middlewares/permission');
const upload = require('../middlewares/upload');

router.get('/fetch-all-interns', permission(['STUDENT']), fetchAllIntern);
router.post('/application', permission(['STUDENT']), internshipApplication);
router.post(
  '/upload/application-file',
  permission(['STUDENT']),
  upload.single('applicationFile'),
  uploadApplicationFile
);
router.post('/confirm/application-file/:file_id', permission(['ADMIN']), confirmApplicationFile);

router.post(
  '/upload/completion-file',
  permission(['STUDENT']),
  upload.array('completion-files', 2),
  uploadCompletionFiles
);

router.post('/confirm/completion-file', permission(['ADMIN']), confirmCompletionFiles);

module.exports = router;
