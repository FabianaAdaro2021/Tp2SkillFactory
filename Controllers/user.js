const db = require('../models/index');
const { cars, user } = db;
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const authConfig = require ('../config/auth')

module.exports = {
    //Login
    login (req,res){

    },

    //Registro
    register (req,res){
        // encriptamos contraseña
       let password= bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.round ));

       //Crear un usuario
       user.create({
        name: req.body.name,
        lastname: req.body.lastname,
        password: password,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role
       }).then (user =>{

        //creamos el token
          let token = jwt.sign ({ user: user}, authConfig.secret,{
            expiresIn: authConfig.expires
          });
          res.json ({
            user: user,
            token : token

            });

       }). catch(err =>{
        res.status(500).json(err)
       });
    }
}
