const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const adminValaidation = require('../../validations/admin.validation');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', '..', 'public'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    console.log('file', file);
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg, and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  },
});

router.post('/login', adminValaidation.adminLogin, adminController.adminLogin);
//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router.post('/add-user', auth.adminAuth(), upload.single('avatar'), adminController.addUser);
router.post('/edit-user', auth.adminAuth(), upload.single('avatar'), adminController.editUser);
router.post('/delete-user', auth.adminAuth(), adminController.deleteUser);
router.post('/list-of-user', auth.adminAuth(), adminController.listOfUser);
router.post('/find-user', auth.adminAuth(), adminController.listOfParticularUser);

router.post('/forgot-password', adminValaidation.forgotPassword, adminController.forgotPassword);
router.post('/verify-forgot-password', adminValaidation.verifyPassword, adminController.verifyPassword);

module.exports = router;
