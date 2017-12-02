const Discord = require('discord.js');
var bot = new Discord.Client();

//time travel
var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0


bot.on("message", function (message) {
    console.log(message.content);
    bot.user.setPresence({game: {name: "with Regis!", type: 0}});
    //bot.user.setPresence({game: {name: "Maintenance Mode", type: 0}});
    //bot.user.setPresence({game: {name: "Sleep Mode", type: 0}});
});
 
//Welcome and promote new member 
 bot.on("guildMemberAdd", function(member) {
    if (member.bot) {
      let guild = member.guild;
      var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Bot Update',
        `:pushpin: :wave: ${member.user} Bot Joined.`)
      .addField('Bot ID',
        `${member.id}`)
      bot.channels.find("name", "mod-log").sendEmbed(embed); // announce on preferred text channel.  
    } else {

    let guild = member.guild;
    var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Member Update',
        `:pushpin: :white_check_mark: ${member.user} has joined the server!`)
      .addField('Member ID',
        `${member.id}`)
    bot.channels.find("name", "mod-log").sendEmbed(embed); // announce on preferred text channel. 
    member.addRole(member.guild.roles.find("name", "Member")); //Grant roles if is user
}
});

//If user left the server, announce it
 bot.on("guildMemberRemove", function(member) {
    if (member.bot) {
      let guild = member.guild;
      var embed = new Discord.RichEmbed()
      .setColor(0xff0505)
      .setTimestamp()
      .addField('Bot Update',
        `:pushpin: :x: ${member.user} Bot Lefted.`)
      .addField('Bot ID',
        `${member.id}`)
      bot.channels.find("name", "mod-log").sendEmbed(embed); // announce on preferred text channel.  
    } else {

    let guild = member.guild;
    var embed = new Discord.RichEmbed()
      .setColor(0xff0505)
      .setTimestamp()
      .addField('Member Update',
        `:pushpin: :x: ${member.user} has lefted the server!`)
      .addField('Member ID',
        `${member.id}`)
    bot.channels.find("name", "mod-log").sendEmbed(embed); // announce on preferred text channel. 
}
});

//real time
setInterval(function() {

        upSecs = upSecs + 1
        if (upSecs >= 60) {
            upSecs = 0
            upMins = upMins + 1
		}
        if (upMins >= 60) {
            upMins = 0
            upHours = upHours + 1
		}
        if (upHours >= 60) {
            upHours = 0
            upDays = upDays + 1
		}

},1000)
 
//Bot command function for everyone to use such as test respond of the bot to user. 
bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;
 
    if (!message.content.startsWith(PREFIX)) return;
 
    var args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0].toLowerCase()) {
        case "help":
            message.channel.sendMessage("__**Help Command**__\n\n\ncping - Show Ping!\ncinfo - Show StatBot information\ncstat - Show StatBot's state");
            break;
        case "ping":
            message.channel.sendMessage("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
            break;
        case "info":
            message.channel.sendMessage("I am running on JavaScript created by @Rëgîš#6434");
            break;
        case "stat":
            message.channel.sendMessage("__**StatBot: Online**__\n*Version: 0.6.2*");
            break;
        case "uptime":
            message.channel.sendMessage("I have been online for " +upDays+ " Days, " +upHours+ " Hours, " +upMins+ " Minutes, " +upSecs+ " Seconds" );
            break;
        default:
            message.channel.sendMessage("Invalid command issued~");
    }
});



// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
