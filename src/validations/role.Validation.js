const addRole = async (req, res, next) => {
  const { roleName, permission } = req.body;
  if (roleName && permission.length) {
    next();
  } else if (!roleName) {
    res.json({
      success: false,
      message: 'Plese enter role name',
    });
  } else {
    res.json({
      success: false,
      message: 'Plese enter permissions',
    });
  }
};

const editRole = async (req, res, next) => {
  const { id, roleName, permission } = req.body;
  if (id && roleName && permission.length) {
    next();
  } else if (!roleName) {
    res.json({
      success: false,
      message: 'Plese enter role name',
    });
  } else if (!permission) {
    res.json({
      success: false,
      message: 'Plese enter permissions',
    });
  } else {
    res.json({
      success: false,
      message: 'Please select propler role to update',
    });
  }
};

const deleteRole = async (req, res, next) => {
  const { id } = req.body;
  if (id) {
    next();
  } else {
    res.json({
      success: false,
      message: 'Please select propler role to update',
    });
  }
};
module.exports = { addRole, editRole, deleteRole };
