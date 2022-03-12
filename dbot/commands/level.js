const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
/*
const mongoose = require('mongoose');
const profileSchema = require('../models/profileSchema')
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Show user level')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('Show specific user level')
				.setRequired(false)),
	async execute(interaction) {
		console.log(interaction)
		const avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
/*
		Oddly enough, the registration command logs my account and the exact tag into the database, though it doesn't seem to see the registered schema for it.
		const User = mongoose.model(interaction.member.user.id);

		const query = User.findOne({userID: User});

		console.log(query);
*/
		const levelScreen = new canvacord.Rank()
			.setAvatar(avatar)
			.setCurrentXP(1)
			.setRequiredXP(500)
			.setProgressBar("#FFFFFF", "COLOR")
			.setUsername(interaction.user.username)
			.setDiscriminator(interaction.member.user.discriminator);
		levelScreen.build().then(data =>{
			const attachment = new MessageAttachment(data, "RankCard.png");
			interaction.reply({files: [attachment]});
		})	
	},
};