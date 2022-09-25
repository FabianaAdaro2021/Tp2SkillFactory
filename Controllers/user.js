const db = require('../models/index');
const { cars, user } = db;
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const authConfig = require ('../config/auth')

module.exports = {
    //Login
    login (req,res){
        let { email, password} = req.body;

        //Buscar usuario
        user.findOne ({
            where:{
                email:email
            }
        }).then ( user=>{
            if(!user){
                res.status(404).json({msg:"Ususario con correo no encontrado"});

            } else{
                if(bcrypt.compareSync(password,user.password)){
                     //creamos el token
          let token = jwt.sign ({ user: user}, authConfig.secret,{
            expiresIn: authConfig.expires
          });
          res.json ({
            user: user,
            token : token

            });
                }else{
                    //unauthorized Access
                    res.status(401).json({msg:"contraseña incorrecta"})
                }
            }
        }).catch(err =>{
            res.status(500).json(err);
        })

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
    },
    //todos los usuarios
    findAllUsers  (req, res, next) {
        user.find({}, (err, user) => {
            if(err) next(err);
            else {
                res.status(200).send(user)
            }
        })    
    },
    
    findUser (req, res, next) {
        user.findOne(req.body, (err, user) => {
            if(err) next(err);
            else {
                res.status(200).send(user)
            }
        })
    },
    //edita usuario
    editUser  (req, res, next)  {
        const { filter, changes } = req.body;
        user.findOneAndUpdate(filter, changes, (err, user) => {
            if(err) next(err);
            else {
                res.status(200).send(user)
            }
        })
    },
    //elimina ususario
    deleteUser  (req, res, next)  {
        User.findOneAndRemove(req.body, (err, user) => {
            if(err) next(err);
            else {
                res.status(200).send(user)
            }
        })
    },
    //se edita asi mismo
    editLoggedUser  (req, res, next)  {
        const changes = req.body;
        User.findOneAndUpdate({ _id: req.user._id }, changes, (err, user) => {
            if(err) next(err);
            else {
                res.status(200).send(user)
            }
        })
    }
}
