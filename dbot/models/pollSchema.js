const mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
        unique: true
    },
    pollID: {
        type: Number, 
        default: Math.floor(Math.random() *  100000),
    },
    serverID: {
        type: String, 
        require: true
    },
    pollOptions: {
        type: Number, 
        default: 2,
        require: true
    },
    option1: {
        type: Number, 
        default: 0,
        require: true
    },
    option2: {
        type: Number, 
        default: 0,
        require: true
    },
    option3: {
        type: Number, 
        default: 0
    },
    option4: {
        type: Number, 
        default: 0
    },
});

var pollModel = mongoose.model('UserPolls', pollSchema,);

module.exports = pollModel; 