const Discord = require('discord.js');
const PREFIX = "c";
var bot = new Discord.Client();

bot.on("message", function (message) {
    console.log(message.content);
    bot.user.setPresence({game: {name: "with Regis!", type: 0}});
    //bot.user.setPresence({game: {name: "Maintenance Mode", type: 0}});
    //bot.user.setPresence({game: {name: "Sleep Mode", type: 0}});
});
 
//Welcome and promote new member 
 bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "mod-log").sendMessage(":pushpin: :white_check_mark: " + member.toString() + " (" + member.id + ") join the server.");

    member.addRole(member.guild.roles.find("name", "Member"));
});

//If user left the server, announce it
 bot.on("guildMemberRemove", function(member) {
    member.guild.channels.find("name", "mod-log").sendMessage(":pushpin: :x: " + member.toString() + " (" + member.id + ") left the server.");

});
 
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
            message.channel.sendMessage("__**StatBot: Online**__\n*Version: 0.5c [Alpha Build]*");
            break;
        default:
            message.channel.sendMessage("Invalid command issued~");
    }
});



// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
