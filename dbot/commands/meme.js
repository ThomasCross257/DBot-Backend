const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Posts a funny meme'),
	async execute(interaction) {
		await axios.get('https://meme-api.herokuapp.com/gimme')
            .then((res) => {
                console.log(res.data);
                interaction.reply(res.data.url);
                return;
            })
            .catch((err) => {
                interaction.reply("There was an error trying to retrieve the meme. Please try again!")
                console.log('ERROR:', err);
                return;
            })
	},
};