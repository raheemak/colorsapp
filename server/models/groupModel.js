const mongoose = require('mongoose')


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: [true, "group must have a name"],
        unique: true
    },
    users: [{
        userName: {
            type: String,
            required: [true, "user must have a name"],
            unique: true
        },
        userColor: {
            type: String,
            required: [true, "user must have a color"],
            lowercase: true
        }
    }]
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group; 

