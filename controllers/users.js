const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

const {
  saltRounds,
  MONGO_DUPLICATE_ERROR_CODE,
  createUserValidationErrMessage,
  createUserConflictErrMessage,
  createUserSuccessMessage,
  getUserNotFoundErrMessage,
  getUserInvalidIdErrMessage,
  getUserUnauthorizedErrMessage,
} = require('../helpers/constants');

const User = require('../models/user');

const createUser = (req, res, next) => {
  const { password, email, name } = req.body;

  if (!email || !password || !name) {
    throw new ValidationError(createUserValidationErrMessage);
  }

  bcrypt.hash(password, saltRounds)

    .then((hash) => User.create({ password: hash, email, name }))
    .then(() => {
      res.status(200).send({ message: createUserSuccessMessage });
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE || err.name === 'ValidationError') {
        const conflictError = new ConflictError(createUserConflictErrMessage);
        next(conflictError);
      }
      next(err);
    });
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Not Found');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        const notFoundError = new NotFoundError(getUserNotFoundErrMessage);
        next(notFoundError);
      }
      if (err.kind === 'ObjectId') {
        const validationError = new ValidationError(getUserInvalidIdErrMessage);
        next(validationError);
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Not Found');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'Not Found') {
        next(new NotFoundError(getUserNotFoundErrMessage));
      }
      if (err.kind === 'ObjectId') {
        next(new ValidationError(getUserInvalidIdErrMessage));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(getUserUnauthorizedErrMessage));
    });
};

module.exports = {
  createUser,
  getMyProfile,
  updateUserInfo,
  login,
};
