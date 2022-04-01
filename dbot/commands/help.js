const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
/**Manny Daproza 3/8/2022
 * Will display link to website using .setURL(' ')
 * 
 * 
 * 
 * 
 * */
module.exports =  {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns list of commands or their description.'),
    async execute(interaction) {
        console.log(interaction.user.tag);
        
        
        const Embed = new MessageEmbed()
                    .setTitle("DinoBot Help and Commands")
                    .setColor('#111aee')
                    .setDescription('Thanks for using DinoBot!') //TBD
        
        interaction.user.send({embeds: [Embed]})
                    
    }
}