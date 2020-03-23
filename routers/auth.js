let express = require('express');
let User = require('../modules/userModule').User;
let Joi = require('joi');
let bcrypt = require('bcrypt');
let router = express.Router();

router.post('/',async (req,res)=>{
    /*
    1- validate
    2- check email
    3- hash pass
    4 - check pass
    5- send header
    */
   let {error} = LoginValidate(req.body);
   if(error)
   {
       return res.send(error.details[0].message);
   }
   let userFound =await User.findOne({email:req.body.email});
   if(!userFound)
   {
      return res.status(400).send('Invalid UserName Or Password')
   }
   let validPass =await bcrypt.compare(req.body.password , userFound.password);
   if(!validPass)
   {
      return res.status(400).send('Invalid UserName Or Password')
   }
   res.header('x-auth-token' , userFound.createToken()).send('You Loged in Successfully');
})

function LoginValidate(req)
{
    let logSchema ={
        email:Joi.string().min(5).max(100).required().email()
        ,password:Joi.string().min(5).max(100).required()
    }
    return Joi.validate(req , logSchema);
}

module.exports = router;