const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../services/nodemailer');
const emailTemplates = require('../helper/email');

const { authService, userService, tokenService, emailService } = require('../services');
const SubUser = require('../models/subUser');
const onAddAttorneyTemplate = emailTemplates.onAddAttorney;

const registerStepOne = catchAsync(async (req, res) => {
  // const user = await userService.createUser(req.body);
  const { countryPrifix, numeral, taradeRegisterNumebr, companyName, street, city, country, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const saveObj = {
    countryPrifix,
    numeral,
    taradeRegisterNumebr,
    companyName,
    street,
    city,
    country,
    username,
    password: hash,
  };
  const saveData = await User.create(saveObj);
  res.status(httpStatus.CREATED).json({ success: true, data: saveData, message: 'Step one completed successfully' });
});

const registerStepTwo = catchAsync(async (req, res) => {
  const { id, activityDescription, numberOfEmploye, link, name, surname, email, phoneNumber } = req.body;
  const file = req.file;
  console.log('file', file);
  const fileUrl = `http://localhost:3000/${file.filename}`;
  console.log('fileUrl', fileUrl);

  const updateObj = {
    activityDescription,
    numberOfEmploye,
    link,
    name,
    surname,
    email,
    phoneNumber,
    avatar: fileUrl,
  };
  const updateUser = await User.update(updateObj, { where: { id: id }, returning: true });
  res.json({
    success: true,
    data: updateUser,
    message: 'Step 2 completed successfully',
  });
});

const registerStepThree = catchAsync(async (req, res) => {
  const { id, ...fields } = req.body;
  // console.log('fields', fields);
  for (const key in fields) {
    console.log('key', key);
    if (Object.prototype.hasOwnProperty.call(fields[key], 'repeatPassword')) {
      console.log('fields[key]', fields[key]);
      return fields[key];
    } else {
      return false;
    }
  }

  console.log('fields:', fields);
  const ab = await SubUser.bulkCreate({});
  console.log('ab', ab);
  const updateUser = await User.update({ account: fields }, { where: { id: id }, returning: true });
  res.json({
    success: true,
    data: updateUser,
    message: 'Successfully registered',
  });
});

const login = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  let findUser;
  if (username) {
    findUser = await User.findOne({ where: { username } });
  } else {
    findUser = await User.findOne({ where: { email } });
  }
  console.log('findUser', findUser);
  if (findUser) {
    const verifyPassword = await bcrypt.compare(password, findUser.dataValues.password);
    if (verifyPassword) {
      const tokens = await tokenService.generateAuthTokens(findUser);
      const response = { findUser, tokens };
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
      message: 'User not found',
    });
  }
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword, repeatNewPassword } = req.body;
  const user = req.user;
  const findUser = await User.findOne({ where: { id: user.id } });
  console.log('findUser', findUser);
  const verifyPassword = await bcrypt.compare(oldPassword, findUser.dataValues.password);
  console.log('verifyPassword', verifyPassword);
  if (verifyPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: findUser.dataValues.id } });
    res.json({
      success: true,
      message: 'Password change successfully',
    });
  } else {
    res.json({
      success: false,
      message: 'Password is invalid',
    });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const findEmail = await User.findOne({ where: { email } });
  if (findEmail) {
    const AddedAttorneyTemplate = await onAddAttorneyTemplate('samaydolasia1000@gmail.com');
    const to = 'samaydolasia1000@gmail.com';
    sendEmail(to, 'For forgot password', AddedAttorneyTemplate);
  } else {
    res.json({
      success: false,
      message: 'User not found',
    });
  }
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  registerStepOne,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  registerStepTwo,
  registerStepThree,
  changePassword,
};
