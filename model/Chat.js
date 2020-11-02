const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    text: {
    type: String
    },
    sender: {
    type: String
        },
    room : String ,
    
    },
        {
    timestamps: true
})

const Chat = mongoose.model('Chat',ChatSchema)

module.exports = Chat;