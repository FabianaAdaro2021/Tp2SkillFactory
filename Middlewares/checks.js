const { validateEmail } = require('../helpers/helpers');
const jwt = require('jsonwebtoken');

const checkMail = (req, res, next) => {
    if(validateEmail(req.body.email)) {
        next();
    } else {
        const error = new Error("correo incorrecto");
        error.status = 400;
        next(error);
    }
}



const checkLoggedIn = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true})
    if(!decoded) {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        next()    
    }
}

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true})
    if(!decoded || decoded.payload.user.role !== 'ADMIN') {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        next()    
    }
}

const checkLoggedUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.decode(token, {complete: true});
    if(!decoded) {
        const e = new Error("No se permite")
        next(e)
    }
    else {
        req.user = decoded.payload.user
        next()    
    }
}

module.exports = {
    checkAdmin,
    checkLoggedIn,
    checkLoggedUser,
    checkMail
}
