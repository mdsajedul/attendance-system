const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs')


const app = express();
app.use(express.json())

app.post('/register', async (req,res,next)=>{
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

})

app.post('/login',async (req,res,next)=>{
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
})

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({'message':"Server Error Occurred"})
})

connectDB('mongodb://localhost:27017/attendance-db').then(()=>{
    console.log('Database Connected');
    app.listen(4000,()=>{
        console.log('Server is running on PORT 4000');
    })
}).catch((e)=>console.log(e))