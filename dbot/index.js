const fs = require('fs')
const dotenv = require('dotenv')
const {Client, Collection, Intents} = require('discord.js')

dotenv.config()

const TOKEN = process.env.BOT_TOKEN
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
})

client.commands = new Collection()
const cooldowns =  new Collection();

const eventFiles = fs.readdirSync('./dbot/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandFiles = fs.readdirSync('./dbot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Loaded command ${command.data.name}`);
	// Main error comes from here. Command may be loaded in. All commands load in normally, however when when it reaches trivia.js it throws this:
	/*
			S[50035]: Invalid Form Body
			9.options[2].name[STRING_TYPE_REGEX]: String value did not match validation regex.
			9.options[3].name[STRING_TYPE_REGEX]: String value did not match validation regex.
			9.options[4].name[STRING_TYPE_REGEX]: String value did not match validation regex.
			9.options[5].name[STRING_TYPE_REGEX]: String value did not match validation regex.
			9.options[6].name[STRING_TYPE_REGEX]: String value did not match validation regex.
			    at Q.runRequest (C:\Users\Mike Rowe Soft\Documents\CSEBot-Project\node_modules\@discordjs\rest\dist\index.js:7:581)
			    at processTicksAndRejections (node:internal/process/task_queues:96:5)
			    at async Q.queueRequest (C:\Users\Mike Rowe Soft\Documents\CSEBot-Project\node_modules\@discordjs\rest\dist\index.js:5:2942) {
			  rawError: {
			    code: 50035,
			    errors: { '9': [Object] },
			    message: 'Invalid Form Body'
			  },
			  code: 50035,
			  status: 400,
			  method: 'put',
			  url: 'https://discord.com/api/v9/applications/938563118055952405/guilds/935294243667337226/commands',
			  requestBody: {
			    files: undefined,
			    json: [
			      [Object], [Object],
			      [Object], [Object],
			      [Object], [Object],
			      [Object], [Object],
			      [Object], [Object]
			    ]
			  }
			}
	 */ 
}


client.login(TOKEN)