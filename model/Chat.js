const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    text : String,
})

const Chat = mongoose.model('Chat',ChatSchema)

module.exports = Chat;