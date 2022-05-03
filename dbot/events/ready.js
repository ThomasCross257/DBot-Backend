const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
const mongoose = require('mongoose');
const profileModel = require('../models/profileSchema')
const { IntegrationApplication } = require('discord.js');
const fs = require('fs');


 function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


 var key = getRandomInt(10) //Number of possible questions so far
 var phrase = fs.readFileSync("./dbot/data/phrase.txt",'utf-8');
 var phrases = phrase.split('\n')
 
 var word = fs.readFileSync("./dbot/data/word.txt", 'utf-8');
 var words = word.split('\n')



 const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Guess the word!')
            .setDescription(phrases[key])

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		client.on('message', async function (message) {
			
			if(message.content === '/guesstheword') {
				const msg_filter = (m) => m.author.id === message.author.id;
				message.channel.send({embeds:[embed]})
				console.log(words)
				console.log(words[key])
				const answer = await message.channel.awaitMessages({ filter: msg_filter, max: 1 });
				var ans = answer.first()
				
				var user_id = ans.author.id
				

				var correctAnswer = words[key].toString() 
				correctAnswer = correctAnswer.slice(0, correctAnswer.length-1)
				var userInput = ans.content.toString()
				
				/*
				console.log(typeof userInput) 
				console.log(typeof correctAnswer)
				console.log(ans.content.toLowerCase())
				console.log(correctAnswer.toLowerCase())
				console.log(userInput)
				console.log(correctAnswer)
				//console.log(correctAnswer)
				
			
				var index;
				for(index = 0; index < correctAnswer.length; ++index) {
					console.log("char " + index + ":" + correctAnswer.charCodeAt(index));
				}
				*/
				
				
				if((userInput.toLowerCase()) == correctAnswer.toLowerCase()) {
					message.channel.send("**Correct answer! You are big brained! :brain: Points deposited.**")
					profileModel.updateOne({userID: user_id,},
						{$inc: {experience: 10}}).exec();
						console.log({userID: user_id});
					/*
					profileModel.updateOne({userID: message.user.id,},
						{$inc: {experience: 10}}).exec();
					console.log(profileModel.find({userID: message.user.id}).exec()); */
				}
				else {
					message.channel.send("**Incorrect answer. Try again!**");
					
				}
			}
		})




		client.user.setActivity(																	// Going to repeat myself here
			`I am in ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? 's': ''}!`,	// but it works for now
			{type: 'PLAYING'},																		// will update later
		);
		let interval_id = setInterval((client) => {
			if(!client) {clearInterval(interval_id); return;}
			client.user.setActivity(
				`I am in ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? 's': ''}!`,
				{type: 'PLAYING'},
			);
			console.log('done');
		}, 300000, client);	// Set to update every 5 mintues
	}
};