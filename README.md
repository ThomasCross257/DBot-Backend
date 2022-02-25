<div>
    <h1 align='center'>
        <br>
            <img src="https://github.com/ThomasCross257/CSEBot-Project/blob/prototype_1/res/D-BotLogo2.png?raw=true" alt="DBot">
        <br>
            CSEBot - Dbot
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
3. GUILD_ID
<!-- -->
Finally, you can run D-bot by running the following command in the root folder
```bash
npm run
```
and if you wish to deploy your newly added commands run the following command in the root folder
```bash
npm deploy
```
