const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns list of commands or their description.'),
    async execute(interaction) {
        interaction.reply('Currently being implemented.')
    }
}