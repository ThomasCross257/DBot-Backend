const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears specified messages in active channel'),
	async execute(interaction) {
		await interaction.reply('Currently Under development.');
	},
};