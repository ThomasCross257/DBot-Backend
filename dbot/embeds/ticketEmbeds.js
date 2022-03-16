const { MessageEmbed } = require('discord.js');

function TicketEmbedGen(UserID, ServerID, TicketID, Issue, Response, Resolved){
    let TicketEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(TicketID)
        .addFields(
            {name: 'User ID: ', value: UserID},
            {name: 'Server ID', value: ServerID},
            {name: 'Problem: ', value: Issue},
            {name: 'Response: ', value: Response},
            {name: 'Resolved: ', value: Resolved.toString(),}
        )
    if (Resolved === false){
        TicketEmbed.setColor('RED');
    }
    else{
        TicketEmbed.setColor('GREEN');
    }
    return TicketEmbed;
}



module.exports = TicketEmbedGen;