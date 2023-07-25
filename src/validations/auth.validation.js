const { password } = require('./custom.validation');
const { User } = require('../models');

const registerStepOne = async (req, res, next) => {
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
    confirmPassword,
  } = req.body;

  if (countryPrifix && numeral && companyName && street && city && country && username && password && confirmPassword) {
    const findUser = await User.findOne({ where: { username } });
    console.log('findUser', findUser);
    if (findUser) {
      res.json({
        success: false,
        message: 'User is already exists',
      });
    } else {
      if (password === confirmPassword) {
        next();
      } else {
        res.json({
          success: false,
          message: 'password and confirm password is not matching',
        });
      }
    }
  } else if (!countryPrifix) {
    res.json({
      success: false,
      message: 'Please select country prifix',
    });
  } else if (!numeral) {
    res.json({
      success: false,
      essage: 'Please enter numeral field',
    });
  } else if (!companyName) {
    res.json({
      success: false,
      message: 'Please enter company name',
    });
  } else if (!street) {
    res.json({
      success: false,
      message: 'Please enter address',
    });
  } else if (!city) {
    res.json({
      success: false,
      message: 'Please select city',
    });
  } else if (!country) {
    res.json({
      success: false,
      message: 'Please select country',
    });
  } else if (!username) {
    res.json({
      success: false,
      message: 'Please enter username',
    });
  } else if (!password) {
    res.json({
      success: false,
      message: 'Please enter password field',
    });
  } else {
    res.json({
      success: false,
      message: 'Please enter confirm password field',
    });
  }
};

const login = (req, res, next) => {
  const { username, email, password } = req.body;

  if ((username || email) && password) {
    next();
  } else if (!username && !email) {
    res.json({
      success: false,
      message: 'Please enter username or email',
    });
  } else {
    res.json({
      success: false,
      message: 'Please enter password',
    });
  }
};

const changePassword = (req, res, next) => {
  const { oldPassword, newPassword, repeatNewPassword } = req.body;
  if (oldPassword && newPassword && repeatNewPassword) {
    if (newPassword === repeatNewPassword) {
      next();
    } else {
      res.json({
        success: false,
        message: 'New password and repeat password are not matching',
      });
    }
  } else if (!oldPassword) {
    res.json({
      success: false,
      message: 'Please enter old password',
    });
  } else if (!newPassword) {
    res.json({
      success: false,
      message: 'Please enter new password',
    });
  } else {
    res.json({
      success: false,
      message: 'Please enter repeat new password',
    });
  }
};

// const logout = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

// const refreshTokens = {
//   body: Joi.object().keys({
//     refreshToken: Joi.string().required(),
//   }),
// };

const forgotPassword = (req, res, next) => {
  const { email } = req.body;
  if (email) {
    next();
  } else {
    res.json({
      success: false,
      message: 'Please enter email',
    });
  }
};

// const resetPassword = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
//   body: Joi.object().keys({
//     password: Joi.string().required().custom(password),
//   }),
// };

// const verifyEmail = {
//   query: Joi.object().keys({
//     token: Joi.string().required(),
//   }),
// };

module.exports = {
  registerStepOne,
  login,
  changePassword,
  forgotPassword,
  // logout,
  // refreshTokens,
  // resetPassword,
  // verifyEmail,
};
