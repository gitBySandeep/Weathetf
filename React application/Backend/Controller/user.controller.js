import User from "../Model/user.model.js";
import { Result, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const signUp = (request,response,next)=>{
    let error = validationResult(request)
    if(!error.isEmpty())
        return response.status(401).json({Error:error})

    User.create({
        name:request.body.name,
        email:request.body.email,
        password:request.body.password
    })
    .then((result)=>{
        return response.status(200).json({message:"User SignUp Successfully....",user:result})
    }).catch((err)=>{
        return response.status(401).json({message:"User not SignUp"});
    })
}

export const signIn = async(request,response,next)=>{
    
    let email = request.body.email;
    let password = request.body.password;

    let user = await User.findOne({where:{email},raw:true}); 
    if(user){
        if(await User.checkPass(password,user.password)){
            let payload = { subject: email };
            let token = jwt.sign(payload, 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj');
            return response.status(200).json({message:"Sign in Successfully",user,token:token});
        }else{
            return response.status(401).json({message:"unathorized user access"});
        }
    }
    // console.log(error);
        return response.status(401).json({message:"Unauthorized User"});
}