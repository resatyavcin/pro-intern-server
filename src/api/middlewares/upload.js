const multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const internCount = req.user.interns.length;

    const dir = `uploads/${req.user._id}/${internCount}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage });

module.exports = upload;
