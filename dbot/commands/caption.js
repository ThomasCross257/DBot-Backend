const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caption')
		.setDescription('Captions a linked image')
        .addStringOption(option =>                                               
                option.setName('link')
                    .setDescription('Image URL') 
                    .setRequired(true))
        .addStringOption(option => 
            option.setName('toptext')
                .setDescription('Top Text of the meme')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('bottomtext')
                .setDescription('Bottom Text of the meme')
                .setRequired(false)),
	async execute(interaction) {
        if(!interaction.isCommand()) return;
		if(!interaction.guild.available){ 
            await interaction.reply('I can not perform this operation in this guild.');
        }
        const IMG_URL = interaction.options.getString('link');
        const TopText = interaction.options.getString('toptext');
        const BottomText = interaction.options.getString('bottomtext');
        console.log(TopText);
        console.log(BottomText)
        const bg = await Canvas.loadImage(IMG_URL);
        const width = bg.width;
        const height = bg.height;
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        console.log(canvas);
        // Used Discord.js tutorial implementation.
        const TextBounds = (canvas, text) => {
            const context = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 100;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                context.font = `${fontSize -= 10}px Impact`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (context.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return context.font;
        };

        ctx.font = TextBounds(canvas, TopText);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = 'black';
        ctx.textAlign = "center";
        ctx.drawImage(bg, 0, 0, width, height);
        ctx.fillText(TopText, width / 2, height / 6.5, width);
        ctx.strokeText(TopText, width / 2, height / 6.5, width);
        if (BottomText != null){
            ctx.font = TextBounds(canvas, BottomText);
            ctx.fillText(BottomText, width / 2, height, width);
            ctx.strokeText(BottomText, width / 2, height, width); 
        }
        console.log(ctx);
        const captionedImage = new MessageAttachment(canvas.toBuffer(), 'captionpic.png');

        await interaction.reply({files: [captionedImage]});
    }
}