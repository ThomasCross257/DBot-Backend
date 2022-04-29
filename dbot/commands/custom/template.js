const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('demo')
		.setDescription('PLACEHOLDER'),
	async execute(interaction) {
		await interaction.reply('Template. If you are seeing this, you should probably contact a developer.');
	},
};