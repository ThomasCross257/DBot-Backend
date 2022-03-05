const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { options } = require('request');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll')
        .addStringOption(option =>                                               
            option.setName('title')
                .setDescription('Title of the poll')
                .setRequired(true))
        .addIntegerOption(option =>                                               
            option.setName('options')
                .setDescription('How many options for the poll')
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
        const options_num = interaction.options.getInteger('options');
        
        const option1 = interaction.options.getString('option 1');
        const option2 = interaction.options.getString('option 2');
        const option3 = interaction.options.getString('option 3');
        const option4 = interaction.options.getString('option 4');

        // Block to determine what version of PollEmbed to use.       
        
        if (options_num > 4 || options_num < 2) {
            await interaction.reply("You can't have more than four or less than two poll options!")
        }
        else {
        let PollEmbed = new MessageEmbed()
            .setColor("#51BBFE")
            .setTitle(title)
            .addFields(
                {name: option1},
                {name: option2},
            )
        let PollButtons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("PollButton_1")
                    .setLabel('1')
                    .setStyle('PRIMARY')
                    .setDisabled(false),
                new MessageButton()
                    .setCustomId("PollButton_2")
                    .setLabel('2')
                    .setStyle('PRIMARY')
                    .setDisabled(false),
            )
        if (options_num === 3){
            PollEmbed 
                .addField(option3)
            PollButtons
                .addComponents(
                    new MessageButton()
                        .setCustomId("PollButton_2")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
        else if (options_num === 4){
            PollEmbed
                .addFields(
                    {name: option3},
                    {name: option4}
                )
            PollButtons
                .addComponents(
                    new MessageButton()
                        .setCustomId("PollButton_2")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                    new MessageButton()
                        .setCustomId("PollButton_2")
                        .setLabel('4')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
            

        await interaction.reply({embeds:[PollEmbed], components: [PollButtons]});
        }

        
	}
}