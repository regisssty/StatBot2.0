const Discord = require('discord.js');
const PREFIX = "=";
var bot = new Discord.Client();

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//time travel
var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0

//debug system
//bot.on("error", (e) => console.error(e));
//bot.on("warn", (e) => console.warn(e));
//bot.on("debug", (e) => console.info(e));

//Bot and system version
var MODver = `ModBot v0.7.3`;
var RepVer = `ReportSystem v0.1.66`;

bot.on("message", function (message) {
    console.log(message.content);
    //bot.user.setPresence({game: {name: "Help command: =help", type: 0}});
    //bot.user.setPresence({game: {name: "Maintenance Mode", type: 0}});
    //bot.user.setPresence({game: {name: "Sleep Mode", type: 0}});
    bot.user.setPresence({game: {name: `${bot.users.size} users`, type: 2}});
});
 
//Welcome and promote new member 
 bot.on("guildMemberAdd", function(member) {
    if (member.bot) {
      let guild = member.guild;
      var embed = new Discord.RichEmbed()
      .setColor(0x15f153)
      .setTimestamp()
      .setFooter(MODver)
      .addField('Bot Update',
        `:pushpin: :wave: ${member.user} Bot Joined.`)
      .addField('Bot ID',
        `${member.id}`)
      .addField('Message',
        `Hi ${member.user.tag}, welcome to **bijs discord server**!\nMake sure you have read our rules and guides at #welcome .\nGo see what are the current game category we have, type **=games**.\nEnjoy and have lots of lots of funs!`)
      bot.channels.find("name", "member-log").send(embed); // announce on preferred text channel.  
    } else {

    let guild = member.guild;
    var embed = new Discord.RichEmbed()
      .setColor(0x015f153)
      .setTimestamp()
      .setFooter(MODver)
      .addField('Member Update',
        `:pushpin: :white_check_mark: ${member.user} has joined the server!`)
      .addField('Member ID',
        `${member.id}`)
      .addField('Member Roles',
        `${guild.roles.find("name", "GREEN CLUB")}`)//This only display user roles at first join only
      .addField('Message',
        `Hi ${member.user.tag}, welcome to **bijs discord server**!\nMake sure you have read our rules and guides at #welcome .\nGo see what are the current game category we have, type **=games**.\nEnojy and have lots of lots of funs!`)
    bot.channels.find("name", "member-log").send(embed); // announce on preferred text channel. 
    member.addRole(member.guild.roles.find("name", "GREEN CLUB")); //Grant roles if is user
}
});

//If user left the server, announce it
 bot.on("guildMemberRemove", function(member) {
    if (member.bot) {
      let guild = member.guild;
      var embed = new Discord.RichEmbed()
      .setColor(0xff0505)
      .setTimestamp()
      .setFooter(MODver)
      .addField('Bot Update',
        `:pushpin: :x: ${member.user} Bot Left.`)
      .addField('Bot ID',
        `${member.id}`)
      bot.channels.find("name", "member-log").send(embed); // announce on preferred text channel.  
    } else {

    let guild = member.guild;
    var embed = new Discord.RichEmbed()
      .setColor(0xff0505)
      .setTimestamp()
      .setFooter(MODver)
      .addField('Member Update',
        `:pushpin: :x: ${member.user} has left the server!`)
      .addField('Member ID',
        `${member.id}`)
    bot.channels.find("name", "member-log").send(embed); // announce on preferred text channel. 
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
 
bot.on("message", async message => {
	
if(message.author.bot) return;
if(message.content.indexOf(PREFIX) !== 0) return;
var args = message.content.substring(PREFIX.length).split(" ");
const command = args.shift().toLowerCase();

//Bot command start here
//General commands
if(command === "help") {

    var embed = new Discord.RichEmbed()
      .setColor('0x6449B4')
      .setTitle("__**Help command**__")
      .setDescription("Prefix: =")
      .addField("List of commands", "help- Show this page\nreport - Report user E.G(report mention_user reason)\nping - Show Ping!\ninfo - Show ModBot information\nstat - Show ModBot's state\nuptime - Show how long ModBot's uptime\nuserinfo - Display information of the user", true)
    message.channel.send(embed);
}

if(command === "ping") {
  message.channel.send("The respond between you to ModBot is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
}

if(command === "info") {
  //message.channel.sendMessage("I am running on JavaScript created by @Rëgîš#6434");
/*   message.channel.sendMessage("Hi im ModBot, I love to eat pie."); */
    var embed = new Discord.RichEmbed()
      .setColor('0x6449B4')
      .setTitle("About ModBot")
      .setDescription("ModBot is a java programmed discord bot created by @Rëgîš#6434 base on discord.js library.\nThe porpose of making this bot is to actually auto assign roles to new user who join our server as you might have know that everyone is too common. We want something special, nice, friendly and give us the way to make things go around to our favor so we can deliver the good stuff to you and enjoy.")
      .setThumbnail("https://cdn.discordapp.com/avatars/337177231841427478/6b7450d4757c58fc1c689ed62d259223.png")
      .setFooter("Version 0.7.3")
    message.channel.send(embed);
}

if(command === "stat") {
message.channel.send("**ModBot: __Online__**");
}

if(command === "uptime") {
  message.channel.send("Uptime: " +upDays+ " Days, " +upHours+ " Hours, " +upMins+ " Minutes, " +upSecs+ " Seconds" );
}

if(command === "games") {
    var embed = new Discord.RichEmbed()
      .setColor('0x6449B4')
      .setTitle("__**Game Category List**__")
      .addField("Here are the current avaliable games category on bijs discord", "**=lol** - League of Legends\n**=pubg** - PLAYERUNKNOWN'S BATTLEGROUNDS\n**=cs:go** - CS:GO\n**=ark** - Ark Survival\n**=dota** - dota/2\n**=overwatch** - OverWatch\n**=gta** - GTA\n**=watchdogs** - WatchDogs\n**=thecrew** - TheCrew\n**=roblox** - Roblox\n");
    message.channel.send(embed);
}

if(command === "report") {

let member = message.mentions.members.first();
if(!member) return message.channel.send("User not found!");
let reason = args.slice(1).join(' ');
if(!reason) return message.channel.send("No reason detected!");
message.delete().catch(O_o=>{});

    var embed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#ffff00")
      .setTimestamp()
      .setFooter(RepVer)
      .addField("Reported User", `${member} with ID: ${member.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Reason", reason)
    bot.channels.find("name", "report").send(embed).then(console.log(`[INFO] User: ${message.author.tag} issued command report!`));
}

if (command === "userinfo") {
let member = message.mentions.members.first();
if (!member) return message.channel.send("Invalid user. Please provide a valid **Mention**.");
message.channel.send(`**UserInfo:** ${member} **ID:** ${member.id}`);
}
//
//sentinel help command
if(command === "senthelp") {	
  if(!message.member.roles.some(r=>["Sentinel"].includes(r.name)) )
    return message.reply("You have no permission to use this command. Reason: You are not a Sentinel!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command senthelp!`)); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
/*   message.author.sendMessage("__**Sentinel Help Commands**__\n\nkick - Kick member from server"); */
  message.author.send("__**Sentinel Help Commands**__\n\\nmute - Mute user from voice and text channel").then(console.log(`[INFO] User: ${message.author.tag} issued command senthelp!`));
}

//
// mod, supermod, admin, owner help command
if(command === "staffhelp") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command. Reason: You are not a staff!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command staffhelp!`)); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.send("__**Staff Help Commands**__\n\nkick - Kick member from server\nban - Ban member from server\nmute - Mute user from voice and text channel").then(console.log(`[INFO] User: ${message.author.tag} issued command staffhelp!`));
}

//
// super mod, admin, owner help command
if(command === "superstaffhelp") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command. Reason: You are not a superstaff!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command superstaffhelp!`)); 

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.send("__**SuperStaff Help Commands**__\n\nkick - Kick member\nban - Ban member from server\nmute - Mute user from voice and text channel").then(console.log(`[INFO] User: ${message.author.tag} issued command superstaffhelp!`));
}
//
//global help command for [SYSTEM], [DiscordOwner], [Admin], [Manager], [Moderator], [Sentinel]
//============
if(command === "sayhelp") {
  if(!message.member.roles.some(r=>["YOUR KING", "2ns in command", "Super Moderator", "Moderator", "Sentinel"]) )
    return message.reply("Invalid command enter. Reason: Your roles for this command has been rejected.").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command sayhelp!`));

  message.reply(":mailbox_with_mail: I have DM you the command.");
  message.author.send("__**sayhelp command**__\n\nsay - [SYSTEM] msg (For host only)\nownersay - [DiscordOwner] msg (Owner of the discord server only)\nadminsay - [Admin] msg (Admin use)\nsupersay - [Manager] msg (Super Moderator use)\nmodsay - [Moderator] msg (Moderator use)\nsentsay - [Sentinel] msg (Sentinel use)").then(console.log(`[INFO] User: ${message.author.tag} issued command sayhelp!`));
}
//

//Game Category Roles
/*League of Legends*/
if(command === "lol") {

let role = message.guild.roles.find("name", "LoL");
let member = message.member;

message.reply("You have successfully subscribe to role **LoL** for League of Legends category!");
member.addRole(role).catch(console.error);
}
/*PlayerUnknown BattleGround*/
if(command === "pubg") {

let role = message.guild.roles.find("name", "PUBG");
let member = message.member;

message.reply("You have successfully subscribe to role **PUBG** for PLAYERUNKNOWN'S BATTLEGROUNDS category!");
member.addRole(role).catch(console.error);
}
/*ARK Survival*/
if(command === "ark") {

let role = message.guild.roles.find("name", "ARK");
let member = message.member;

message.reply("You have successfully subscribe to role **ARK** for ARK: Survival Evolved category!");
member.addRole(role).catch(console.error);
}
/*CS:GO*/
if(command === "cs:go") {

let role = message.guild.roles.find("name", "CS:GO");
let member = message.member;

message.reply("You have successfully subscribe to role **CS:GO** for CS:GO category!");
member.addRole(role).catch(console.error);
}
/*OverWatch*/
if(command === "overwatch") {

let role = message.guild.roles.find("name", "OverWatch");
let member = message.member;

message.reply("You have successfully subscribe to role **OverWatch** for OverWatch category!");
member.addRole(role).catch(console.error);
}
/*GTA*/
if(command === "gta") {

let role = message.guild.roles.find("name", "GTA");
let member = message.member;

message.reply("You have successfully subscribe to role **GTA** for GTA category!");
member.addRole(role).catch(console.error);
}
/*WatchDogs*/
if(command === "watchdogs") {

let role = message.guild.roles.find("name", "WatchDogs");
let member = message.member;

message.reply("You have successfully subscribe to role **WatchDogs** for WatchDogs category!");
member.addRole(role).catch(console.error);
}
/*TheCrew*/
if(command === "thecrew") {

let role = message.guild.roles.find("name", "TheCrew");
let member = message.member;

message.reply("You have successfully subscribe to role **TheCrew** for TheCrew category!");
member.addRole(role).catch(console.error);
}
/*Dota*/
if(command === "dota") {

let role = message.guild.roles.find("name", "Dota");
let member = message.member;

message.reply("You have successfully subscribe to role **Dota** for Dota category!");
member.addRole(role).catch(console.error);
}
/*ROBLOX*/
if(command === "roblox") {

let role = message.guild.roles.find("name", "Roblox");
let member = message.member;

message.reply("You have sccessfully aubscribe to role **Roblox** for Roblox category!")
}

//End of Game category Roles

//Livestream subscribe
if(command === "streamnotify") {

//let role = message.guild.roles.find("name", "StreamNotify");
//let member = message.member;
message.channel.send("StreamNotify is currently disabled. Sorry~");
//message.reply("You will be notify when our streamer when live!");
//member.addRole(role).catch(console.error);
}
//End of livestream subscribe

//Event 
//Christmas
/* if(command === "christmas2017") {

let role = message.guild.roles.find("name", "Christmas 2017");
let member = message.member;

message.reply("**Christmas 2017** has been added to your account.");
member.addRole(role).catch(console.error);
message.delete().catch(O_o=>{});
} */
//
//CNY
/*if(command === "cny2018") {

let role = message.guild.roles.find("name", "CNY 2018");
let member = message.member;

message.reply(":dog: **Happy CNY 2018!** :dog:");
member.addRole(role).catch(console.error);
message.delete().catch(O_o=>{});
}*/  
//
//Milestone
if(command === "300milestone") {

let role = message.guild.roles.find("name", "300 Milestone Achived");
let member = message.member;

message.reply("**300 Milestone Achived** has been added to your account.");
member.addRole(role).catch(console.error);
message.delete().catch(O_o=>{});
}
// 
 
// end of event

//Staff command
//kick
if(command === "kick") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command kick!`)); 

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
message.channel.send(`${member.user} has been kicked from server.\nKicked Member id: ${member.id}\nModerator: ${message.author}\nReason: ${reason}`).then(console.log(`[INFO] User: ${message.author.tag} issued command kick!`));
message.delete().catch(O_o=>{});
}
//ban
if(command === "ban") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command ban!`)); 

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
message.channel.send(`${member.user.tag} has been banned from server.\nBanned Member id: ${member.id}\nModerator: ${message.author}\nReason: ${reason}`).then(console.log(`[INFO] User: ${message.author.tag} issued command ban!`));
message.delete().catch(O_o=>{});
}
//mute
if(command === "mute") {
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command", "Super Moderator", "Moderator", "Sentinel"].includes(r.name)) )
    return message.reply("Invalid Command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command mute!`));

let member = message.mentions.members.first();
if(!member) return message.channel.send("User not found!");
let reason = args.slice(1).join(' ');
if(!reason) return message.channel.send("No reason detected!");
let role = message.guild.roles.find("name", "Muted");
message.delete().catch(O_o=>{});

    var embed = new Discord.RichEmbed()
      .setColor("#15f153")
      .setTimestamp()
      .setDescription(`**Action:** Muted\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`);
    bot.channels.find("name", "member-log").send(embed).then(console.log(`[INFO] User: ${message.author.tag} issued command mute!`));
	member.addRole(role).catch(console.error);
}
/* if (command === "userinfo") {
let member =  message.mentions.members();
if (!member) return message.channel.send("Invalid user. Please check you have type the correct one.");

    var embed = new Discord.RichEmbed()
	
} */
	
//
//Super staff command

// global announce
// Host use only
//==========
if(command === "say") {	
  if(!message.member.roles.some(r=>["YOUR KING", "2nd in command"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command say!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[SYSTEM]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command say!`));
}

//
// discord owner
if(command === "ownersay") {	
  if(!message.member.roles.some(r=>["YOUR KING"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command ownersay!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[DiscordOwner]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command ownersay!`));
}

//
// admin
if(command === "adminsay") {	
  if(!message.member.roles.some(r=>["2nd in command"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command adminsay!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Admin]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command adminsay!`));
}

//
// super mod
if(command === "supersay") {	
  if(!message.member.roles.some(r=>["Super Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command supersay!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Manager]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command supersay!`));
}

//
// mod
if(command === "modsay") {	
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command modsay!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Moderator]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command modsay!`));
}

//
//sentinel
if(command === "sentsay") {	
  if(!message.member.roles.some(r=>["Sentinel"].includes(r.name)) )
    return message.reply("You have no permission to use this command!").then(console.log(`[WARNING] User: ${message.author.tag} tried to issue command say!`)); 

  var sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send("**[Sentinel]** " + sayMessage).then(console.log(`[INFO] User: ${message.author.tag} issued command sentsay!`));
}
});




// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);
