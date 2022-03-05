const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, CommandInteraction } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears specified messages in active channel')
		.addIntegerOption(option =>                                               
            option.setName('amount')
                .setDescription('How many messages to clear.')
                .setRequired(true)),
	/*
	/**
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		if(!interaction.isCommand()) return;
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { 
			await interaction.reply('You do not have permission to use this command.');
            return;
			}
		await interaction.deferReply();
		const Amount = interaction.options.getInteger('amount')
        const {channel, options} = interaction;
		const Messages = await channel.messages.fetch();
		const ResponseEmbed = new MessageEmbed()
		.setColor("WHITE");
		try{
			await channel.bulkDelete(Amount, true);
			console.log("Bulk Delete working.")
			ResponseEmbed.setDescription(":white_check_mark: Removed: " + Amount + " messages successfully removed.");
			await interaction.editReply({embeds:ResponseEmbed});
		}
		catch(error){
			console.log(error);
			ResponseEmbed.setDescription(":negative_squared_cross_mark:  Failed to remove mesages. Please try again later.");
			await interaction.editReply({embeds:ResponseEmbed});
		}
	},
};