const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ContextMenuCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv')

function customCommandRegister(){

dotenv.config()

const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
const token = process.env.BOT_TOKEN

const customCommands = []

const customCommandFiles = fs.readdirSync(`./dbot/commands/custom/${guildId}`).filter(file => file.endsWith('.js'));

for (const file of customCommandFiles) {
	const customCommand = require(`./commands/custom/${guildId}/${file}`);
	customCommands.push(customCommand.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: customCommands })
	.then(() => console.log('Successfully registered custom commands.'))
	.catch(console.error);
}

module.exports = customCommandRegister;