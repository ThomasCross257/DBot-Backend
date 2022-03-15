const { SlashCommandBuilder } = require('@discordjs/builders');
const profileSchema = require('../models/profileSchema')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Support_Check')
		.setDescription('Have a problem with the bot? Send us a support ticket! Please be as descriptive as possible')
        .addStringOption(option =>
			option.setName('message')
				.setDescription('The message with your issue')
				.setRequired(true)),
	async execute(interaction) {
        const Issue = interaction.getString('message');
        const TicketID = "DBOT_D- " + Math.floor(Math.random() * 100000)
            try{
                let SupportTicket = await profileSchema.create({
                    userID: interaction.member.user.id,
                    serverID: interaction.guild.id,
                    problem: Issue,
                    ticketID: TicketID,
                });
                SupportTicket.save(function(err){
                    if (err){ 
                        console.long(err);
                        console.log(interaction.id);
                        console.log(interaction.guild.id);
                        interaction.reply("Something went wrong while trying to send the ticket.");
                    }
                    else{
                        interaction.reply("Ticket Sent! We really appreciate you sendingt this in and we will get back to you as soon as possible!");
                    }
                });
            }
        catch(err){
            console.log(err);
            interaction.reply("Something went wrong with your registration, or you are already registered!");
         }
	},
};