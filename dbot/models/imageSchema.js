const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    userID: {
        type: String, 
        require: true, 
        unique: true
    },
    imageLink: {
        type: String, 
        require: true
    },
    serverID: {
        type: String, 
        require: true
    },
    imageID: {
        type: Number, 
        default: Math.floor(Math.random() *  1000),
    },
});

var imageModel = mongoose.model('UserCaptions', imageSchema,);

module.exports = imageModel; 