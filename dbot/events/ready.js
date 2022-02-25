module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const arrayOfStatus = [`I am in ${client.guilds.cache.size} server(s)!`, 
                           `Prefix is '~'!`, 
                           `Dbot!`,
                            ];
     let index = 0;
     setInterval(() => {
         if(index === arrayOfStatus.length) index = 0;
         const status = arrayOfStatus[index];
         client.user.setActivity(status,{type: "PLAYING"}).catch(console.error)
         index++;

     }, 5000)    
	},
};