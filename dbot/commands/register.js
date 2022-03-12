const { SlashCommandBuilder } = require('@discordjs/builders');
const profileSchema = require('../models/profileSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register yourself with the points system'),
	async execute(interaction) {
        const UserIDComp = await profileSchema.find({userID: interaction.user.id});
            try{
                let newUser = await profileSchema.create({
                    userID: interaction.member.user.id,
                    serverID: interaction.guild.id,
                    experience: 0,
                    level: 1,
                });
                newUser.save(function(err){
                    if (err){ 
                        console.long(err);
                        console.log(interaction.id);
                        console.log(interaction.guild.id);
                        interaction.reply("Something went wrong with your registration.");
                    }
                    else{
                        interaction.reply("Successfully Registered!");
                    }
                });
            }
        catch(err){
            console.log(err);
            interaction.reply("Something went wrong with your registration, or you are already registered!");
         }
	},
};