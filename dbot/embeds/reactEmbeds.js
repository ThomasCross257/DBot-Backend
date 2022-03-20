const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const randEmoji = require("@alexfrankcodes/random-emoji");

const role1Emoji = randEmoji.random(); // Generates random emoji. Will make another method to allow custom emojis.
const role2Emoji = randEmoji.random();
const role3Emoji = randEmoji.random();
const role4Emoji = randEmoji.random();
const role5Emoji = randEmoji.random();

function reactEmbedGen (title, description, role1, role2, role3, role4, role5){
    let ReactEmbed = new MessageEmbed()
        .setColor("#F4F4ED")
        .setTitle(title)
        .setDescription(description)
        .addFields({name: role1Emoji, value: role1.name},)
    if (role2 != undefined){
        const role2Emoji = randEmoji.random();
        ReactEmbed.addFields({name:role2Emoji + " ", value: role2.name});
    } 
    if (role3 != undefined){
        const role3Emoji = randEmoji.random();
        ReactEmbed.addFields({name:role3Emoji + " ", value: role3.name});
    }
    if (role4 != undefined){
        const role4Emoji = randEmoji.random();
        ReactEmbed.addFields({name:role4Emoji + " ", value: role4.name});
    }
    if (role5 != undefined){
        const role5Emoji = randEmoji.random();
        ReactEmbed.addFields({name:role5Emoji + " ", value: role5.name});
    }
    return ReactEmbed;
}

function reactButtonGen (role1, role2, role3, role4, role5){

    let ReactButtons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(role1.id + " ReactBTN1")
                .setLabel(role1Emoji + " " + role1.name)
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
        if (role2 != undefined){
        ReactButtons.addComponents(new MessageButton().setCustomId(role2.id + " ReactBTN2")
                .setLabel(role2Emoji + " " + role2.name)
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
    } 
    if (role3 != undefined){
        ReactButtons.addComponents(new MessageButton().setCustomId(role3.id + " ReactBTN3")
                .setLabel(role3Emoji + " " + role3.name)
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
    }
    if (role4 != undefined){
        ReactButtons.addComponents(new MessageButton().setCustomId(role4.id + " ReactBTN4")
                .setLabel(role4Emoji + " " + role4.name)
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
    }
    if (role5 != undefined){
        ReactButtons.addComponents(new MessageButton().setCustomId(role5.id + " ReactBTN5")
                .setLabel(role5Emoji + " " + role5.name)
                .setStyle('PRIMARY')
                .setDisabled(false),
        )
    }
    return ReactButtons;
}

module.exports = {reactEmbedGen, reactButtonGen}