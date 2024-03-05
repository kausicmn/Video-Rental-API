const error=require('../middleware/error')
const genres=require('../routes/genres')
const movies=require('../routes/movies')
const customer=require('../routes/customer')
const rental=require('../routes/rentals')
const user=require('../routes/users')
const auth=require('../routes/auth');
const returns=require('../routes/returns')
var express=require('express');
module.exports=function(app){
    app.use(express.json())
    app.use('/api/genres',genres);
    app.use('/api/customer',customer)
    app.use('/api/movies',movies)
    app.use('/api/rentals',rental)
    app.use('/api/users',user)
    app.use('/api/auth',auth)
    app.use('/api/returns',returns)
    app.use(error)
}