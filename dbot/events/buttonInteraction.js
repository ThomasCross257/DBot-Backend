const pollModel = require('../models/profileSchema');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
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
				interaction.reply({content:"Your response has been recorded.", ephemeral: true}); //Ephemeral response for some reason doesn't work?
			}
			if (interaction.customId.includes('PollButton')){ // Untested Code. Having trouble with InteractionCreate
				const customID = interaction.customId
				const IDArr = customID.split(" ");
				var pollNumID = IDArr[0]
				var pollOptionID = IDArr[1];
				console.log(pollOptionID);
				console.log(pollNumID);
				pollModel.find({pollID: pollNumID}, (res)=>{
					if(res[0].votedUsers.includes(interaction.member.user.id)){
						interaction.reply({content:"You have already voted in this poll!", ephemeral: true});
					}
					else{
						res[0].votedUsers.push(interaction.member.user.id);
						if (pollOptionID == "PollButton_1"){
							pollModel.updateOne({pollID: pollNumID,},
								{$inc: {option1: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_2"){
							pollModel.updateOne({pollID: pollNumID,},
								{$inc: {option2: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_3"){
							pollModel.updateOne({pollID: pollNumID,},
								{$inc: {option3: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_4"){
							pollModel.updateOne({pollID: pollNumID,},
								{$inc: {option4: 1}}).exec();
						}
						interaction.editReply({content:"Your response has been recorded.", ephemeral: true});
					}
				})
			}
			if(interaction.customId.includes("ReactBTN")){
				console.log(interaction);
			}
		}
		else{
			return;
		}
    }
}