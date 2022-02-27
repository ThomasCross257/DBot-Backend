const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed, Message } = require('discord.js');

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
					const answers_mult = [];
					for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
						answers_mult.push(res.data.results[0].incorrect_answers[i]);
					}
					answers_mult.push(res.data.results[0].correct_answer);
					// For testing purposes only.
					for (let i = 0; i < answers_mult.length; i++) {
						console.log(answers_mult[i]);
					}
					//Should randomly sort the function so the answer isn't consistently in the same order.
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
						) 
					interaction.reply({embeds: [TriviaEmbed_M]});
					/*
					----Reaction implementation Does NOT work. WILL CRASH BOT IF RUN----
					Message.react("1️⃣")
						.then(() => Message.react("2️⃣"))
						.then(() => Message.react("3️⃣"))
						.then(() => Message.react("4️⃣"))
						.catch(error => console.error('Emoji Reaction Failed.', error))
					*/
					answers_mult = [];
					
				}
				else if (res.data.type == 'boolean'){
					const answers_bool = [];
					if (res.data.results[0].incorrect_answers[0] == "True"){
						answers_bool.push(res.data.results[0].incorrect_answers[0]);
					}
					else{
						answers_bool.push(res.data.results[0].correct_answer)
					}
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
						interaction.reply({embeds: [TriviaEmbed_B]});
						/*
						Message.react(':regional_indicator_t:')
							.then(() => Message.react(':regional_indicator_f:'))
							.catch(error => console.error('Emoji Reaction Failed.', error))
						*/
						answers_bool = [];
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