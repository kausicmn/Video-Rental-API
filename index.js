var express=require('express');
const app=express()
const Joi=require('joi');
app.use(express.json())
const genres=[
    {id:1,name:'Action'},
    {id:2,name:'Horror'},
    {id:3,name:'Thriller'},
    {id:4,name:'Comedy'}
]

// get

app.get('/api/genres',(req,res)=>{
    res.send(genres);
})

app.get('/api/genres/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('Genre not found');
    }
    res.send(genre);
})

// post 

app.post('/api/genres',(req,res)=>{
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

app.put('/api/genres/:id',(req,res)=>{
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
app.delete('/api/genres/:id',(req,res)=>{
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
const port=process.env.PORT||3000
app.listen(port,()=>console.log(`Listening on Port ${port}...`));


