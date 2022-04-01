// Committed and taken care of by Thomas. 2/24/22
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fix')
		.setDescription('Fixes any Twitter link for desktop viewing.')
        .addStringOption(option =>                                               
                option.setName('link')                                              // Removed subcommand and replaced with options
                    .setDescription('Fixes any Twitter link for desktop viewing')   // ----> No need for subcommand ... String Option is better suited
                    .setRequired(true)),                                           
	async execute(interaction) {
        if(!interaction.isCommand()) return;
		if(!interaction.guild.available){ 
            await interaction.reply('I can not perform this operation in this guild.');
        }
        let link = interaction.options.getString('link');
        if(link.includes("https://twitter.com")){
            await interaction.reply(link.replace('https://twitter.com', 'https://fxtwitter.com')); // Echoes the URL specified by user with content replaced.
        }
        else{
            await interaction.reply("This is not a valid twitter link.");
        }

	}
}