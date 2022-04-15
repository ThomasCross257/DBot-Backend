const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('fix')
        .setType(3),                                       
	async execute(interaction) {
        const message = interaction.targetMessage.content;
        console.log(message);
        if(message.includes("https://twitter.com")){
            await interaction.reply(message.replace('https://twitter.com', 'https://fxtwitter.com') + " **(Fixed by D-Bot)**");
        }
        else{
            await interaction.reply({content: "This is not a valid twitter URL", ephemeral: true});
        }
       
	}
}