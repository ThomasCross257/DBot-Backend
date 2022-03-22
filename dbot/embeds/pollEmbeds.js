const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function pollEmbedGen (option1, option2, option3, option4, title, minutes){
    let PollEmbed = new MessageEmbed()
        .setColor("#51BBFE")
        .setTitle(title)
        .addFields(
            {name: ':one: ', value: option1, inline: true},
            {name: ':two: ', value: option2, inline: true},
        )
        .setFooter({text: "Poll will end " + minutes + " minutes after this command was called." }); 
    if (option3 != undefined){
        PollEmbed.addField(':three: ',option3,  true);
    }
    if (option4 != null){
        PollEmbed.addField(':four: ',option4,  true);
    }
    return PollEmbed;
}
function pollButtonsGen(option3, option4, PollID){
    let PollButtons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(PollID + " PollButton_1")
                .setLabel('1')
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId(PollID + " PollButton_2")
                .setLabel('2')
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
        if (option3 != null || option3 === null && option4 != null){
            PollButtons.addComponents(
                    new MessageButton()
                        .setCustomId(PollID + " PollButton_3")
                        .setLabel('3')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
        }
        if (option4 != null){
            PollButtons.addComponents(
                    new MessageButton()
                        .setCustomId(PollID + " PollButton_4")
                        .setLabel('4')
                        .setStyle('PRIMARY')
                        .setDisabled(false),
                )
            }
    return PollButtons;
}

function pollResultsEmbedGen(title, option1, op1_val,  option2, op2_val, option3, op3_val, option4, op4_val, time){
    let ResultsEmbed = new MessageEmbed()
        .setColor("#51BBFE")
        .setTitle(title + " has ended. Here are the results!")
        .addFields(
            {name: option1 , value: String(op1_val), inline: true},
            {name: option2 , value: String(op2_val), inline: true},
        )
        .setFooter({text: "Ended at: " + time }); 

        if (option3 != null){
            ResultsEmbed.addField(option3, String(op3_val),  true);
        }
        if (option4 != null){
            ResultsEmbed.addFields(
                {name: option4, value: String(op4_val), inline: true});
        }
        return ResultsEmbed
    }

module.exports = {pollEmbedGen, pollButtonsGen, pollResultsEmbedGen}