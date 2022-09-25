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
                res.status(404).json({msg:"Usuario no encontrado"});

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
        user.findAll({include:cars})
        .then(cars => res.status(200).send(cars))
        .catch(err => next(err))        
     },
       
    
           
    //usuario por Id
    findUser (req, res, next) {
        const id = req.params.id;
        user.findOne({ where: { id }})
            .then(user => res.status(200).send(user))
            .catch(err => next(err));
    },
    //edita usuario admin
    editUser  (req, res, next)  {
        const id = req.params.id;
        const newuser = req.body;        
        user.update(newuser, { where: { id }})
            .then(user => res.status(200).send("user Updated"))
            .catch(err => next(err));
    },

     //edita usuario registrado
     editUserLogged (req, res, next)  {
        const id = req.params.id;
        const newuser = req.body;        
        user.update(newuser, { where: { id }})
            .then(user => res.status(200).send("user Updated"))
            .catch(err => next(err));
    },

    //elimina ususario
    deleteUser  (req, res, next)  {
        const id = req.params.id;
    user.destroy({ where: { id } })
        .then(() => res.status(200).send("user Destroyed"))
        .catch(err => next(err));
        
    },
       }

