const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ContextMenuCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv')

dotenv.config()

const clientId = process.env.CLIENT_ID
const token = process.env.BOT_TOKEN

const commands = []

/**
 * If you keep running into a path error then youare not running
 * "npm run deploy" or "npm start" in the root directory.
 * Root Directory should be ".../CSEBot-Project".
 * For example, your terminal should look like the command from below.
 * ".../CSEBot-Project> npm run deploy"
 * There is no need to move .env files and create a new package.json
 * files to run this script.
 * Please refer to the README for more info and please stop changing 
 * the paths and running the script in "CSEBot-Project/dbot"
 */

const commandFiles = fs.readdirSync('./dbot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);