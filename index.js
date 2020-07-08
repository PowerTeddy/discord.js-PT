const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const superagent = require("superagent")

const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
const { url } = require("inspector");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});



bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);


    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

//Display message when joining a server

bot.on("guildCreate", guild => {
    var found = false;
    guild.channels.forEach(function(channel, id) {
        // If a channel is already found, nothing more needs to be done
        if(found == true || channel.type != "text") {
          return;
        }
        // If the channel isn't found and the bot has permission to 
        // send and read messages in the channel, send a welcome message there
        if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
            found = true;

            let jEmbed = new Discord.RichEmbed()
            .setTitle("Thank you for inviting me!")
            .addField(`\`\`\`My prefix is "${botconfig.prefix}", you can get more information on a command with "${botconfig.prefix}help <command>".\`\`\``)
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL)
            .setURL("https://youtube.com/pewdiepie", "Pewdiepie")

            return channel.send({embed: jEmbed})
        }
    })
});


bot.login(botconfig.token);