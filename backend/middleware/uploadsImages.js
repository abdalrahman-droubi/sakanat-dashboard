const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // Set the destination folder where the files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

module.exports = upload;