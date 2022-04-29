const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a Youtube video in voice chat')
        .addSubcommand(subcommand =>
            subcommand
                .setName('link')
                .setDescription('Enter a link')
                .addStringOption(option => 
                    option.setName('url')
                        .setDescription('URL to Youtube video')
                        .setRequired(true))),
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        if(!interaction.guild.available) return interaction.reply('I can not perform this operation in this guild.');
        if(!interaction.member.voice) return interaction.reply('You are not in a voice channel.');

        if(interaction.options.getSubcommand() == 'link') {
            const url = interaction.options.getString('url');
            interaction.reply("Now playing: " + url)
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator
            })  
            const stream = ytdl(url, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();
    
            player.play(resource);
            connection.subscribe(player);
            
            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        }
    } 
}