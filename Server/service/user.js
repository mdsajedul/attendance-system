const User = require("../models/User")


const findUsers = ()=>{
    return User.find()
}

const findUserByProperty = (key,value)=>{
    if(key=== '_id'){
        return User.findById(value).exec()
    }
    return User.findOne({[key]: value}).exec()
}

const createNewUser = ({name, email, password, roles, accountStatus})=>{
    const user = new User({
        name, 
        email, 
        password, 
        roles: roles? roles : ['STUDENT'],
        accountStatus: accountStatus? accountStatus : 'PENDING'
    })
    return user.save()
}





module.exports = {
    findUserByProperty, createNewUser ,findUsers
}