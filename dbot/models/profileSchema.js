const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
        unique: true
    },
    serverID: {
        type: String, 
        require: true
    },
    experience: {
        type: Number, 
        default: 0
    },
    level: {
        type: Number, 
        default: 1
    },
});

var profileModel = mongoose.model('UserProfile', profileSchema,);

module.exports = profileModel; 