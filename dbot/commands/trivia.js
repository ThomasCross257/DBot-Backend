const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');

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
					const answers = [];
					for (let i = 0; i < res.data.results[0].incorrect_answers.length; i++) {
						answers.push(res.data.results[0].incorrect_answers[i]);
					}
					answers.push(res.data.results[0].correct_answer);
					// For testing purposes only.
					for (let i = 0; i < answers.length; i++) {
						console.log(answers[i]);
					}
					//Should randomly sort the function so the answer isn't consistently in the same order.

					interaction.reply("Here's a question for you!\n", res.data.results[0].question, "\n", 
					":one: ", answers[0], "\n:two: ", answers[1], "\n:three: ", answers[2], "\n:four: ", answers[3]); // Currently does not function correctly. Will only output "Here's a question for you!" and nothing else. 
			}
				else if (res.data.type == 'boolean'){
					interaction.reply("Here's a question for you!\n", res.data.results[0].question, "\n", ":one: True\n", ":two: False\n");
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