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

        if(interaction.subcommand.getString.includes("https://twitter.com")){
            await interaction.reply(interaction.content.replace('https://twitter.com', 'https://fxtwitter.com'));
        }
        else{
            await interaction.reply("This is not a valid twitter link.");
        }

	}
};