const bcrypt = require('bcryptjs');
const { findUserByProperty, createNewUser } = require("./user");
const jwt = require('jsonwebtoken');
const error = require('../utils/error');

/**
 * registerService
 * @param {name,email,password} 
 * @returns 
 */
const registerService =async ({name,email,password,roles, accountStatus})=>{
    
    let user = await findUserByProperty('email',email)
    if(user) throw error('User already exist',400)

    const salt  = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt);

    return createNewUser({name, email, password:hash, roles, accountStatus})   
}


/**
 * loginService
 * @param { email,password} 
 * @returns 
 */
const loginService =async ({email,password})=>{
    
    const user =await findUserByProperty('email',email)
    if(!user) throw error('Invalid Credential',400)
   
    const isMatch  = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw error('Invalid Credential',400)
    }
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
        roles:user.roles,
        accountStatus: user.accountStatus,
    }
    return jwt.sign(payload, 'sajedul', {expiresIn:'30s'})
}

module.exports = {
    loginService, registerService
}