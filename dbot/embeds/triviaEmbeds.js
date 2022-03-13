const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

function buttonGen (answer1, answer2, answer3, answer4){
    var button = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId(answer1 + ' -triv')
				.setLabel('1')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(answer2 + ' -triv')
				.setLabel('2')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(answer3 + ' -triv')
				.setLabel('3')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(answer4 + ' -triv')
				.setLabel('4')
				.setStyle('SUCCESS')
				.setDisabled(false),
		);
        return button;
}
function questionEmbedGen (category, difficulty, question, answer1, answer2, answer3, answer4, color){
    var questionEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle('Trivia Question!')
        .addFields(
            { name: 'Category: ', value: category},
            { name: 'Difficulty: ', value: difficulty },
            { name: 'Question: ', value: question },
            { name: ':one: ', value: answer1},
            { name: ':two: ', value: answer2},
            { name: ':three: ', value: answer3},
            { name: ':four: ', value: answer4},
    ); 
    return questionEmbed;
}

function correctEmbedGen(points){
	const CorrectEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Correct!")
    .setDescription("Great job! You got the question right and earned " + points + " EXP!")
	return CorrectEmbed;
}

const TimeoutEmbed = new MessageEmbed()
	.setColor("ORANGE")
	.setTitle("Timed Out!")
	.setDescription("You didn't answer the question in time. Please try again!");
const IncorrectEmbed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Incorrect!")
    .setDescription("You got this question wrong. Try again later!")

module.exports = {buttonGen, questionEmbedGen, correctEmbedGen, TimeoutEmbed, IncorrectEmbed};