const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    response: String,
});

const CommandModel = mongoose.model('command', commandSchema,);

module.exports = CommandModel; 