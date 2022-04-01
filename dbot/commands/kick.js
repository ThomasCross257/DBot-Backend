const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
	.setDescription('Kick a user from the server')
	.addUserOption(option =>
		option.setName('user')
			.setDescription('The user you want to kick from the server.')
			.setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Reason for kick.')
            .setRequired(false)),
    async execute(interaction) {

        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            await interaction.reply('I do not have permissions to kick users.');
            return;
        }
        if(interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            if(!interaction.isCommand()) { await interaction.reply('An error occured. This is not a command.'); return}
            const target = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            const kicked = await interaction.guild.members.fetch(target);
            if(kicked.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                await interaction.reply('You can not kick this user');
                return
            }
            try {
                if(!reason)
                    interaction.guild.members.kick(target.id)
                else
                    interaction.guild.members.kick(target.id, reason)
                await interaction.reply('Kicked user');
            } catch (error) {
                await interaction.reply('An error occured...');
            }
        } else {
            await interaction.reply('You do not have permissions to kick people.');
        }
    }
}