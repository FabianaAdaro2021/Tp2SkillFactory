const Express = require('express');
const Passport = require('passport');
const userController = require('../controllers/user');
require('../middlewares/passport.middleware')(Passport);
const UserValidator = require('../middlewares/validations/users/user.validations.middleware');
const Validator = require('../middlewares/validation.middleware');

const app = Express();

app.post('/login', [
  UserValidator.validate('login'),
  Validator.checkValidationResult
],
  userController.login
);

// users/info/1
app.get('/info/:id', [
  //Passport.authenticate('jwt', { session: false }),
],
  userController.userInfo
);

// users/edit/1
app.put('/edit/:id', [
  UserValidator.validate('editar'),
  Validator.checkValidationResult
],
  userController.editUser
);


//user/new
app.post('/new', [
  UserValidator.validate('register'),
  Validator.checkValidationResult
], 
  userController.createUser
);

module.exports = app;
