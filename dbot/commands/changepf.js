const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { PFChangeEmbed , buttonGenPF, PFChangedEmbed}= require ('../embeds/triviaEmbeds')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const profileModel = require('../models/profileSchema');


module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('changepf')
		.setDescription('Allows users to change their canvacord background image.'),
	/**
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		let AnswerTime = 15000;
		const rows = buttonGenPF("1","2","3","4");
		const PFEmbed = PFChangeEmbed('BLUE')
		interaction.reply({embeds:[PFEmbed], components: [rows]});
		setTimeout(()=>{
			interaction.editReply({embeds:[PFChangedEmbed], components: []});
		}, AnswerTime)
		
				


	}
}