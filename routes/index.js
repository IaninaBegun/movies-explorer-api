const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const {
  celebrateCreateUser,
  celebrateLoginUser,
} = require('../middlewares/joiCelebrateSchemas');

const NotFoundError = require('../errors/notFoundError');
const { pathNotFoundErrMessage } = require('../helpers/constants');

router.post('/signup', celebrateCreateUser, createUser);
router.post('/signin', celebrateLoginUser, login);

router.use(auth);

router.use('/', userRouter, moviesRouter);
router.use('*', (req, res, next) => {
  const notFoundError = new NotFoundError(pathNotFoundErrMessage);
  next(notFoundError);
});

module.exports = router;
