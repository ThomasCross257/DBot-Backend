const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv')

dotenv.config()

const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.BOT_TOKEN

const commands = []

/*
To any Backened dev having issues with the deploy-commands.js file. Follow these steps.

1. Change directories in index.js from ./dbot/commands and ./dbot/events To ./commands and ./events).

2. Move the .env file into dbot's directory  and use node deploy-commands.js

3. Reverse the above steps (aside from node deploy-commands.js and don't change const command = require(`./commands/${file}`)) to run and test the bot.
*/

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//const commandFiles = fs.readdirSync('./dbot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);