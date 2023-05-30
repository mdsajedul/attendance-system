const User = require("../models/User")
const bcrypt = require('bcryptjs')



const registerController = async (req,res,next)=>{
    const {name,email,password,accountStatus} = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: 'Invalid Data'})
    }

    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:'User already exist'})
        }
    
        user = new User({name,email,password,accountStatus});
    
        const salt  = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt);
        user.password = hash
    
    
        await user.save()
    
        res.status(201).json({message:'User Created Successfully',user})
    } catch (error) {
        next(error)
    }

}

const loginController = async (req,res,next)=>{
    const {email,password} = req.body
    
    try {
        const user = await User.findOne({email})
        console.log(user);
        if(!user){
            return res.status(400).json({message:'Invalid Credential'})
        }

        const isMatch  = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credential'})
        }

        delete user._doc.password;
        res.status(200).json({message:'Login Successfull',user})

    } catch (error) {
        next(e)
    }
}

module.exports = {
    loginController, registerController
}