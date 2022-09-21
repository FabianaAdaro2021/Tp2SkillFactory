const { application } = require('express');
const express = require('express')
const router = express.Router();
//const usersController = require('./controllers/user.js')
//const carsController = require('./controllers/car.js')
//const errorHandler = require('./middlewares/errorHandler');
//const { checkMail } = require('./middlewares/checks')
//const bodyParser = require('body-parser')


// router.use(bodyParser.json())
// router.get('/users', usersController.getUsers)
// router.get('/users/:id',usersController.getUser)
// router.put('/users/:id', usersController.editUser)
// router.delete('/users/:id', usersController.deleteUser)
// router.post('/user', [checkMail], usersController.addUser)
// router.get('/cars', carsController.getCars)
// router.get('/cars/:id',carsController.getCar)
// router.put('/cars/:id', carsController.editCar)
// router.delete('/cars/:id', carsController.deleteCar)
// router.post('/car', carsController.addCar)
// router.use(errorHandler.notFound);

router.use(function TimeLog(req, res, next){
   const requestTime = Date.now();
    next();
});

// app.use(requesTime);
router.get('/', function(req, res, next){
    
    res.send(req.requestTime);
});

router.get('/Carlos',(req,res)=>{
    
    console.log(req.query);
    res.send(' Carlos es un buen Pibe!!');
    });






module.exports = router;