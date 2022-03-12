const fs = require('fs')
const dotenv = require('dotenv')
const {Client, Collection, Intents} = require('discord.js')
const mongoose = require('mongoose');
const profileSchema = require('./models/profileSchema')

dotenv.config()

const TOKEN = process.env.BOT_TOKEN
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, 
		Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
})

client.commands = new Collection()
const cooldowns =  new Collection();

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
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandFiles = fs.readdirSync('./dbot/commands').filter(file => file.endsWith('.js'));
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Loaded command ${command.data.name}`);
}

client.on('interactionCreate', async (interaction)=>{
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
	}
	else{
		return;
	}
});
client.on('guildMemberAdd', async member=>{ //guildMemberAdd doesn't seem to be triggering whenever a member joins the server.
	
	console.log("Guildmemberadd successful.")
	let newUser = await profileSchema.create({
		userTag: member.id,
    	serverID: member.guild.id,
    	experience: 0,
    	level: 1,
	});
	newUser.save(function(err){
		if (err){ 
			console.long(err);
			console.log(member.id);
			console.log(member.guild.id);
		}
	});
	
});

client.login(TOKEN)