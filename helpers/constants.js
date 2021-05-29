const regex = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/_])*)?/;
const saltRounds = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

// сообщения об ошибках валидации Joi;
const messages = {
  messages: {
    'string.email': 'Введён некорректный email.',
    'string.empty': 'Поля не могут быть пустыми!',
    'string.min': 'Поле {#label} должно содержать минимум {#limit} символа.',
    'string.max': 'Поле {#label} должно содержать максимум {#limit} символов.',
    'number.base': 'Поле {#label} должно быть числом с максимум двумя знаками после запятой.',
    'number.positive': 'Поле {#label} должно содержать положительное число.',
    'string.pattern.base': 'Некорректная ссылка на изображение.',
    'string.length': 'Передан невалидный id фильма.',
    'string.hex': 'Передан невалидный id фильма.',
    'any.required': 'Все поля должны быть заполнены. Пропущено поле {#label}.',
    'object.unknown': 'Поле {#label} является лишним. Удалите его для успешного запроса.',
  },
};

// сообщения об ошибках и успешных запросах в контроллере movies;
const createMovieValidationErrMessage = 'Произошла ошибка валидации, пожалуйста, введите корректные данные.';
const deleteMovieNotFoundErrMessage = 'Фильм с таким id не найден.';
const deleteMovieForbiddenErrMessage = 'Данный фильм сохранён другим пользователем, удалить можно только свои фильмы.';
const deleteMovieInvalidIdErrMessage = 'Передан невалидный id фильма.';
const deleteMovieSuccessMessage = 'Фильм успешно удалён.';

// сообщения об ошибках и успешных запросах в контроллере users;
const createUserValidationErrMessage = 'Не передан email, пароль или имя пользователя.';
const createUserConflictErrMessage = 'Такой пользователь уже существует.';
const createUserSuccessMessage = 'Пользователь успешно создан!';
const getUserNotFoundErrMessage = 'Пользователь с таким id не найден.';
const getUserInvalidIdErrMessage = 'Передан невалидный id пользователя.';
const getUserUnauthorizedErrMessage = 'Необходима авторизация.';

// сообщение об ошибке в роуте index;
const pathNotFoundErrMessage = 'Запрашиваемый ресурс не найден.';

// сообщение об ошибке сервера в errorHandler;
const internalServerErrMessage = 'Произошла ошибка сервера.';

// сообщение об ошибке в модели User;
const findUserRejectErrMessage = 'Неправильные почта или пароль.';

module.exports = {
  regex,
  saltRounds,
  MONGO_DUPLICATE_ERROR_CODE,
  messages,
  createMovieValidationErrMessage,
  deleteMovieNotFoundErrMessage,
  deleteMovieForbiddenErrMessage,
  deleteMovieInvalidIdErrMessage,
  deleteMovieSuccessMessage,
  createUserValidationErrMessage,
  createUserConflictErrMessage,
  createUserSuccessMessage,
  getUserNotFoundErrMessage,
  getUserInvalidIdErrMessage,
  getUserUnauthorizedErrMessage,
  pathNotFoundErrMessage,
  internalServerErrMessage,
  findUserRejectErrMessage,
};
