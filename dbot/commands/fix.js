<<<<<<< HEAD
// Committed and taken care of by Thomas. 2/24/22
=======
>>>>>>> parent of d8a04f9 (Merge branch 'prototype_1' of https://github.com/ThomasCross257/CSEBot-Project into prototype_1)
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fix')
		.setDescription('Fixes any Twitter link for desktop viewing.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('link')
                .setDescription('Enter a link')
                .addStringOption(option => 
                    option.setName('url')
                        .setDescription('URL of Twitter post.')
                        .setRequired(true))),
	async execute(interaction) {
		if(!interaction.guild.available){ 
            await interaction.reply('I can not perform this operation in this guild.');
        }
<<<<<<< HEAD
        let link = interaction.options.getString('link');
        if(link.includes("https://twitter.com")){
            await interaction.reply(link.replace('https://twitter.com', 'https://fxtwitter.com')); // Echoes the URL specified by user with content replaced.
=======

        if(interaction.subcommand.getString.includes("https://twitter.com")){
            await interaction.reply(interaction.content.replace('https://twitter.com', 'https://fxtwitter.com'));
>>>>>>> parent of d8a04f9 (Merge branch 'prototype_1' of https://github.com/ThomasCross257/CSEBot-Project into prototype_1)
        }
        else{
            await interaction.reply("This is not a valid twitter link.");
        }

	}
}