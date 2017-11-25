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
// Uptime
client.on('message', message => {
 if (message.content === '<uptime') {
    var time = process.uptime();
function dhm(t){
var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor( (t - d * cd) / ch),
    m = Math.round( (t - d * cd - h * ch) / 60000),
    pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
h++;
m = 0;
  }
  if( h === 24 ){
d++;
h = 0;
  }
  return [d, pad(h), pad(m)].join(':');
}
  message.channel.sendMessage(dhm(time)); 
 }});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
