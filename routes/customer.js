const express=require('express')
const router=express.Router()
const {Customer,validate}=require('../models/customer')


router.get('/',async(req,res)=>{
    const customer= await Customer.find().sort('name')
    res.send(customer)
})
router.get('/:id',async(req,res)=>{
    const customer=await Customer.findById(req.params.id)
    res.send(customer)
})
router.post('/',async(req,res)=>{
    const {error}=validate(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    const customer=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone,
    })
    res.send(await customer.save())
})
router.put('/:id',async(req,res)=>{
    const {error}=validate(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    let customer=await Customer.findByIdAndUpdate(req.params.id,{ isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone,},{new:true})
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        //const idx=genres.indexOf(genre)
        res.send(customer)
})
router.delete('/:id',async(req,res)=>{
    let customer=await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
        return res.status(404).send('Customer not found');
    }
    res.send(customer)
})

module.exports=router