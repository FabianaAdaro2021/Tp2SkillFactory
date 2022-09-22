const express = require('express');
const router = require('./router')
//require("dotenv").config()
const app = express();
const port = 3000;
//const Sequelize = require("sequelize");
//const { errorLogger, errorParser } = require('./middlewares/errorHandler')

//console.log(process.env.DATABASE_NAME)
//app.use('/', router);
//app.use([errorLogger, errorParser])

 // const requestTime = function(req, res, next) {
  // req.requestTime = Date.now();
  // next();
  //}
   // app.use(requestTime);

   //app.use('/',function(req, res){
   // var responseText = "Hello World !!!"
   // responseText += 'Requested at:' + req.requestTime + '';
   // res.send(responseText);
  //});

 //app.get('/Carlos',(req,res)=>{
 // res.send('Hola Mundo!')
 //});

 app.use('/', router);

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
});
  