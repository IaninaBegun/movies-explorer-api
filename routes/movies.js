const router = require('express').Router();

// импорт контроллеров;
const {
  createMovie,
  getMovies,
  getMoviesByIdAndDelete,
} = require('../controllers/movies');

// импорт схем валидации celebrate;
const {
  celebrateDeleteMovie,
  celebrateCreateMovie,
} = require('../middlewares/joiCelebrateSchemas');

// роут для получения всех сохранённых фильмов пользователя;
router.get('/movies', getMovies);

// роут для добавление фильмов в сохранённые;
router.post('/movies', celebrateCreateMovie, createMovie);

// роут для удаления фильмов по id;
router.delete('/movies/:movieId', celebrateDeleteMovie, getMoviesByIdAndDelete);

module.exports = router;
