// Someone please push this command to discord
// with deploy-commands.js later
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
            await interaction.reply(interaction.content.replace('https://twitter.com', 'https://fxtwitter.com'));
        }
        else{
            await interaction.reply("This is not a valid twitter link.");
        }

	}
}