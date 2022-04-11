<div>
    <h1 align='center'>
        <br>
            <img src="https://github.com/ThomasCross257/CSEBot-Project/blob/prototype_1/res/D-BotLogo2.png?raw=true" alt="DBot">
        <br>
            CSEBot - Dbot: Prototype-1
        <br>
    </h1>
</div>

CSEBot is a Discord bot called D-Bot, for our CSE 4550 class.  
D-Bot is fully modular, which allows you to plug and play with commands at ease.  
Currently D-Bot supports the following commands:  
- Ban
    - Will ban a user from the server.
- Fix
    - Will replace a broken twitter links with 'fxtwitter' to view embeds.
- Kick
    - Will kick a user from a server.
- Ping
    - Will reply to user with the message 'Pong!'
- Play
    - Will stream YouTube audio from any given link.
- Meme
    - Will post a random meme from reddit.
- Clear
    - Will clear any messages (specified or not) from the current channel.
- Trivia
    - Allows the user to answer trivia commands within a set interval.
- Poll
    - User can create a poll that will last for however many minutes the user specifies with a maximum of four options.
    


<br>

# Installation
Installation is as simple as cloning the Github repository.  
First, simply clone the repo into your desired folder and cd into CSEBot-Project.  
```bash
git clone https://github.com/ThomasCross257/CSEBot-Project.git
cd CSEBot-Project
```
Second, run the following command to install the build dependencies  
```bash
npm install
```
Third, setup your system variables, by either editing your path variables or by env file.  
D-Bot will require you to have the following variables  
1. BOT_TOKEN
2. CLIENT_ID
3. GUILD_ID (Optional in case you'd like to have a guild-exclusive version with your own commands.)
4. DASHBOARD_PORT
5. MONGO_ID
6. CLIENT_SECRET
7. SERVER_SECRET
<!-- -->
Finally, you can run D-bot by running the following command in the root folder
```bash
npm run
```
and if you wish to deploy your newly added commands run the following command in the root folder
```bash
npm run deploy
```

We also have a website with a more user-friendly and easily traversable manual, you can visit it at d-bot.me

With our repository: https://github.com/ThomasCross257/CSEBotWebsite
