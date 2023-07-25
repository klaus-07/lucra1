const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValaidation = require('../../validations/role.Validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router.post('/add-role', auth.adminAuth(), roleValaidation.addRole, roleController.addRole);

router.post('/edit-role', auth.adminAuth(), roleValaidation.editRole, roleController.editRole);
router.post('/delete-role', auth.adminAuth(), roleValaidation.deleteRole, roleController.deleteRole);
router.post('/get-role', auth.adminAuth(), roleController.getRole);

//   .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
