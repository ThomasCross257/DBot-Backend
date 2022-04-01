const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    serverID: {
        type: String, 
        require: true,
        unique: true
    },
    experience: {
        type: Number, 
        default: 0
    },
    level: {
        type: Number, 
        default: 1
    },
    roles:{
        type: Object,
        require: true,
    }
});

const roleModel = mongoose.model('ReactRoleServers', roleSchema);

module.exports = roleModel; 