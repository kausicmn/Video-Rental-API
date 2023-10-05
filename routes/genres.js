const express=require('express')
const router=express.Router()
const genres=[
    {id:1,name:'Action'},
    {id:2,name:'Horror'},
    {id:3,name:'Thriller'},
    {id:4,name:'Comedy'}
]

// get

router.get('/',(req,res)=>{
    res.send(genres);
})

router.get('/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    res.send(genre);
})

// post 

router.post('/',(req,res)=>{
    const {error}=validategenre(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    const genre={
        id:genres.length+1,
        name:req.body.name
    }
    genres.push(genre)
    res.send(genre)

})

// put 

router.put('/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    const {error}=validategenre(req.body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }
    const idx=genres.indexOf(genre)
    genres[idx].name=req.body.name
    res.send(genre)
})


// delete
router.delete('/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('Genre not found');
    }
    const idx=genres.indexOf(genre);
    genres.splice(idx,1);
    console.log(genres.length)
    res.send(genre);
})


function validategenre(genre){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

module.exports=router