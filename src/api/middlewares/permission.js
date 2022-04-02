const permission = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(500).send();
  }

  if (!role.includes(req.user.role)) {
    return res.status(500).send('RESPONSE.ACCESS_DENIED');
  }

  next();
};

module.exports = permission;
