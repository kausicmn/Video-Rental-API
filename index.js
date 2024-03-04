var express=require('express');
const mongoose=require('mongoose');
const app=express()
const Joi=require('joi');
const genres=require('./routes/genres')
const customer=require('./routes/customer')
mongoose.connect('mongodb://localhost/video-rental-api').then(()=>console.log('Connected to MongoDB...')).catch((err)=>console.log(err))
app.use(express.json())
app.use('/api/genres',genres);
app.use('/api/customer',customer)
const port=process.env.PORT||3000
app.listen(port,()=>console.log(`Listening on Port ${port}...`));


