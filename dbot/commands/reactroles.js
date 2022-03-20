const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions, MessageEmbed, Client, Intents } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reactroles')
	.setDescription('creates a reaction list'),
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) { 
            await interaction.reply('You may not use this command');
            return;
        }
        //const testRole = interaction.guild.roles.cache.find(role => role.name == "testing role 1");
        //const testRole2 = interaction.guild.roles.cache.find(role => role.name == "Testing role 2");
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Pick your roles!')
            .setDescription('Give yourself roles. \n :thumbsup: for green \n :thumbsdown: for purple.')
        await interaction.reply({embeds: embed});
    }
}