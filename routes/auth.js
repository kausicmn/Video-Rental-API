const express=require('express')
const config=require('config')
const jwt= require('jsonwebtoken')
const router=express.Router()
const bcrypt=require('bcrypt')
const Joi=require('joi')
const _ = require('lodash')
const {User}=require('../models/user')
// get

router.post('/',async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    let user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')
    const vaildpassword= await bcrypt.compare(req.body.password,user.password)
    if(!vaildpassword) return res.status(400).send('Invalid email or password')
    const token=user.generateAuthToken()
     res.send(token)
})
function validate(user){
    const schema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
    })
    return schema.validate(user)
}
module.exports=router