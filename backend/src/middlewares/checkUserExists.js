const models = require("../models");

const CheckUserExists = async (req, res, next) => {
  const [user] = await models.user.findOneByEmail(req.body.mail);

  if (!user.length) return res.sendStatus(500);

  [req.user] = user;

  return next();
};

module.exports = CheckUserExists;
