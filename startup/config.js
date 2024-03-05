const config=require('config')
module.exports=function(){
    if(!config.get('jwtprivatekey'))
{
    console.log('FATAL ERROR:jwtprivatekey not defined')
    process.exit(1)
}
}