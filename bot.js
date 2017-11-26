const Discord = require('discord.js');
const client = new Discord.Client();
//const yt = require('ytdl-core');
//const config = require('./config.json');

client.on('ready', () => {
    client.user.setPresence({game: {name: "Help command: <help", type: 0}});
    console.log('I am ready!');
});


//Old Function
client.on('message', message => {
    if (message.content === '<ping') {
    	message.channel.sendMessage('pong');
  	}
});
client.on('message', message => {
    if (message.content === '<bot') {
    	message.reply('Here are the current bot hosted by @Rëgîš#6434.\n__*Moderation*__\n@ModBot#3385\n\n__*MusicBot*__\n@Bonlicious#3934\n@DELICIOUS#5285\n@RegisBot#6361\n@SpeakBot#2502\n@SpeakBot#2589\n@SpeakBot#2812\n@BON BOT SLAVE#2874\n\n__*GameTracker*__\n@GameTracker#0585');
  	}
});
client.on('message', message => {
    if (message.content === '<version') {
    	message.channel.sendMessage('**StatBot is running on JavaScript.**\n**Version: 0.4.3**');
  	}
});
client.on('message', message => {
    if (message.content === '<stat') {
    	message.channel.sendMessage('__**Stats: ONLINE**__');
  	}
});
client.on('message', message => {
    if (message.content === '<help') {
    	message.channel.sendMessage('__**Help Commands**__\n\n*<help - Show help commands*\n*<ping - Reply pong*\n*<bot - Show the list of bot hosted by Regis*\n*<version - Show StatBot version*\n*<stat - Show StatBot stats*');
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
