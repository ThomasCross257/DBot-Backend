const { SlashCommandBuilder } = require('@discordjs/builders');
const profileSchema = require('../models/profileSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register yourself with the points system'),
	async execute(interaction) {
        interaction.reply("Under construction!")
	},
};