const pollModel = require('../models/pollSchema');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()){
			console.log(interaction);
			if (interaction.customId.includes(' -triv')){ //Trivia interaction manager.
				const usrAns = interaction.customId.replace(' -triv', '');
				if(usrAns == correct_answer){
					gotCorrect = true;
				}
				else{
					gotCorrect = false;
				}
				interaction.reply({content:"Your response has been recorded.", ephemeral: true});
			}
			if (interaction.customId.includes('PollButton')){  // Poll Interaction Manager
				const customID = interaction.customId
				const IDArr = customID.split(" ");
				const pollNumID = IDArr[0]
				const pollOptionID = IDArr[1];
				const UserID = interaction.member.user.id;
				pollModel.find({pollID: pollNumID }, (err,res) => {
					if(res[0].votedUsers.includes(UserID)){
						interaction.reply({content:"You have already voted in this poll!", ephemeral: true});
					}
					else{
						if (pollOptionID == "PollButton_1"){
							pollModel.updateOne(
								{pollID: pollNumID,},
								{$inc: {option1: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_2"){
							pollModel.updateOne(
								{pollID: pollNumID,},
								{$inc: {option2: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_3"){
							pollModel.updateOne(
								{pollID: pollNumID,},
								{$inc: {option3: 1}}).exec();
						}
						else if(pollOptionID == "PollButton_4"){
							pollModel.updateOne(
								{pollID: pollNumID,},
								{$inc: {option4: 1}}).exec();
						}
						pollModel.updateOne(
							{pollID: pollNumID,},
							{$push: {votedUsers: [UserID] }}).exec();
						interaction.reply({content:"Your response has been recorded.", ephemeral: true});
					}
				})
			}
			if(interaction.customId.includes("ReactBTN")){ // Role Reaction Manager
				console.log(interaction);
				const ReactID = interaction.customId.split(" ");
				const roleID = ReactID[0];
				var roleNameArr = [];
				for (let i = 1; i < ReactID.length; i++){
					if(ReactID === "ReactBTN"){
						break;
					}
					else{
						roleNameArr[i] = ReactID[i]
					}
				}
				roleNameArr.pop();
				const roleName = roleNameArr.join(' ');
				console.log(roleName)
				if(interaction.member.roles.cache.find(r => r.id === roleID)){
					interaction.member.roles.remove(roleID);
					interaction.reply({ content: "Removed role " + roleName + " from " + interaction.member.user.tag, ephemeral: true} );
				}
				else{
					interaction.member.roles.add(roleID);
					interaction.reply({content: "Gave role " + roleName + " to " + interaction.member.user.tag, ephemeral: true} );
				
				}
				
			}
		}
		else{
			return;
		}
    }
}