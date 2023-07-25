const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else if (!email) {
    res.json({
      success: false,
      message: 'Please enter email',
    });
  } else {
    res.json({
      success: false,
      message: 'Please enter password',
    });
  }
};

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
const verifyPassword = (req, res, next) => {
  const { email, forgotPin, password } = req.body;
  if (email && forgotPin && password) {
    next();
  } else if (!email) {
    res.json({
      success: false,
      message: 'Please enter email',
    });
  } else if (!forgotPin) {
    res.json({
      success: false,
      message: 'Please enter otp',
    });
  } else {
    res.json({
      success: false,
      message: 'Please enter password',
    });
  }
};
module.exports = { adminLogin, forgotPassword, verifyPassword };
