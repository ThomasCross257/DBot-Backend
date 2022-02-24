const fs = require('fs')
const dotenv = require('dotenv')
const {Client, Collection, Intents} = require('discord.js')

dotenv.config()

const TOKEN = process.env.BOT_TOKEN
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES],
})

client.commands = new Collection()
const cooldowns =  new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Loaded command ${command.data.name}`);
}


client.login(TOKEN)