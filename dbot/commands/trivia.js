const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js');
const mongoose = require('mongoose');
const profileSchema = require('../models/profileSchema');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Posts a random trivia question. Answer to earn points!'),
	/**
	 * @param {CommandInteraction} interaction 
	 * @param {Message} message
	 */
	async execute(interaction, message) {
		await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
            .then((res) => {
				// Meant for testing the API's output for future usage.
                console.log(res.data.results[0]);
				let AnswerTime = 3000;
				let answers = [];
				let difficulty = res.data.results[0].difficulty;
				for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
					answers.push(res.data.results[0].incorrect_answers[i]);
				}
				answers.push(res.data.results[0].correct_answer);
				// For testing purposes only.
				for (let i = 0; i < answers.length; i++) {
					console.log(answers[i]);
				}
				//Should randomly sort the function so the answer isn't consistently in the same order.
				
				// Global variables for index.js to reference
				global.correct_answer = res.data.results[0].correct_answer;
				global.gotCorrect = null;
				// Defines the comparison variable for the user's interaction.
				const UserIDComp = profileSchema.find({userID: interaction.user.id});
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId(answers[0] + ' -triv')
							.setLabel('1')
							.setStyle('SUCCESS')
							.setDisabled(false),
						new MessageButton()
							.setCustomId(answers[1] + ' -triv')
							.setLabel('2')
							.setStyle('SUCCESS')
							.setDisabled(false),
						new MessageButton()
							.setCustomId(answers[2] + ' -triv')
							.setLabel('3')
							.setStyle('SUCCESS')
							.setDisabled(false),
						new MessageButton()
							.setCustomId(answers[3] + ' -triv')
							.setLabel('4')
							.setStyle('SUCCESS')
							.setDisabled(false),
					);
				// Embeds
				const TriviaEmbed = new MessageEmbed()
					.setColor('#FF7F11')
					.setTitle('Trivia Question!')
					.addFields(
						{ name: 'Category: ', value: res.data.results[0].category },
						{ name: 'Difficulty: ', value: res.data.results[0].difficulty },
						{ name: 'Question: ', value: res.data.results[0].question },
						{ name: ':one: ', value: answers[0]},
						{ name: ':two: ', value: answers[1]},
						{ name: ':three: ', value: answers[2]},
						{ name: ':four: ', value: answers[3]},
					); 
				const TimeoutEmbed = new MessageEmbed()
					.setColor("ORANGE")
					.setTitle("Timed Out!")
					.setDescription("You didn't answer the question in time. Please try again!");
				const CorrectEmbed = new MessageEmbed()
					.setColor("GREEN")
					.setTitle("Correct!")
					.setDescription("Great job! You got the question right!")
				const IncorrectEmbed = new MessageEmbed()
					.setColor("RED")
					.setTitle("Incorrect!")
					.setDescription("You got this question wrong. Try again later!")
				// End of embeds.
				function DetermineAnswer(res){
					if (res === true){
						interaction.editReply({embeds:[CorrectEmbed], components: []});
						/*
							const correct = profileSchema.findOneAndUpdate({
								userID: interaction.user.id,
							},
							{
							$inc:{
								experience: 10,
							},
							},
						);
						*/
					}
					
					else if(res === false){
						interaction.editReply({embeds:[IncorrectEmbed], components: []});
					}
					else{
						interaction.editReply({embeds:[TimeoutEmbed], components: []});
					}
				}
				if (difficulty === 'easy'){
					TriviaEmbed.setColor('GREEN');
					interaction.reply({embeds:[TriviaEmbed], components: [row]});
				}
				else if (difficulty === 'medium'){
					TriviaEmbed.setColor('ORANGE');
					interaction.reply({embeds:[TriviaEmbed], components: [row]});
				}
				else if (difficulty === 'hard'){
					TriviaEmbed.setColor('RED');
					interaction.reply({embeds:[TriviaEmbed], components: [row]});
				}
				setTimeout(()=>{
					DetermineAnswer(gotCorrect);
				}, AnswerTime)
			})
            .catch((err) => {
                interaction.reply("There was an error trying to retrieve the trivia question. Please try again!")
                console.log('ERROR:', err);
                return;
            })
		}
}