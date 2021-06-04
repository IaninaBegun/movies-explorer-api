const { isCelebrateError } = require('celebrate');

const celebrateErrorsHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const errorParams = err.details.get('params');

    if (errorBody) {
      return res.status(400).send({
        message: errorBody.message,
      });
    }
    if (errorParams) {
      return res.status(400).send({
        message: errorParams.message,
      });
    }
  }
  throw next(err);
};

module.exports = celebrateErrorsHandler;
