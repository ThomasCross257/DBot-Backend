<div>
    <h1 align='center'>
        <br>
            <img src="https://github.com/ThomasCross257/CSEBot-Project/blob/prototype_1/res/D-BotLogo2.png?raw=true" alt="DBot">
        <br>
            Dbot
        <br>
    </h1>
</div>

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
- GuessTheWord
    - Allows the user to guess a word given the definition.
- Caption
    - Allows the user to caption images as they see fit in impact font styling

Additionally, users can join the D-Bot official server to add the CSUSB News webhook to their channel and receive automated messages from @CSUSBNews on Twitter to their channel.
    


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

Optionally, you download these two repositories if you'd like to create and run your own react website and create custom commands for your own server.

Clone these repositories
```bash
git clone https://github.com/lumix103/dbot_api
git clone https://github.com/lumix103/dbot_dashboard

cd dbot_api
cd dbot_dashboard
```
run npm i in the terminal for both directories before moving any further.

Run dbot_api first by compliling the index file, then run dbot_dashboard using npm run dev.

You will now be able to run custom commands through your own bot on your own MongoDB database or ours if you want to be a leecher :p.

We also have a website with a more user-friendly and easily traversable manual, you can visit it at d-bot.me

With our repository: https://github.com/ThomasCross257/CSEBotWebsite
