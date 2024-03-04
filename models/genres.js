const mongoose=require('mongoose')
const Joi=require('joi');
const genreSchema=new mongoose.Schema({
    name:{type:String,required:true}
})
const Genre=mongoose.model('Genre',genreSchema);
function validategenre(genre){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
    })
    return schema.validate(genre)
}
exports.Genre=Genre
exports.genreSchema=genreSchema
exports.validate=validategenre