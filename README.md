# Discord TR Bot
This is a chat-bot for analyzing the game [The Reincarnation](https://www.the-reincarnation.com/about.php), an online game where one plays the role of an ancient mage. The bot here is used to analyze unit pairings, their strengths/weakness, and other statistical shenanigans.


## Creating a Bot
You need to first apply for a bot-application on Discord [here](https://discord.com/developers/applications)

The bot will need privilege to access guild messages and reply to messages. Once the privileges are enabled the bot will need to be authorized onto specific server(s) via the generated OAuth URL.

We also need to grab the access `TOKEN` that will allow the bot to sign-on.

## Run the Bot
This depends on node-16/18 and `discord.js`. 
- Put the TOKEN into the `.env` file
- Install dependencies: `npm install`
- Run the bot: `node index.js`


## Interacting with the Bot
