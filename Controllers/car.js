const db = require('../models/index');
const { Cars, Users } = db;

const getCars = (req, res, next) => {
    Cars.findAll({ include: Users})
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err))
}

const getCar = (req, res, next) => {
    const id = req.params.id;
    Cars.findOne({ where: { id }})
        .then(car => res.status(200).send(car))
        .catch(err => next(err));
}

const addCar = (req, res, next) => {
        Cars.create(req.body)
        .then(car => res.status(201).send("car Created"))
        .catch(err => next(err))     
}

const editCar = (req, res, next) => {
    const id = req.params.id;
    const newcar = req.body;
    console.log(newcar);
    Cars.update(newcar, { where: { id }})
        .then(car => res.status(200).send("car Updated"))
        .catch(err => next(err));
}

const deleteCar = (req, res, next) => {
    const id = req.params.id;
    Cars.destroy({ where: { id } })
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