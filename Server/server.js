const express = require('express');
const connectDB = require('./db');



const app = express();
app.use(express.json())
app.use(require('./routes')) //though we import index file so we can use routes only



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