var express=require('express');
const config=require('config')
const mongoose=require('mongoose');
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const app=express()
const error=require('./middleware/error')
const genres=require('./routes/genres')
const movies=require('./routes/movies')
const customer=require('./routes/customer')
const rental=require('./routes/rentals')
const user=require('./routes/users')
const auth=require('./routes/auth')
mongoose.connect('mongodb://localhost/video-rental-api').then(()=>console.log('Connected to MongoDB...')).catch((err)=>console.log(err))
app.use(express.json())
if(!config.get('jwtprivatekey'))
{
    console.log('FATAL ERROR:jwtprivatekey not defined')
    process.exit(1)
}
app.use('/api/genres',genres);
app.use('/api/customer',customer)
app.use('/api/movies',movies)
app.use('/api/rentals',rental)
app.use('/api/users',user)
app.use('/api/auth',auth)
app.use(error)
const port=process.env.PORT||3000
app.listen(port,()=>console.log(`Listening on Port ${port}...`));


