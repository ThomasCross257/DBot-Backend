const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function pollEmbedGen (option1, option2, option3, option4, title/*, ID*/){
    let PollEmbed = new MessageEmbed()
        .setColor("#51BBFE")
        .setTitle(title)
        .addFields(
            {name: ':one: ', value: option1, inline: true},
            {name: ':two: ', value: option2, inline: true},
        )
        //.setFooter({text: "Poll ID: " + ID}); 
    if (option3 != undefined){
        PollEmbed.addField(':three: ',option3,  true);
    }
    else if (option3 != undefined && option4 != undefined){
        PollEmbed.addFields({name: ':three: ', value: option3, inline: true},
                {name: ':four: ', value: option4, inline: true});
    }
    return PollEmbed;
}
function pollButtonsGen(option3, option4){
    let PollButtons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("PollButton_1")
                .setLabel('1')
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId("PollButton_2")
                .setLabel('2')
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
        if (option3 != undefined){
            PollButtons.addComponents(
                    new MessageButton()
                        .setCustomId("PollButton_3")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
        else if (option3 != undefined && option4 != undefined){
            PollButtons.addComponents(
                    new MessageButton()
                        .setCustomId("PollButton_3")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                    new MessageButton()
                        .setCustomId("PollButton_4")
                        .setLabel('4')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
        else if (option3 === undefined && option4 != undefined){
            PollButtons.addComponents(
                    new MessageButton()
                        .setCustomId("PollButton_3")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
    return PollButtons;
}

module.exports = {pollEmbedGen, pollButtonsGen}