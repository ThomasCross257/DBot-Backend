const { SlashCommandBuilder } = require('@discordjs/builders');
const { options } = require('request');
const {pollEmbedGen, pollButtonsGen, pollResultsEmbedGen} = require('../embeds/pollEmbeds')
const pollModel = require('../models/pollSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll')
        .addStringOption(option =>                                               
            option.setName('title')
                .setDescription('Title of the poll')
                .setRequired(true))
        .addIntegerOption(option =>                                               
            option.setName('minutes')
                .setDescription('How many minutes the poll will be up for.')
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
        const id = interaction.id;
        const minutes = interaction.options.getInteger('minutes');
        const polltime = minutes * 60000;
        console.log(id);
        try{
            pollModel.create({
                userID: interaction.member.user.id, 
                pollID: id, //Interaction IDs are always unique and won't run into the possible issue of using math floor.
                serverID: interaction.guild.id,
                });
            const pollEmbed = pollEmbedGen(option1, option2, option3, option4, title, minutes);
            const pollButtons = pollButtonsGen(option3, option4, id);
            interaction.reply({embeds:[pollEmbed], components: [pollButtons]});
            setTimeout(()=>{
                pollModel.find({pollID: id }, (err,res) => {
                    const pollCompleteEmbed = pollResultsEmbedGen(title, option1, res[0].option1, option2, res[0].option2, 
                        option3, res[0].option3, option4, res[0].option4, Date().toLocaleString());
                    interaction.editReply({embeds:[pollCompleteEmbed], components: []}); //Uncommon error occurs whenever some polls are called with the same names.
                })
                
            }, polltime)
        }
       catch(error){
           console.error(error);
           interaction.reply({content:"Something was wrong with your formatting. Please try again."}, {ephemeral:true});
       } 
	}
}