const { hash } = require("../helpers/hashingHelpers");

const hashPassword = async (req, res, next) => {
  const hashedPassword = await hash(req.body.creationPassword);

  req.body.creationPassword = hashedPassword;

  next();
};

module.exports = hashPassword;
