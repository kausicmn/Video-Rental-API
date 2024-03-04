const express=require('express')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
const router=express.Router()
const {Genre,validate}=require('../models/genres')
// get
 function asyncMiddleware(handler){
        return async (req,res,next)=>{
            try {
                await handler(req,res);
            }
            catch(ex){
                next(ex)
            }

    }
}
router.get('/',asyncMiddleware(async (req,res,next)=>{
        const genres=await Genre.find().sort('name')
        res.send(genres);
    }
))

router.get('/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id)
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    res.send(genre);
})

// post 

router.post('/',auth,async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    const genre=new Genre({
        name:req.body.name
    })
    const result=await genre.save();
    res.send(result);

})

// put 

router.put('/:id',async (req,res)=>{
    const {error}=validate(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    //const idx=genres.indexOf(genre)
    res.send(genre)
})


// delete
router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre= await Genre.findByIdAndDelete(req.params.id);
    if(!genre) {
        return res.status(404).send('Genre not found');
    }
    res.send(genre);
})


module.exports=router