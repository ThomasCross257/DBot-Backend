const profileModel = require('../models/profileSchema')
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        console.log(member)
        console.log("Guildmemberadd successful.")
        let newUser = await profileModel.create({
            userID: member.id,
            serverID: member.guild.id,
            experience: 0,
            level: 1,
        });
        newUser.save(function(err){
        if (err){ 
            console.log(err);
            console.log(member.id);
            console.log(member.guild.id);
        }
        });
    }
}