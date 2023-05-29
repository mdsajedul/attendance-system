const mongoose = require('mongoose')

function connectDB (connectionString){
    return mongoose.connect(connectionString)
}
module.exports = connectDB