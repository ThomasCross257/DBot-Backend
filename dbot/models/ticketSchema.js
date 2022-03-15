const mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
        unique: true
    },
    serverID: {
        type: String, 
        require: true
    },
    problem: {
        type: String,
        default: 0,
        require: true
    },
    ticketID:{
        type: String, 
        default: 0,
    },
    resolved:{
        type: Boolean, 
        default: false
    },
    response:{
        type: String,
    }
});

var ticketModel = mongoose.model('UserTickets', ticketSchema,);

module.exports = ticketModel; 