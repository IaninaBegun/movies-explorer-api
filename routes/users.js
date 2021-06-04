const router = require('express').Router();

// импорт контроллеров;
const { getMyProfile, updateUserInfo } = require('../controllers/users');

// импорт схем валидации celebrate;
const { celebrateUpdateUserProfile } = require('../middlewares/joiCelebrateSchemas');

// роут для получения информации о пользователе;
router.get('/users/me', getMyProfile);

// роут для изменения информации о пользователе;
router.patch('/users/me', celebrateUpdateUserProfile, updateUserInfo);

module.exports = router;
