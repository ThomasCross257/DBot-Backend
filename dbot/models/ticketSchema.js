const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true
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
        unique: true,
    },
    resolved:{
        type: Boolean, 
        default: false
    },
    response:{
        type: String,
        default: "Developer has not responded to this ticket yet."
    }
});

var ticketModel = mongoose.model('UserTickets', ticketSchema,);

module.exports = ticketModel; 