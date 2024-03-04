const mongoose=require('mongoose')
const Joi=require('joi');
const genreSchema=new mongoose.Schema({
    name:{type:String,required:true}
})
const Genre=mongoose.model('Genre',genreSchema);
function validategenre(genre){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        phone:Joi.string().min(5).required(),
        isGold:Joi.boolean()
    })
    return schema.validate(genre)
}
exports.Genre=Genre
exports.validate=validategenre