const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
/**Manny Daproza 3/8/2022
 * Will display link to website using .setURL(' ')
 * 
 * 
 * 
 * Thomas Cross 4/27/2022. Added list of commands and added link to tutoria website.
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
                    .setDescription('Thanks for using DinoBot!')
                    .setURL('d-bot.me/tutorial.html')
                    .addField("Ping: Replies with Pong!")
                    .addField("Play link: Plays a linked youtube video")
                    .addField("Ban: Bans a user (Admin only)")
                    .addField("Caption: Puts a caption on an image.")
                    .addField("Fix: (Context menu command!) Right click on desktop or press down on a message with a twitter link and tap fix to make it an fxtwitter link!")
                    .addField("Kick: Kicks a user from the server (Admin only)")
                    .addField("Meme: Gets a random meme from reddit.")
                    .addField("Poll: Creates a poll with a max of 4 options.")
                    .addField("reactboard: Creates a board of four buttons max to give a user roles.")
                    .addField("support-c: Checks on a support ticket using a given ticket ID")
                    .addField("support-s: Sends a support ticket to the developers. (Don't abuse this please).")
                    .addField("Game: (TBD)")
                    .addField("Trivia: Generates a random trivia question. Answer it to gain points!")
                    .addField("Level: Shows the user's level!")
                    .addField("Check the website for a more in-depth explanation!")

        
        interaction.user.send({embeds: [Embed]})
                    
    }
}