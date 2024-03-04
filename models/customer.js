const mongoose=require('mongoose')
const Joi=require('joi');
const customerschema=new mongoose.Schema({
    isGold:{type:Boolean,default:false,minlength:5},
    name:{type:String,required:true},
    phone:{type:String,required:true,minlength:5}
})
const Customer=mongoose.model('Customer',customerschema)
function validatecustomer(customer){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        phone:Joi.string().min(5).required(),
        isGold:Joi.boolean()
    })
    return schema.validate(customer)
}
exports.Customer=Customer
exports.validate=validatecustomer