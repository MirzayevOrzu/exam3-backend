const db = require("../db");

exports.findData = async(t_name , id) =>{
   const finded =  await db(t_name).where({id}).first()

   if(finded){
       return true
   }
else{
    return false
}

}