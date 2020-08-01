const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();



["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


require("./util/eventHandler")(bot)


bot.on("guildCreate", guild => {
    var found = false;
    guild.channels.forEach(function(channel, id) {
        // If a channel is already found, nothing more needs to be done
        if(found == true || channel.type != "text") {
          return;
        }
        // If the channel isn't found and the bot has permission to 
        // send and read messages in the channel, send a welcome message there
        if(guild.me.permissionsIn(channel).some("SEND_MESSAGES") && guild.me.permissionsIn(channel).some("VIEW_CHANNEL")) {
            found = true;

            let jEmbed = new Discord.MessageEmbed()
            .setTitle("Thank you for inviting me!")
            .setDescription(`\`\`\`My prefix is "${botconfig.prefix}", you can get more information on a command with "${botconfig.prefix}help <command>".\`\`\``)
            .addField("Normal", "", true)
            .addField("Info", "", true)
            .addField("Admin", "", true)
            .setTimestamp()
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL());

            channel.send({embed: jEmbed})

            const filter = m => m.author.id === guild.owner.id || m.author.hasPermission("MANAGE_GUILD");
            const collector = message.channel.createMessageCollector(filter, m => m.author.id === message.author.id, { time: 25000 ,idle: 15000, errors: ['time'] });
            collector.on('collect', message => {
            if (message.content.toLowerCase() == dataCorrectAnswer.toLowerCase()) {
                message.channel.send("Correct! You got the Question Right!");
                collector.stop()
            } else if(message.content.toLowerCase().includes(`${prefix}trivia`||`${prefix}quiz`||`${prefix}question`)){
                collector.stop()
            } else {
                message.channel.send(`Too bad, you're wrong. The Correct Answer was ${parseHtmlEnteties(entities.decode(dataCorrectAnswer))}`);
                collector.stop()
            }
        })
        }
    })
});

bot.login(token);