const multer = require('multer');
const moment = require('moment');
const imageSize = require('image-size');
const fs = require('fs');
const sharp = require('sharp');

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
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
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

const resizeImage = async (filePath) => {
  try {
    const resizedImageBuffer = await sharp(filePath)
      .resize({ width: 1000, height: 1000, fit: 'cover' })
      .toBuffer();
    fs.writeFileSync(filePath, resizedImageBuffer);
  } catch (err) {
    deleteFile(filePath);
    throw new Error('Не удалось обработать изображение');
  }
};

module.exports = { upload, resizeImage };
