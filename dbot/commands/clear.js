const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, CommandInteraction } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears specified messages in active channel')
		.addIntegerOption(option =>                                               
            option.setName('amount')
                .setDescription('How many messages to clear.')
                .setRequired(true))
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User messages to clear')
				.setRequired(false)),
	/**
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		if(!interaction.isCommand()) return;
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { 
			await interaction.reply('You do not have permission to use this command.');
            return;
			}
		const Amount = interaction.options.getInteger('amount');
		const User  = interaction.options.getMember('user');
		console.log(User);
        const {channel, options} = interaction;
		const Messages = await channel.messages.fetch();
		const ResponseEmbed = new MessageEmbed()
		.setColor("WHITE");
		
		try{
		if (User != undefined){
			var i = 0;
			const filtered = [];
			(await Messages.filter(message =>{
				if (message.author.id === User.id && Amount > i){
					filtered.push(message);
					i++;
				}
			}))
			await channel.bulkDelete(filtered, true);
			ResponseEmbed.setDescription(":white_check_mark: Removed: " + Amount + " messages from " + User.user.username + " successfully.").setColor("#44bd32");
			await interaction.reply({embeds:[ResponseEmbed]})
		}
		else{
			await channel.bulkDelete(Amount, true);
			ResponseEmbed.setDescription(":white_check_mark: Removed: " + Amount + " messages successfully.").setColor("#44bd32");
			await interaction.reply({embeds:[ResponseEmbed]})
		}

		}
		catch(error){
			console.log(error);
			ResponseEmbed.setDescription(":negative_squared_cross_mark:  Failed to remove mesages. Please try again later.").setColor("#e84118");;
			await interaction.reply({embeds:[ResponseEmbed]});
		}
	},
};