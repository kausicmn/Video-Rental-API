var express=require('express');
const wiston=require('winston')
require('winston-mongodb')
require('express-async-errors')
const app=express()
require('./startup/validation')();
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
//app.use(error)
const port=process.env.PORT||3000
const server=app.listen(port,()=>console.log(`Listening on Port ${port}...`));
module.exports=server

