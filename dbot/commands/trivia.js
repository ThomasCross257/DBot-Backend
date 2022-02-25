const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Posts a random trivia question!'),
	async execute(interaction) {
		await interaction.reply('This command is currently under development.');
	},
};