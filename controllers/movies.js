const Movie = require('../models/movie');
const ValidationError = require('../errors/validationError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const {
  createMovieValidationErrMessage,
  deleteMovieNotFoundErrMessage,
  deleteMovieForbiddenErrMessage,
  deleteMovieInvalidIdErrMessage,
  deleteMovieSuccessMessage,
} = require('../helpers/constants');

const createMovie = (req, res, next) => {
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validationError = new ValidationError(
          createMovieValidationErrMessage,
        );
        next(validationError);
      }
      next(err);
    });
};

const getMovies = (req, res, next) => {
  const currentUser = req.user._id;
  Movie.find({ owner: currentUser })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

const getMoviesByIdAndDelete = (req, res, next) => {
  const currentUser = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(deleteMovieNotFoundErrMessage);
      }
      return movie;
    })
    .then((movieToDelete) => {
      if (`${currentUser}` !== `${movieToDelete.owner}`) {
        throw new ForbiddenError(
          deleteMovieForbiddenErrMessage,
        );
      }
      Movie.findByIdAndRemove(`${movieToDelete._id}`)
        .then(() => res.status(200).send({ message: deleteMovieSuccessMessage }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError(deleteMovieInvalidIdErrMessage));
      }
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  getMoviesByIdAndDelete,
};
