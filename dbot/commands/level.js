const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const mongoose = require('mongoose');
const profileModel = require('../models/profileSchema')


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
		const background = "https://cdn.discordapp.com/attachments/952666801077108916/952666810501705788/Default_Level.png"
		try{
			profileModel.find({userID: interaction.user.id}, (err, user) => {
				if(err) {
					return interaction.reply("User not found! Are you registered?");
				} else {
					const level = Number(user.level);
					const exp = Number(user.experience);
					const levelScreen = new canvacord.Rank()
					.setAvatar(avatar)
					.setCurrentXP(exp)
					.setLevel(level)
					.setBackground("IMAGE", background)
					.setRequiredXP(500)
					.setProgressBar("#FFFFFF", "COLOR")
					.setUsername(interaction.user.username)
					.setDiscriminator(interaction.member.user.discriminator);
					levelScreen.build().then(data => {
						const attachment = new MessageAttachment(data, "RankCard.png");
						interaction.reply({files: [attachment]});
					})
				}
			});

		}
		catch (err) {
			interaction.reply("Error trying to retrieve level! Make sure you're registered with the bot.")
		}

		
	},
};

/*
console.log(res[0].toObject());
				console.log("-----------------");
				var LVL = Number(res[0].toObject().level);
				var EXP = Number(res[0].toObject().experience)
				const levelScreen = new canvacord.Rank()
					.setAvatar(avatar)
					.setCurrentXP(EXP)
					.setLevel(LVL)
					.setBackground("IMAGE", background)
					.setRequiredXP(500)
					.setProgressBar("#FFFFFF", "COLOR")
					.setUsername(interaction.user.username)
					.setDiscriminator(interaction.member.user.discriminator);
				levelScreen.build().then(data =>{
				const attachment = new MessageAttachment(data, "RankCard.png");
				interaction.reply({files: [attachment]});
*/