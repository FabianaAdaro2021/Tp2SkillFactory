const userService = require('../services/user.services');


async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userService.login(username, password);

    res.json(user);
  } catch (error) {
    next(error);
  }
}


async function userInfo(req, res, next) {
  try {
    const { id } = req.params;
    const userData = await userService.getOne({
      id,
    });
    res.json(userData);
  } catch (error) {
    next(error);
  }
}


async function editUser(req, res, next) {
  try {
    const { id } = req.params;
    const {
        name, lastname, email, phonenumber, cuil, adress
    } = req.body;

    const userData = await userService.edit(id, {
        name, lastname, email, phonenumber, cuil, adress
    });
    res.json(userData)
    .status(201)
    .json({ success: true, message: 'El usuario ha sido editado correctamente' });;
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { username, password, name, lastname, email, phonenumber, cuil, adress,role} = req.body;
    const created = await userService.newUser(username, password, name, lastname, email, phonenumber, cuil, adress,role );
    if (created) {
      res
        .status(201)
        .json({ success: true, message: 'El usuario ha sido creado correctamente' });
    }
  } catch (error) {
    next(error);
  }
 
}

module.exports = {
  login,
  userInfo,
  editUser,
  createUser,
};