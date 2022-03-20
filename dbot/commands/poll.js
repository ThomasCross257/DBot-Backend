const { SlashCommandBuilder } = require('@discordjs/builders');
const { options } = require('request');
const {pollEmbedGen, pollButtonsGen} = require('../embeds/pollEmbeds')
const pollModel = require('../models/pollSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll')
        .addStringOption(option =>                                               
            option.setName('title')
                .setDescription('Title of the poll')
                .setRequired(true))
        .addStringOption(option =>                                               
            option.setName('option1')
                .setDescription('First option')
                .setRequired(true))
        .addStringOption(option =>                                               
            option.setName('option2')
                .setDescription('Second option')
                .setRequired(true))
        .addStringOption(option =>                                               
            option.setName('option3')
                .setDescription('Third option')
                .setRequired(false))
        .addStringOption(option =>                                               
            option.setName('option4')
                .setDescription('Fourth option')
                .setRequired(false)),
	async execute(interaction) {
		const title = interaction.options.getString('title');
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3');
        const option4 = interaction.options.getString('option4');
     
        try{

            pollModel.create({
                userID: interaction.member.user.id, 
                pollID: interaction.id, //Interaction IDs are always unique and won't run into the possible issue of using math floor.
                serverID: interaction.guild.id,
                });
            pollModel.find({pollID: interaction.id }, (res) => {
                console.log(res);
                const pollEmbed = pollEmbedGen(option1, option2, option3, option4, title, interaction.id);
                const pollButtons = pollButtonsGen(option3, option4)
                interaction.reply({embeds:[pollEmbed], components: [pollButtons]});
                console.log(interaction);
            })
            
        }
       catch(error){
           console.error(error);
           interaction.reply({content:"Something was wrong with your formatting. Please try again."}, {ephemeral:true});
       } 
	}
}