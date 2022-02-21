const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions, MessageEmbed } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
	.setDescription('ban a user from the server')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('The user you want to kick from the server.')
			.setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Reason for kick.')
            .setRequired(false))
    .addIntegerOption(option =>
        option.setName('days')
            .setDescription('The amount of days the user will be banned')
            .setRequired(false)),
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { 
            await interaction.reply('I do not have permissions to ban users.');
            return;
        }
        if(interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const target = interaction.options.getUser('user');
            const days = interaction.options.getInteger('days');
            const reason = interaction.options.getString('reason');
            if(days < 0 || days > 7)
                return interaction.reply('Invalid option! Days can only range from 0 to 7.')
            const going_to_ban = await interaction.guild.members.fetch(target);
            interaction.guild.members.ban(going_to_ban.id, {days: days, reason: reason}).then(() => {
                interaction.reply(`Banned ${going_to_ban.user.tag}.`);
            }
            ).catch(err => {
                interaction.reply('Could not ban the user.');
            })
        }
    }
}