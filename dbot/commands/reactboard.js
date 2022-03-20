const { SlashCommandBuilder } = require('@discordjs/builders')
const {reactEmbedGen, reactButtonGen} = require ('../embeds/reactEmbeds')
const { Permissions } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reactboard')
	.setDescription('creates a reaction board')
    .addStringOption(option =>                                               
        option.setName('title')
            .setDescription('Title of the reaction board')
            .setRequired(true))
    .addStringOption(option =>                                               
        option.setName('description')
            .setDescription('Description of the reaction board')
            .setRequired(true))   
    .addRoleOption(option =>                                               
        option.setName('role1')
            .setDescription('Additional role')
            .setRequired(true))
    .addRoleOption(option =>                                               
        option.setName('role2')
            .setDescription('Additional role')
            .setRequired(false))
    .addRoleOption(option =>                                               
        option.setName('role3')
            .setDescription('Additional role')
            .setRequired(false))
    .addRoleOption(option =>                                               
        option.setName('role4')
            .setDescription('Additional role')
            .setRequired(false))
    .addRoleOption(option =>                                               
        option.setName('role5')
            .setDescription('Additional role')
            .setRequired(false)),
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) { 
            await interaction.reply('You may not use this command');
            return;
        }
        const title = interaction.options.getString('title')
        const description = interaction.options.getString('description')
        const roles = [interaction.options.getRole('role1'),interaction.options.getRole('role2'), interaction.options.getRole('role3'), 
        interaction.options.getRole('role4'), interaction.options.getRole('role5')]
        for (let i = 0; i < roles.length; i++) {
            console.log(roles[i]);
        }
        const boardEmbed = reactEmbedGen(title, description, roles[0], roles[1], roles[2], roles[3], roles[4]);
        const boardButtons = reactButtonGen(roles[0], roles[1], roles[2], roles[3], roles[4]);
        await interaction.reply({embeds: [boardEmbed], components: [boardButtons]});
        //await interaction.reply("Check the console.")
    }
}