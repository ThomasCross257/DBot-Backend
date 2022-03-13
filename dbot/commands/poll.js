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
            option.setName('option2') // For example options.setNAme('option 2') will throw an invalid form body. Use 'option2' instead.
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
            // var PollID;
            /*
            pollModel.create({userID: interaction.member.user.id, serverID: interaction.guild.id});
            pollModel.find({userID: interaction.member.user.id,}, function(res){
                PollID = Number(res[0].toObject().pollID)
            })
            */
            const pollEmbed = pollEmbedGen(option1, option2, option3, option4, title/*,PollID*/);
            const pollButtons = pollButtonsGen(option3, option4)
            interaction.reply({embeds:[pollEmbed], components: [pollButtons]});
            // console.log(PollID);
        }
       catch(error){
           console.error(error);
           interaction.reply({content:"Something was wrong with your formatting. Please try again."}, {ephemeral:true});
       } 
	}
}