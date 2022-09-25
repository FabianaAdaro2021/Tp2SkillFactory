const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models").user;
const InvalidPasswordException = require("../exceptions/invalidPassword.exceptions");
const UserNotFoundException = require("../exceptions/userNotFound.exception");
const UserExistException= require("../exceptions/userExist.exception");
const EmailExistException = require("../exceptions/emailExist.exception");
const CuilExistException = require("../exceptions/cuilExist.exception");

function createToken(id) {
  const expirationTime = parseInt(process.env.JWT_EXPIRATION_TOKEN, 10);
  return jwt.sign({ userId: id }, process.env.JWT_ENCRYPTION_TOKEN, {
    expiresIn: expirationTime,
  });
}
async function login(username, password) {
  const user = await userModel.findOne({ where: { username } });
  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);
    if (isCorrect) {
      const token = createToken(user.id);
      delete user.dataValues.password;
      return { user, token };
    }
  }
  throw new InvalidPasswordException();
}

async function getOne(data) {
  return userModel.findOne({
    where: data,
    attributes: { exclude: ["password"] },
  });
}


async function edit(id, userData) {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: ['password'] }
  });

  if (!!user) {
    if (!!userData.email) {
      user.email = userData.email;
    }

    if (userData.phone_number) {
      user.phone_number = userData.phonenumber
    }

    if (userData.name) {
      user.name = userData.name;
    }
    if (userData.adress) {
      user.adress = userData.adress;
    }
    if (userData.cuil) {
      user.cuil = userData.cuil;
    }

    if (userData.lastname) {
      user.lastname = userData.lastname;
    }

    user.save();

    return user;
  }
  throw new UserNotFoundException();
}
 
async function newUser( username, password, name, lastname, email, phonenumber, cuil, adress,role) {
    const user = await userModel.findOne({ where: { username } });
    const emailvalid = await userModel.findOne({ where: { email } });
    const cuilvalid = await userModel.findOne({ where: { cuil } });
    if (!user){
      if (!emailvalid){
        if(!cuilvalid){
          password = bcrypt.hashSync(password, 10);
          const created = await userModel.create({  username, password, name, lastname, email, phonenumber, cuil, adress,role });
          return created;
        }
        throw new CuilExistException();
      }
      throw new EmailExistException();
    } 
    throw new UserExistException();
      
}
module.exports = {
  login,
  getOne,
  edit,
  newUser,
};