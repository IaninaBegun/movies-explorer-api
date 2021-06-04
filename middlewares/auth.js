const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');

const { getUserUnauthorizedErrMessage } = require('../helpers/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(getUserUnauthorizedErrMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(getUserUnauthorizedErrMessage));
  }

  req.user = payload;

  next();
};
