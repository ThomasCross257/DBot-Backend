const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register yourself with the points system'),
	async execute(interaction) {
        const UserIDComp = await profileModel.find({userID: interaction.user.id});
        console.log(UserIDComp);
        try {
            console.log(interaction.member.user.id);
            let newUser = await profileModel.create({
                userID: interaction.member.user.id,
                serverID: interaction.guild.id,
                experience: 0,
                level: 1,
            });
            newUser.save(function(err){
            if (err) { 
                console.long(err);
                console.log(interaction.id);
                console.log(interaction.guild.id);
                interaction.reply("Something went wrong with your registration.");
            }
            else {
                interaction.reply("Successfully Registered!");
            }});
        }
        catch(err){
        console.log(err);
        interaction.reply("Something went wrong with your registration, or you are already registered!");
        }
	},
};