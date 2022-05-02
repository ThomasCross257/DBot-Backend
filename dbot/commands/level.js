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
		const background = "https://cdn.discordapp.com/attachments/959575994371563620/964605963573289040/triangle-image.png"
		if (interaction.options.getUser('user') != null){
			var userLevel = interaction.options.getUser('user');
		}
		else{
			var userLevel = interaction.user;
		}
		var avatar = userLevel.avatarURL(true);
		avatar = avatar.replace('.webp','.png');
		console.log(avatar);
		console.log(typeof(userLevel));
		console.log(userLevel);
			profileModel.find({userID: userLevel.id}, (err, user) => { //err is just a placeholder.
				try{
					const exp = Number(user[0].experience); // Must use [0] to index schemas. Think of each one like you would the trivia API.
					console.log(exp);
					const levelScreen = new canvacord.Rank()
					.setAvatar(avatar)
					.setCurrentXP(exp)
					.setBackground("IMAGE", background)
					.setRequiredXP(500000)
					.setProgressBar("#FFFFFF", "COLOR")
					.setUsername(userLevel.username)
					.setDiscriminator(userLevel.discriminator);
					levelScreen.build().then(data => {
					const attachment = new MessageAttachment(data, "RankCard.png");
					interaction.reply({files: [attachment]});
					})
				}
				catch(error){
					console.log(error);
					try {
						console.log(userLevel.id);
						let newUser = profileModel.create({ // Potential security vulnerability. 
							userID: userLevel.id, // Will register any user with the database with a slash command call.
							serverID: interaction.guild.id, // Works if someone decides to use it themselves or if another user wants to know their level.
							experience: 0,
							level: 1,
						})

						interaction.reply({content: "You, or the person that you tried to look at wasn't registered, but you or they are now! Try this command again.", ephemeral: true});

					}
					catch(err){
						console.log(err);
					interaction.reply("You weren't registered so I tried to register you, but it didn't work. Try again later!");
					}
				}
			});
		}
	}