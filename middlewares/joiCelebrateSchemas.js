const { celebrate, Joi } = require('celebrate');

const { regex, messages } = require('../helpers/constants');

// валидация celebrate для роута по созданию нового пользователя;
const celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('email'),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('пароль'),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .label('имя пользователя'),
  }),
}, messages);

// валидация celebrate для входа пользователя и получения токена;
const celebrateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('email'),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('пароль'),
  }),
}, messages);

// валидация celebrate для роута по обновлению данных пользователя;
const celebrateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .label('имя пользователя'),
    email: Joi
      .string()
      .required()
      .email()
      .label('email'),
  }),
}, messages);

// валидация роута для создания фильма;
const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required()
      .label('страна создания фильма'),
    director: Joi
      .string()
      .required()
      .label('режиссёр фильма'),
    duration: Joi
      .number()
      .required()
      .precision(2)
      .positive()
      .label('длительность фильма'),
    year: Joi
      .string()
      .required()
      .label('год выпуска фильма'),
    description: Joi
      .string()
      .required()
      .label('описание фильма'),
    image: Joi
      .string()
      .required()
      .pattern(regex)
      .label('ссылка на постер к фильму'),
    trailer: Joi
      .string()
      .required()
      .pattern(regex)
      .label('ссылка на трейлер фильма'),
    thumbnail: Joi
      .string()
      .required()
      .pattern(regex)
      .label('ссылка на миниатюрное изображение постера к фильму'),
    movieId: Joi
      .string()
      .required()
      .label('id фильма'),
    nameRU: Joi
      .string()
      .required()
      .label('название фильма на русском языке'),
    nameEN: Joi
      .string()
      .required()
      .label('название фильма на английском языке'),
  }),
}, messages);

// валидация роута для удаления фильма пользователя;
const celebrateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}, messages);

module.exports = {
  celebrateCreateUser,
  celebrateLoginUser,
  celebrateUpdateUserProfile,
  celebrateDeleteMovie,
  celebrateCreateMovie,
};
