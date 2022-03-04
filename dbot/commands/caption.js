const { SlashCommandBuilder } = require('@discordjs/builders');
const sharp = require("sharp")
const request = require('request')
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caption')
		.setDescription('Captions a linked image')
        .addStringOption(option =>                                               
                option.setName('link')
                    .setDescription('Image URL') 
                    .setRequired(false)),
        /*
        .addStringOption(option => 
            option.setName('caption')
                .setDescription('Text to add')
                .setRequired(true)),
        */
	async execute(interaction) {
        if(!interaction.isCommand()) return;
		if(!interaction.guild.available){ 
            await interaction.reply('I can not perform this operation in this guild.');
        }
        const link = interaction.options.getString('link');
        const caption = interaction.options.getString('caption');
        const dir = "./convertImages/test.png";
        
        request.head(link, (err, res, body)=>{
            request(link)
                .pipe(fs.createWriteStream(dir))
        })    
        try{
            console.log(await sharp(dir).metadata());
            await interaction.reply("Check the console.") // Only serves as an output for metadata. Does not actually caption images
        } catch(error){
            console.log(error);
            await interaction.reply("Failed to get image. Please try again!")
        }
        
        
	}
}