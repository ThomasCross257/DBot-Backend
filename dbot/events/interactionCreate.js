module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		client = interaction.client
		if (!interaction.isCommand()) {
			return;
		}
		const command = client.commands.get(interaction.commandName);
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		if (interaction.isButton()){
			console.log(interaction);
			if (interaction.customId.includes(' -triv')){
				const usrAns = interaction.customId.replace(' -triv', '');
				if(usrAns == correct_answer){
					gotCorrect = true;
				}
				else{
					gotCorrect = false;
				}
				interaction.reply({content:"Your response has been recorded."}, {ephemeral: true}); //Ephemeral response for some reason doesn't work?
			}
			else if(interaction.customId.includes('PollButton')){
				return;
			}
		}
		else{
			return;
		}
		if (!command){
			return;
		} 
	},
};