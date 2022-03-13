const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const {TimeoutEmbed, correctEmbedGen, IncorrectEmbed, questionEmbedGen, buttonGen} = require ('../embeds/triviaEmbeds')
const profileModel = require('../models/profileSchema');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Posts a random trivia question. Answer to earn points!'),
	/**
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
            .then((res) => {
				// Meant for testing the API's output for future usage.
                console.log(res.data.results[0]);
				let AnswerTime = 10000;
				let answers = [];
				let difficulty = res.data.results[0].difficulty;
				const category = res.data.results[0].category;
				const question = res.data.results[0].question;
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
				const row = buttonGen(answers[0], answers[1], answers[2], answers[3]);
				function DetermineAnswer(res){
					if (res === true){
						var points = 0;
						if (difficulty === 'easy'){ points = 7;}
						else if (difficulty === 'medium'){points = 12;}
						else if (difficulty === 'hard'){points = 20;}
						profileModel.updateOne({userID: interaction.user.id,},
							{$inc: {experience: points}}).exec();
						const CorrectEmbed = correctEmbedGen(points);
						interaction.editReply({embeds:[CorrectEmbed], components: []});
					}
					
					else if(res === false){
						interaction.editReply({embeds:[IncorrectEmbed], components: []});
					}
					else{
						interaction.editReply({embeds:[TimeoutEmbed], components: []});
					}
				}
				if (difficulty === 'easy'){
					const TriviaEmbed = questionEmbedGen(category, difficulty, question, answers[0], answers[1], answers[2], answers[3], 'GREEN')
					interaction.reply({embeds:[TriviaEmbed], components: [row]});
				}
				else if (difficulty === 'medium'){
					const TriviaEmbed = questionEmbedGen(category, difficulty, question, answers[0], answers[1], answers[2], answers[3], 'ORANGE')
					interaction.reply({embeds:[TriviaEmbed], components: [row]});
				}
				else if (difficulty === 'hard'){
					const TriviaEmbed = questionEmbedGen(category, difficulty, question, answers[0], answers[1], answers[2], answers[3], 'RED')
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