const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('[DEV] Adds experience points to user'),
	async execute(interaction) {
        try{
            profileModel.updateOne({userID: interaction.user.id,},
                {$inc: {experience: 10}}).exec();
            
            console.log(profileModel.find({userID: interaction.user.id}).exec());
            interaction.reply("Points deposited.");
        }
        catch(error){
            console.log(error);
        }
	},
};