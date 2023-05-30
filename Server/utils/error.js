
const error =(message='Something went wrong',status=500)=>{
    const e = new Error(message);
    e.status = status;
    return e
}

module.exports = error