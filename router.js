const { application } = require('express');
const express = require('express')
const router = express.Router();
const usersController = require('./controllers/user.js')
const carsController = require('./controllers/car.js')
const errorHandler = require('./middlewares/errorHandler');

const bodyParser = require('body-parser')

const { checkAdmin, checkLoggedIn, checkLoggedUser,checkMail  } = require('./middlewares/checks')
const { editLoggedUser, editUser, deleteUser, findAllUsers, findUser, login, register } = require('./controllers/user');
const notFound = (error, req, res) => {
    res.send(error)
}

  router.use(bodyParser.json())

 router.post('/login', usersController.login)
 router.post('/register', usersController.register)
 
 /*router.get('/users',[checkLoggedIn] ,usersController.findAllUsers)
 router.get('/user', usersController.findUser)
 router.put('/editme', [checkLoggedUser], usersController.editLoggedUser)
 router.put('/user', [checkAdmin],usersController.editUser)
 router.delete('/user',[checkAdmin], usersController.deleteUser) 
  */
 router.get('/cars', carsController.getCars)
router.get('/cars/:id',carsController.getCar)
 router.put('/cars/:id', carsController.editCar)
 router.delete('/cars/:id', carsController.deleteCar)
 router.post('/car', carsController.addCar)
router.use(errorHandler.notFound);


module.exports = router;