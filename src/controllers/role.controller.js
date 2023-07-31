const httpStatus = require('http-status');
const Role = require('../models/role.model');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const addRole = catchAsync(async (req, res) => {
  const { roleName, permission } = req.body;
  const admin = req.user.dataValues;
  console.log('admin', admin.dataValues);
  const saveData = await Role.create({ roleName, permission, adminId: admin.id });
  res.status(httpStatus.CREATED).json({ success: true, data: saveData, message: 'Role added successfully' });
});

const editRole = catchAsync(async (req, res) => {
  const admin = req.user.dataValues;
  const { id, roleName, permission } = req.body;

  const saveData = await Role.update({ roleName, permission, adminId: admin.id }, { where: { id: id }, returning: true });
  res.status(httpStatus.CREATED).json({ success: true, data: saveData, message: 'Role updated successfully' });
});

const deleteRole = catchAsync(async (req, res) => {
  const { id } = req.body;

  const deleteData = await Role.destroy({ where: { id: id } });
  res.status(httpStatus.CREATED).json({ success: true, data: deleteData, message: 'Role deleted' });
});

const getRole = catchAsync(async (req, res) => {
  const admin = req.user.dataValues;

  const getRole = await Role.findAll({ where: { adminId: admin.id } });
  res.status(httpStatus.CREATED).json({ success: true, data: getRole });
});

module.exports = {
  addRole,
  editRole,
  deleteRole,
  getRole,
};
