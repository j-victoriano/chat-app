const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    chatName: {
        type: String,
        required: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
});

const GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChat;
