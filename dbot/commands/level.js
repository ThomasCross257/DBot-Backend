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
		var avatar = interaction.user.avatarURL(true);
		avatar = avatar.replace('.webp','.png'); // Shoddy method of avoiding errors with image types. Necessary since avatarURL doesn't use
		console.log(avatar);
		const background = "https://cdn.discordapp.com/attachments/959575994371563620/964605963573289040/triangle-image.png"
			profileModel.find({userID: interaction.user.id}, (err, user) => { //err is just a placeholder.
				try{
					const exp = Number(user[0].experience); // Must use [0] to index schemas. Think of each one like you would the trivia API.
					console.log(exp);
					const levelScreen = new canvacord.Rank()
					.setAvatar(avatar)
					.setCurrentXP(exp)
					.setBackground("IMAGE", background)
					.setRequiredXP(500000)
					.setProgressBar("#FFFFFF", "COLOR")
					.setUsername(interaction.user.username)
					.setDiscriminator(interaction.member.user.discriminator);
					levelScreen.build().then(data => {
					const attachment = new MessageAttachment(data, "RankCard.png");
					interaction.reply({files: [attachment]});
					})
				}
				catch(error){
					console.log(error);
					try {
						console.log(interaction.member.user.id);
						let newUser = profileModel.create({
							userID: interaction.member.user.id,
							serverID: interaction.guild.id,
							experience: 0,
							level: 1,
						})

						interaction.reply("You weren't registered, but you are now! Try this command again.");

					}
					catch(err){
						console.log(err);
					interaction.reply("You weren't registered so I tried to register you, but it didn't work. Try again later!");
					}
				}
			});
		}
	}