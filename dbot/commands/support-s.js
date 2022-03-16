const { SlashCommandBuilder } = require('@discordjs/builders');
const ticketModel = require('../models/ticketSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("support-send")
		.setDescription('Have a problem with the bot? Send us a support ticket! Please be as descriptive as possible')
        .addStringOption(option =>
			option.setName('message')
				.setDescription('The message with your issue')
				.setRequired(true)),
	async execute(interaction) {
        const Issue = interaction.options.getString('message');
        const TicketID = "DBOT_D-" + Math.floor(Math.random() * 100000)
        let SupportTicket = await ticketModel.create({
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
                console.log("------------------------")
                console.log(SupportTicket)
                console.log("------------------------")
                interaction.reply({content:"Ticket Sent! We really appreciate you sendingt this in and we will get back to you as soon as possible! P.S, your ticket ID is " + TicketID + " keep it somewhere safe and don't lose it!", ephemeral: true});
            }
        });
	},
};