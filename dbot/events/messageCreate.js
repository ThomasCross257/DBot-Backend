const CommandModel = require("../models/command_schema");

module.exports = {
    name: 'messageCreate',
    async execute(msg) {
        if(!msg.content.startsWith('$') || msg.author.bot) return;
        //Might want to timeout this bottom part
        // or else something is going to explode 
        // but its 4:32am and  I simply lack the brain cells to do so
        const args = msg.content.slice(1).split(/ +/);
        const commands = await CommandModel.find({id: msg.guildId})
        if(commands !== undefined || commands.length != 0) {
            commands.forEach(cmd => {
                if(args[0] == cmd.name) {
                    return msg.reply(cmd.response);
                }
            });
        }
        console.log(msg.content);
    }
}