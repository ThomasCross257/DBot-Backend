const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const mongoose = require('mongoose');
const profileModel = require('../models/profileSchema');
const { use } = require('passport');
pfSel = 0
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
				
						profileModel.find({userID: interaction.user.id}, (err, user) => { //err is just a placeholder.
							try{
								const exp = Number(user[0].experience); // Must use [0] to index schemas. Think of each one like you would the trivia API.
								const pfSelection = Number(user[0].pfSelection);
								var setBackground = "https://cdn.discordapp.com/attachments/959575994371563620/964605963573289040/triangle-image.png"

								if(pfSelection == 0)
									setBackground = "https://cdn.discordapp.com/attachments/959575994371563620/964605963573289040/triangle-image.png"
								if(pfSelection == 1)
									setBackground = "https://cdn.discordapp.com/attachments/955663944545083494/972014905370771456/star-background.jpg"
								if(pfSelection == 2)
									setBackground = "https://cdn.discordapp.com/attachments/955663944545083494/972014920658997268/cloudysky.png"
								if(pfSelection == 3)
									setBackground = "https://cdn.discordapp.com/attachments/955663944545083494/972014954498629652/cityscape.png"


								console.log(exp);
								const levelScreen = new canvacord.Rank()
								.setAvatar(avatar)
								.setCurrentXP(exp)
								.setBackground("IMAGE", setBackground)
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
										pfSelection: 0,
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
		
	
