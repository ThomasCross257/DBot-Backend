const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const axis = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Posts a funny meme'),
	async execute(interaction) {
		axios.get('https://meme-api.herokuapp.com/gimme')
            .then(function (res) {
                await interaction.reply("Here's a funny meme! :)", res.data[0].url);
            })
            .catch(function (err) {
                await interaction.reply("There was an error trying to retrieve the meme. Please try again!")
                console.log('ERROR:', err);
            })
	},
};