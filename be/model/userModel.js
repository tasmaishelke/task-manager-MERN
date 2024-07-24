const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username : 
        {
            type : String,
            required : [true, 'Please Provide a name'],
            minlength : 3,
            maxlength : 30,
        },

        email : 
        {
            type : String,
            required : [true, 'Please Provide a email'],
            match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
            unique : true
        },
        
        password : 
        {
            type : String,
            required : [true, 'Please Provide a password'],
            minlength : 3,
        }
    }
)

module.exports = mongoose.model('User', userSchema)