const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Posts a random trivia question. Answer to earn points!'),
	async execute(interaction) {
		await axios.get('https://opentdb.com/api.php?amount=1')
            .then((res) => {
				// Meant for testing the API's output for future usage.
                console.log(res.data.results[0]);
				
				if (res.data.results[0].type == 'multiple'){
					let answers_mult = [];
					for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
						answers_mult.push(res.data.results[0].incorrect_answers[i]);
					}
					answers_mult.push(res.data.results[0].correct_answer);
					// For testing purposes only.
					for (let i = 0; i < answers_mult.length; i++) {
						console.log(answers_mult[i]);
					}
					//Should randomly sort the function so the answer isn't consistently in the same order.
					const row_M = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId(answers_mult[0])
								.setLabel(answers_mult[0])
								.setStyle('SUCCESS'),
							new MessageButton()
								.setCustomId(answers_mult[1])
								.setLabel(answers_mult[1])
								.setStyle('SUCCESS'),
							new MessageButton()
								.setCustomId(answers_mult[2])
								.setLabel(answers_mult[2])
								.setStyle('SUCCESS'),
							new MessageButton()
								.setCustomId(answers_mult[3])
								.setLabel(answers_mult[3])
								.setStyle('SUCCESS'),
						);
					const TriviaEmbed_M = new MessageEmbed()
						.setColor('#FF7F11')
						.setTitle('Trivia Question!')
						.addFields(
							{ name: 'Category: ', value: res.data.results[0].category },
							{ name: 'Difficulty: ', value: res.data.results[0].difficulty },
							{ name: 'Question: ', value: res.data.results[0].question },
							{ name: ':one: ', value: answers_mult[0]},
							{ name: ':two: ', value: answers_mult[1]},
							{ name: ':three: ', value: answers_mult[2]},
							{ name: ':four: ', value: answers_mult[3]},
						); 
						interaction.reply({embeds:[TriviaEmbed_M], components: [row_M]});
						// In need of a collector to gather responses from buttons and return them to console. Attempts are below.
						/*
						// Copied from discord.js's guide
						const filter = i => i.customId === answers_mult[0] && i.user.id === '122157285790187530';
						const collector = g.createMessageComponentCollector({ filter, time: 15000 });
						collector.on('collect', async i => { 
							if (i.customId === answers_mult[0]){
								interaction.update({Content: "Button Clicked!", embeds:[], components: []})
							}
						});
						collector.on('end', collected => console.log(`Collected ${collected.size} items`));

						const filter = (ButtonInteraction)=>{
							return interaction.user.id == ButtonInteraction.user.id
						}
						const collector = Channel.createMessageComponentCollector({
							filter,
							max: 1,
							time: 1500

						})
						collector.on((ButtonInteraction) =>{
							interaction.followUp("Button Clicked.")
						})
						collector.on('end', (collection) =>{
							collection.forEach((ButtonInteraction) =>{
								console.log("Works")
							})
							interaction.editReply("This question has expired!")
						})
						*/
						answers_mult = [];
					
				}
				else if (res.data.results[0].type == 'boolean'){
					let answers_bool = [];
				 	if (res.data.results[0].incorrect_answers[0] === "True"){
						answers_bool.push(res.data.results[0].incorrect_answers[0]);
						answers_bool.push(res.data.results[0].correct_answer)
					}
					else{
						answers_bool.push(res.data.results[0].correct_answer)
						answers_bool.push(res.data.results[0].incorrect_answers[0]);
					}
					for (let i = 0; i < answers_bool.length; i++) {
						console.log(answers_bool[i]);
					}
					const row_B = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId(answers_bool[0])
								.setLabel(answers_bool[0])
								.setStyle('SUCCESS'),
							new MessageButton()
								.setCustomId(answers_bool[1])
								.setLabel(answers_bool[1])
								.setStyle('SUCCESS')
						);
					const TriviaEmbed_B = new MessageEmbed()
						.setColor('#FF7F11')
						.setTitle('Trivia Question!')
						.addFields(
							{ name: 'Category: ', value: res.data.results[0].category },
							{ name: 'Difficulty: ', value: res.data.results[0].difficulty },
							{ name: 'Question: ', value: res.data.results[0].question },
							{ name: ':regional_indicator_t: ', value: answers_bool[0]},
							{ name: ':regional_indicator_f: ', value: answers_bool[1]},
						)
					interaction.reply({embeds: [TriviaEmbed_B], components: [row_B]})
						
						//answers_bool = [];
					}
				return;
            })
            .catch((err) => {
                interaction.reply("There was an error trying to retrieve the trivia question. Please try again!")
                console.log('ERROR:', err);
                return;
            })
	},
};