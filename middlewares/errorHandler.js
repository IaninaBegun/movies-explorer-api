const { internalServerErrMessage } = require('../helpers/constants');

const errorHandler = (err, req, res) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? internalServerErrMessage
        : message,
    });
};

module.exports = errorHandler;
