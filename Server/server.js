const express = require('express');
const connectDB = require('./db');
const morgan = require('morgan');


const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(require('./routes/index')) //though we import index file so we can use routes only


app.use((err,req,res,next)=>{
    const message = err.message? err.message : 'Server Error Ocurred';
    const status = err.status? err.status : 500
    res.status(status).json({'message':message})
})

connectDB('mongodb://localhost:27017/attendance-db').then(()=>{
    console.log('Database Connected');
    app.listen(4000,()=>{
        console.log('Server is running on PORT 4000');
    })
}).catch((e)=>console.log(e))