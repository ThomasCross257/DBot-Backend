const fs = require('fs')
const dotenv = require('dotenv')
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
// const profileSchema = require('./models/profileSchema')
// const pollModel = require('./models/pollSchema')

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ],
});

const TOKEN = process.env.BOT_TOKEN
const guildID = process.env.GUILD_ID;
// ^^ Included GUILD MEMBERS intent ... guidlMembersAdd should work now
client.commands = new Collection()
const cooldowns =  new Collection();

// Going to move this else where in a later version
// to reduce visual cluter
mongoose.connect(process.env.MONGO_ID,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true,
}).then(()=>{
	console.log("Database Connection established.");
}).catch((err) => {
	console.log("Error connecting to Mongo database.");
	console.log(err);
})

const eventFiles = fs.readdirSync('./dbot/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	console.log(`Loaded event ${event.name}`);
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
}

/* This wasn;t working and its too late at night for me to fix
   Please have mercy on my soul
const customCommandFiles = fs.readdirSync(`./dbot/commands/custom/${guildID}`).filter(file => file.endsWith('.js'));

for (const file of customCommandFiles) 
{
	const customCommand = require(`./commands/custom/${guildID}/${file}`);
    client.commands.set(customCommand.data.name, customCommand);
    console.log(`Loaded custom command ${customCommand.data.name}`);
}
*/
// Moved all the events in to the events folder

client.login(TOKEN)

module.exports = { 
	client: client
}
