const { SlashCommandBuilder } = require('@discordjs/builders');
const ticketModel = require('../models/ticketSchema');
const TicketEmbedGen = require('../embeds/ticketEmbeds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("support-check")
		.setDescription('Check on your support ticket.')
		.addStringOption(option =>
			option.setName('ticketid')
				.setDescription('The message with your issue')
				.setRequired(true)),
	async execute(interaction) {
		const TicketNum = interaction.options.getString('ticketid');
		if (TicketNum != undefined){
			ticketModel.find({ticketID: TicketNum}, (err, user) => {
				if(err) {
					return interaction.reply("Invalid Ticket number! Your number should look like: DBOT_D- 00000");
				} else {
					console.log(user);
					
					const userID = user[0].userID;
					console.log(userID);
					const serverID = user[0].serverID;
					console.log(serverID);
					const problem = user[0].problem;
					console.log(problem);
					const ticketID = user[0].ticketID;
					console.log(ticketID);
					const resolved = user[0].resolved;
					console.log(resolved);
					var response = user[0].response;
					if (response != "Developer has not responded to this ticket yet."){
					response = user[0].resolved;
					console.log(response);
					}
					const ticketEmbed = TicketEmbedGen(userID, serverID, ticketID, problem, response, resolved);
					interaction.reply({embeds:[ticketEmbed], ephemeral: true});
				}
			});
		}
        
	},
};