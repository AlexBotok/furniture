const multer = require('multer');
const moment = require('moment');
const imageSize = require('image-size');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

const upload = multer({
  storage,
  fileFilter,
  limits
})

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const checkImageSize = (filePath) => {
  const dimensions = imageSize(filePath);
  const width = dimensions.width;
  const height = dimensions.height;
  if (width > 512 || height > 512) {
    deleteFile(filePath);
    throw new Error('Картинка должна быть до 512px x 512px');
  }
};

module.exports = { upload, checkImageSize };
