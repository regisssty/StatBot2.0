const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

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
    	message.channel.sendMessage('**StatBot is running on JavaScript.**\n**Version: 0.4.2**');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
