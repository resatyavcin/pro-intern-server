const specialPermission = (role) => (req, res, next) => {
  if (role === req.role) {
    next();
  }

  return res.status(403).send('Access denied.');
};

module.exports = specialPermission;
