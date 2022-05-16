const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('fix')
        .setType(3),                                       
	async execute(interaction) {
        const message = interaction.targetMessage.content;
        console.log(message);
        if(message.includes("https://twitter.com")){
            await interaction.reply(message.replace('https://twitter.com', 'https://vxtwitter.com') + " **(Fixed by D-Bot)**");
        }// Due to the sudden shutdown of fxtwitter, vxtwitter will substitute as a stand in for now.
        // Unfortunately, videos will no longer function properly with this change.
        else if(message.includes("https://mobile.twitter.com")){
            await interaction.reply(message.replace('https://mobile.twitter.com', 'https://vxtwitter.com') + " **(Fixed by D-Bot)**");
        }
        else{
            await interaction.reply({content: "This is not a valid twitter URL", ephemeral: true});
        }
       
	}
}