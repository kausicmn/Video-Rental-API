const mongoose=require('mongoose');
const config=require('config')
module.exports=function(){mongoose.connect(config.get('db')).then(()=>console.log(`Connected to MongoDB...`)).catch((err)=>console.log(err))}