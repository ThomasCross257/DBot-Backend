const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Show user level'),
	async execute(interaction) {
		await interaction.reply('Work in progress!');
	},
};