const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');
const config = require('./config.json');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](msg);
});

const commands = {
	'help': (msg) => {
		let tosend = ['```xl', config.prefix + 'join : "Join Voice channel of msg sender"',	config.prefix + 'add : "Add a valid youtube link to the queue"', config.prefix + 'queue : "Shows the current queue, up to 15 songs shown."', config.prefix + 'play : "Play the music queue if already joined to a voice channel"', '', 'the following commands only function while the play command is running:'.toUpperCase(), config.prefix + 'pause : "pauses the music"',	config.prefix + 'resume : "resumes the music"', config.prefix + 'skip : "skips the playing song"', config.prefix + 'time : "Shows the playtime of the song."',	'volume+(+++) : "increases volume by 2%/+"',	'volume-(---) : "decreases volume by 2%/-"',	'```'];
		msg.channel.sendMessage(tosend.join('\n'));
	};

//Old Function
//client.on('message', message => {
    //if (message.content === 'ping') {
    //	message.channel.sendMessage('pong');
  //	}
//});
//client.on('message', message => {
    //if (message.content === 'bot') {
    //	message.reply('Here are the current bot hosted by @Rëgîš#6434.\n__*Moderation*__\n@ModBot#3385\n\n__*MusicBot*__\n@Bonlicious#3934\n@DELICIOUS#5285\n@RegisBot#6361\n@SpeakBot#2502\n@SpeakBot#2589\n@SpeakBot#2812\n@BON BOT SLAVE#2874\n\n__*GameTracker*__\n@GameTracker#0585');
  //	}
//});
//client.on('message', message => {
    //if (message.content === 'version') {
    //	message.channel.sendMessage('**StatBot is running on JavaScript.**\n**Version: 0.4.2**');
  //	}
//});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
