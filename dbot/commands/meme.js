const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Posts a funny meme'),
	async execute(interaction) {
		await axios.get('https://meme-api.herokuapp.com/gimme')
            .then((res) => {
                console.log(res.data);
                console.log(interaction)
                if (res.data.nsfw === true && interaction.channel.nsfw != true){
                    interaction.reply("This channel is not designated as NSFW. change the settings and try again.")                   
                }
                else{
                    const url = res.data.url;
                    const subreddit = res.data.subreddit;
                    const title = res.data.title;
                    const MemeEmbed = new MessageEmbed()
                        .setColor("#4281A4")
                        .setTitle(title)
                        .addField("From: ", "r/" + subreddit, true)
                        .setImage(url);
                    interaction.reply({embeds: [MemeEmbed]});
                    
                }
                return;
            })
            .catch((err) => {
                interaction.reply("There was an error trying to retrieve the meme. Please try again!")
                console.log('ERROR:', err);
                return;
            })
	},
};