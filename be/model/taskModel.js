const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title : 
        {
            type : String,
            required : true
        },

        note : 
        {
            type : String,
            required : true
        },

        completed : 
        {
            type : Boolean,
            default : false
        },

        createdBy : 
        {
            type : mongoose.Types.ObjectId,
            ref : 'User',
            required : true
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Task', taskSchema)