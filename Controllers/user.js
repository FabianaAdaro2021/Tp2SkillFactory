
const db = require('../models/index');

const {user, cars} = db;




/* const getUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).send(users))
        .catch(err => next(err))
}
 */
  const getUsers = (req, res, next) => {
    user.findAll({ include: cars })
        .then(users => res.status(200).send(users))
        .catch(err => next(err))
}  

const getUser = (req, res, next) => {
    const id = req.params.id;
    user.findOne({ where: { id }, include: cars})
        .then(user => res.status(200).send(user))
        .catch(err => next(err));
}
 
 const addUser = (req, res, next) => {
        user.create(req.body)
        .then(user => res.status(201).send("User Created"))
        .catch(err => next(err))     
}

const editUser = (req, res, next) => {
    const id = req.params.id;
    const newUser = req.body;
    console.log(newUser);
    user.update(newUser, { where: { id }})
        .then(user => res.status(200).send("User Updated"))
        .catch(err => next(err));
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    user.destroy({ where: { id } })
        .then(users => res.status(200).send("User Destroyed"))
        .catch(err => next(err));
}

module.exports = {
    getUsers,
    
   getUser,
    editUser,
    deleteUser,
    addUser
}