const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const wait = require('node:util').promisify(setTimeout);
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
                    .setRequired(true)),
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
        await interaction.reply('Currently In Development. Will be released in prototype 2');
        /*
        const link = interaction.options.getString('link');
        //interaction.options.getString('caption');
        const caption = "Russia Gaming";
        const raw_imageDIR = "./Images/conversion/test.png";
        const capDIR = "./Images/conversion/caption.png";
        const cap_imageDIR = "./Images/conversion/CaptionedPic.png";
        try{
        await interaction.deferReply(); // Must be called in order to avoid the process from becoming an orphan.
        request.head(link, (err, res, body)=>{
            request(link)
                .pipe(fs.createWriteStream(raw_imageDIR))
        })
        const img_width = 1510;
        const img_height = 1521;
       console.log(await sharp(raw_imageDIR).metadata());
        const caption_height = img_height + img_height *.5;
        
        const svgImage = `
            <svg width="${img_width}" height="${img_height}">
              <style>
              .title { fill: "white"; stroke: "black"; stroke-width: 10px; font-size: 140px; font-weight: bold;}
              </style>
              <text x="50%" y="10%" text-anchor="middle" class="title">${caption}</text>
            </svg>
        `;
        const svgBuffer = Buffer.from(svgImage); // Something is going wrong here and there needs to be further tests made. Sometimes this will return the previous image as opposed to the image the user has requested.
        // Will need another engineer to test further.
        await sharp(svgBuffer).toFile(capDIR);
        await sharp(raw_imageDIR).composite([{input: capDIR,top: 100, left: 0,},]).toFile(cap_imageDIR); //Images can become pretty large, will take time to upload. 
        const file = new MessageAttachment(cap_imageDIR);
        await interaction.editReply({files:[file]}); //Image resizing in the future?
    }
    catch(err){
        await interaction.editReply({ content: "Error. Image did not process correctly!", ephemeral: true })
        console.log(err);
    }
    */
	}
}