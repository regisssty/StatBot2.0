const Discord = require('discord.js');
const PREFIX = "=";
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
      .addField('Member Roles',
        `${guild.roles.find("name", "Member")}`)//This only display user roles at first join only
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

/* //guild member update
 bot.on("guildMemberUpdate", function(member) {
    let guild = member.guild;
    var embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .addField('Member Update [Roles]',
        `:pushpin: ${member.user} role has been updated from ${member.roles.id} to  ${member.roles.newMember}`)
      .addField('Member ID',
        `${member.id}`)
    bot.channels.find("name", "mod-log").sendEmbed(embed); // change general to your preferred TEXT channel. 
});  */

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
 
bot.on("message", async message => {
	
if(message.author.bot) return;
if(message.content.indexOf(PREFIX) !== 0) return;

var args = message.content.substring(PREFIX.length).split(" ");
const command = args.shift().toLowerCase();

//Bot command start here
//General commands
if(command === "help") {
  message.channel.sendMessage("__**Help Command**__\nPrefix: =\n\nhelp- Show this page\nping - Show Ping!\ninfo - Show StatBot information\nstat - Show StatBot's state\nuptime - Show how long StatBot's uptime\nsenthelp - Show sentinel help commands\nstaffhelp - Shop staff help commands\nsuperstaffhelp - Show super staff help commands");
}

if(command === "ping") {
  message.channel.sendMessage("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
}

if(command === "info") {
  message.channel.sendMessage("I am running on JavaScript created by @Rëgîš#6434");
}

if(command === "stat") {
message.channel.sendMessage("__**StatBot: Online**__\n*Version: 0.6.4a*");
}
if(command === "uptime") {
  message.channel.sendMessage("I have been online for " +upDays+ " Days, " +upHours+ " Hours, " +upMins+ " Minutes, " +upSecs+ " Seconds" );
}

//
//sentinel help command
if(command === "senthelp") {	
  if(!message.member.roles.some(r=>["Sentinel"].includes(r.name)) )
    return message.reply("you have no permission to use this command. Reason: You are not a Sentinel!"); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
/*   message.author.sendMessage("__**Sentinel Help Commands**__\n\nkick - Kick member from server"); */
  message.author.sendMessage("__**Sentinel Help Commands**__\n\nComing Soon!");
}

//
// mod, supermod, admin, owner help command
if(command === "staffhelp") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("you have no permission to use this command. Reason: You are not a staff!"); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.sendMessage("__**Staff Help Commands**__\n\nkick - Kick member from server\nban - Ban member from server");
}

//
// super mod, admin, owner help command
if(command === "superstaffhelp") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command. Reason: You are not a superstaff!"); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.sendMessage("__**SuperStaff Help Commands**__\n\nkick - Kick member\nban - Ban member");
}
//
//global help command for [SYSTEM], [DiscordOwner], [Admin], [Manager], [Moderator], [Sentinel]
if(command === "sayhelp") {
  if(!message.member.roles.some(r=>["YOUR KING", "2ns in command", "Super Moderator", "Moderator", "Sentinel"]) )
    return message.reply("Invalid command enter. Reason: Your roles for this command has been rejected.");

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.sendMessage("__**sayhelp command**__\n\nsay - [SYSTEM] msg (For host only)\nownersay - [DiscordOwner] msg (Owner of the discord server only)\nadminsay - [Admin] msg (Admin use)\nsupersay - [Manager] msg (Super Moderator use)\nmodsay - [Moderator] msg (Moderator use)\nsentsay - [Sentinel] msg (Sentinel use)");
}

//
//Staff command
if(command === "kick") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

let member = message.mentions.members.first();
if(!member)
  return message.reply("[Invalid mention] Please mention a valid member and indicate a reason for the kick.");

if(!member.kickable)
  return message.reply("I cannot kick this user.")

let reason = args.slice(1).join(' ');
if(!reason)
  return message.reply("[No reason detected] Please mention a valid member and indicate a reason for the kick.");

await member.kick(reason)
  .catch(error => message.reply(`Sorry ${message.author}, I couldn't kick because of : ${error}`));
message.reply(`has kicked ${member.user.tag} from server.\nKicked Member id: ${member.id}\nReason: ${reason}`);
}

if(command === "ban") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

let member = message.mentions.members.first();
if(!member)
  return message.reply("[Invalid mention] Please mention a valid member and indicate a reason for the ban.");

if(!member.bannable)
  return message.reply("I cannot ban this user.")

let reason = args.slice(1).join(' ');
if(!reason)
  return message.reply("[No reason detected] Please mention a valid member and indicate a reason for the ban.");

await member.ban(reason)
  .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban because of : ${error}`));
message.reply(`has banned ${member.user.tag} from server.\nBanned Member id: ${member.id}\nReason: ${reason}`);
}

//
//Super staff command

// global announce
// Host use only
if(command === "say") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[SYSTEM]** " + sayMessage);
}

//
// discord owner
if(command === "ownersay") {	
  if(!message.member.roles.some(r=>["YOUR KING"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[DiscordOwner]** " + sayMessage);
}

//
// admin
if(command === "adminsay") {	
  if(!message.member.roles.some(r=>["2nd in command"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Admin]** " + sayMessage);
}

//
// super mod
if(command === "supersay") {	
  if(!message.member.roles.some(r=>["Super Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Manager]** " + sayMessage);
}

//
// mod
if(command === "modsay") {	
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Moderator]** " + sayMessage);
}

//
//sentinel
if(command === "sentsay") {	
  if(!message.member.roles.some(r=>["Sentinel"].includes(r.name)) )
    return message.reply("You have no permission to use this command! If you think is an error, please take a screenshot of this issue and submit to us. Thanks"); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Sentinel]** " + sayMessage);
}
});




// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
