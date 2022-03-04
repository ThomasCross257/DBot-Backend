module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		client = interaction.client
		if (!interaction.isCommand()) {
			return;
		}
		/*
		else if (!interaction.isButton()){
			return interaction;
			
			if (interaction.customID === "mtrivia"){
				interaction.reply({content:"Test.", ephemeral: true});
			}
			
		}*/
		const command = client.commands.get(interaction.commandName);

		if (!command){
			return;
		} 

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};