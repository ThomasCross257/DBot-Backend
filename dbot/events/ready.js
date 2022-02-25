/**
 * Fabian T. 2/24/22
 * Fixed commit 'Add files via upload'
 * ready.js will crash from a Type Error
 * since client was undefined.
 * Also please move the rest of the description
 * into the 'about me' settings in the 
 * Discord Developer page.
 */

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(																	// Going to repeat myself here
			`I am in ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? 's': ''}!`,	// but it works for now
			{type: 'PLAYING'},																		// will update later
		);
		let interval_id = setInterval((client) => {
			console.log('setInteveral called');
			if(!client) {console.log('Client not found clearing interveral!');clearInterval(interval_id); return;}
			client.user.setActivity(
				`I am in ${client.guilds.cache.size} server${client.guilds.cache.size > 1 ? 's': ''}!`,
				{type: 'PLAYING'},
			);
			console.log('done');
		}, 300000, client);	// Set to update every 5 mintues
	}
};