const httpStatus = require('http-status');
const Role = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { Admin, User } = require('../models');
const sendEmail = require('../services/nodemailer');
const { authService, userService, tokenService, emailService } = require('../services');
const emailTemplates = require('../helper/email');
const utility = require('../helper/utility');

const onAddAttorneyTemplate = emailTemplates.onDelete;

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log('req.body', req.body);
  const findAdmin = await Admin.findOne({ where: { email } });
  console.log('findAdmin', findAdmin);
  if (findAdmin) {
    const verifyPassword = await bcrypt.compare(password, findAdmin.dataValues.password);
    const tokens = await tokenService.generateAuthTokens(findAdmin);
    const response = { findAdmin, tokens };
    if (verifyPassword) {
      res.json({
        success: true,
        data: response,
        message: 'Login successfully',
      });
    } else {
      res.json({
        success: false,
        message: 'Password is invalid',
      });
    }
  } else {
    res.json({
      success: false,
      message: 'User is invalid',
    });
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const findEmail = await Admin.findOne({ where: { email } });
  console.log('findEmail', findEmail);
  if (findEmail) {
    const randomCode = utility.generateRandomCode(4);
    const AddedAttorneyTemplate = await onAddAttorneyTemplate('samaydolasia1000@gmail.com', randomCode);
    const to = 'samaydolasia1000@gmail.com';
    sendEmail(to, 'For forgot password', AddedAttorneyTemplate);
    const random = { randomCode };
    // console.log('forgotObj', forgotObj);
    const updateAdmin = await Admin.update({ forgotObj: random }, { where: { email }, returning: true });
    console.log('updateAdmin', updateAdmin);
    res.json({
      success: true,
      data: updateAdmin,
      message: 'Otp sent via your email!!',
    });
  } else {
    res.json({
      success: false,
      message: 'User not found',
    });
  }
});

const verifyPassword = catchAsync(async (req, res) => {
  const { email, forgotPin, password } = req.body;
  const findAdmin = await Admin.findOne({ where: { email } });
  if (findAdmin) {
    const randomCode = JSON.parse(findAdmin.dataValues.forgotObj);
    console.log('randomCode', randomCode);
    if (forgotPin == randomCode.randomCode) {
      const changePassword = await bcrypt.hash(password, 10);
      const updateAdmin = await Admin.update({ password: changePassword }, { where: { email }, returning: true });
      res.json({
        success: true,
        data: updateAdmin,
        message: 'Password change successfully',
      });
    } else {
      res.json({
        success: false,
        message: 'Your otp is wrong',
      });
    }
  } else {
    res.json({
      success: false,
      message: 'User is not found',
    });
  }
});

const addUser = catchAsync(async (req, res) => {
  const {
    countryPrifix,
    numeral,
    taradeRegisterNumebr,
    companyName,
    street,
    city,
    country,
    username,
    password,
    numberOfEmploye,
    activityDescription,
    name,
    surname,
    email,
    phoneNumber,
    roleId,
  } = req.body;
  if (!req.file) {
    return res.json({
      success: false,
      message: 'Please add image',
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const savedObj = {
    countryPrifix,
    numeral,
    taradeRegisterNumebr,
    companyName,
    street,
    city,
    country,
    username,
    password: passwordHash,
    numberOfEmploye,
    activityDescription,
    name,
    surname,
    email,
    phoneNumber,
    roleId,
    avatar: `http://localhost:3000/${req.file.filename}`,
  };
  const savedData = await User.create(savedObj);
  res.json({
    success: true,
    data: savedData,
    message: 'User added successfully',
  });
});

const editUser = catchAsync(async (req, res) => {
  const {
    countryPrifix,
    numeral,
    taradeRegisterNumebr,
    companyName,
    street,
    city,
    country,
    username,
    numberOfEmploye,
    activityDescription,
    name,
    surname,
    email,
    phoneNumber,
    roleId,
    id,
  } = req.body;

  console.log('req.body', req.body);

  const updateObj = {
    countryPrifix,
    numeral,
    taradeRegisterNumebr,
    companyName,
    street,
    city,
    country,
    username,
    numberOfEmploye,
    activityDescription,
    name,
    surname,
    email,
    phoneNumber,
    roleId: roleId ? roleId : '',
    avatar: req.file ? `http://localhost:3000/${req.file.filename}` : req.body.avatar,
  };
  const updateData = await User.update(updateObj, { where: { id: id }, returning: true });

  res.json({
    success: true,
    // data: updateData,
    message: 'User edited successfully',
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.body;

  const deleteData = await User.destroy({ where: { id: id } });

  res.json({
    success: true,
    data: deleteData,
    message: 'User deleted',
  });
});

const listOfUser = catchAsync(async (req, res) => {
  const listUser = await User.findAll({});

  res.json({
    success: true,
    data: listUser,
  });
});

const listOfParticularUser = catchAsync(async (req, res) => {
  const { id } = req.body;
  console.log('req.body', req.body);
  if (id) {
    const listUser = await User.findOne({ where: id });

    res.json({
      success: true,
      data: listUser,
    });
  } else {
    res.json({
      success: false,
      message: 'User not found',
    });
  }
});

module.exports = {
  adminLogin,
  addUser,
  editUser,
  deleteUser,
  listOfUser,
  forgotPassword,
  verifyPassword,
  listOfParticularUser,
};
