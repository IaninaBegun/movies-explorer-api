require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const celebrateErrorsHandler = require('./middlewares/celebrateErrorsHandler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(limiter);

const { PORT = 3000, DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  useUnifiedTopology: true,
});

const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  celebrateErrorsHandler(err, req, res, next);
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log('App is listening');
});
