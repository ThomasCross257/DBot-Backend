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

function buttonGenPF (choice1, choice2, choice3, choice4){
	var buttonPF = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId(1 + 'pf_1')
				.setLabel('1')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(2 + 'pf_2')
				.setLabel('2')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(3 + 'pf_3')
				.setLabel('3')
				.setStyle('SUCCESS')
				.setDisabled(false),
			new MessageButton()
				.setCustomId(4 + 'pf_4')
				.setLabel('4')
				.setStyle('SUCCESS')
				.setDisabled(false),
		);
		return buttonPF;
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
function PFChangeEmbed (color){
    var PFChangeEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle('Change your user profile background!')
        .addFields(
			{name: 'Default', value: "Default Background"},
			{name: 'Starry Sky',value: "Starry Sky Background :star:"},
			{name: 'Cloudy Sky',value: "Cloudy Sky Background :cloud:"},
			{name: 'City',value: "City Background :cityscape:"},
            
    ); 
    return PFChangeEmbed;
}

function correctEmbedGen(points){
	const CorrectEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Correct!")
    .setDescription("Great job! You got the question right and earned " + points + " EXP!")
	return CorrectEmbed;
}

const PFChangedEmbed = new MessageEmbed()
	.setColor("GREEN")
	.setTitle("PF successfully changed!")
	.setDescription("Do /level to view your new profile background!");
const TimeoutEmbed = new MessageEmbed()
	.setColor("ORANGE")
	.setTitle("Timed Out!")
	.setDescription("You didn't answer the question in time. Please try again!");
const IncorrectEmbed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Incorrect!")
    .setDescription("You got this question wrong. Try again later!")

function SortTrivia(arr){ // Using Fischer-Yates method to randomly sort answers.
	for (let i = arr.length -1; i > 0; i--){
		const j = Math.floor(Math.random() * i);
		let k = arr[i];
		arr[i] = arr[j];
		arr[j] = k;
	}
	return arr;
}

module.exports = {buttonGen, buttonGenPF, questionEmbedGen, correctEmbedGen, PFChangeEmbed,  PFChangedEmbed, TimeoutEmbed, IncorrectEmbed, SortTrivia};