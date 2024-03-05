const { default: mongoose } = require('mongoose')
const winston=require('winston')
function error(err,req,res,next){
   // winston.log(err.message,err)
    return res.status(500).send('Something Failed')
}
module.exports=error