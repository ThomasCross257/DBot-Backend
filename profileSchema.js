const mongoose = require('mongoose');

// Avoid using var
const profileSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
    },
    serverID: {
        type: String, 
        require: true
    },
    experience: {
        type: Number, 
        default: 0
    },
    pfSelection: {
        type: Number,
        default: 0
    },
});

const profileModel = mongoose.model('pointusers', profileSchema);

module.exports = profileModel; 