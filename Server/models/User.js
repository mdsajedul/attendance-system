const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: (prop)=> `Invalid email: ${prop.value}`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password is too short']
    },
    role: {
        type: [String],
        required: true,
        default: ['STUDENT'],
    },
    accountStatus: {
        type: String,
        enum: ['PENDING','ACTIVE','REJECTED'],
        default: 'PENDING',
        required: true
    }
})

const User = model('User',userSchema);
module.exports = User