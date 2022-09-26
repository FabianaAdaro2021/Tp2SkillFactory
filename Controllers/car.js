const db = require('../models/index');
const { cars, user } = db;

//todos los autos
const getCars = (req, res, next) => {
    cars.findAll({ include: user})
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err))
}
//autos po id
const getCar = (req, res, next) => {
    const id = req.params.id;
    cars.findOne({ where: { id }})
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
}
//agrega un auto
const addCar = (req, res, next) => {
        cars.create(req.body)
        .then(car => res.status(201).send("car Created"))
        .catch(err => next(err))     
}
//edita un auto
const editCar = (req, res, next) => {
    const id = req.params.id;
    const newcar = req.body;
    console.log(newcar);
    cars.update(newcar, { where: { id }})
        .then(car => res.status(200).send("car Updated"))
        .catch(err => next(err));
}
//Elimina auto
const deleteCar = (req, res, next) => {
    const id = req.params.id;
    cars.destroy({ where: { id } })
        .then(() => res.status(200).send("car Destroyed"))
        .catch(err => next(err));
}

module.exports = {
    getCars,
    getCar,
    editCar,
    deleteCar,
    addCar
}