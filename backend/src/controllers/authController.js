const models = require("../models");
const { verify } = require("../helpers/hashingHelpers");

const signIn = async (req, res) => {
  const passwordVerif = await verify(req.user.password, req.body.password);

  if (!passwordVerif) return res.sendStatus(500);

  delete req.user.password;

  return res.status(200).json(req.user);
};

const signUp = async (req, res) => {
  delete req.body.confirmPassword;
  const [result] = await models.user.insert(req.body);
  delete req.body.creationPassword;

  if (result.affectedRows) {
    res.status(201).json({ id: result.insertId, ...req.body });
  } else {
    res.status(500).send("error is here");
  }
};

module.exports = { signIn, signUp };
