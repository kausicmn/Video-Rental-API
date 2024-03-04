var express=require('express');
const mongoose=require('mongoose');
const Joi=require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const app=express()
const Joi=require('joi');
const genres=require('./routes/genres')
const movies=require('./routes/movies')
const customer=require('./routes/customer')
const rental=require('./routes/rentals')
mongoose.connect('mongodb://localhost/video-rental-api').then(()=>console.log('Connected to MongoDB...')).catch((err)=>console.log(err))
app.use(express.json())
app.use('/api/genres',genres);
app.use('/api/customer',customer)
app.use('/api/movies',movies)
app.use('/api/rentals',rental)
const port=process.env.PORT||3000
app.listen(port,()=>console.log(`Listening on Port ${port}...`));


