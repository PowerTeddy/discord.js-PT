const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(args[0]) return message.channel.send(`Just do ${prefix}code instead.`)

    if(!args[0]) {
        let cEmbed = new Discord.RichEmbed()
        .setTitle("PT Bot Support")
        .setAuthor(`${botconfig.botOwner}`.user.displayAvatarURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .addField("PT Bot Github", "[Click here to see the Github Page](https://github.com/PowerTeddy/discord.js-PT)")
        .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL);
    }
}


module.exports.config = {
    name: "code",
    aliases: ["support", "makebot", "howtobot"],
    usage: "!code",
    description: "Go to the github link to see my bot's code",
    accessableby: "Members"
}