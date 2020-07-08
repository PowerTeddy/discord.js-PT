const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.RichEmbed()
    .setColor(colours.red_light)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setTimestamp()
    .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL);

    message.author.send({embed: uEmbed});
}


module.exports.config = {
    name: "userinfo",
    description: "Get your user info!",
    usage: "!userinfo",
    accessableby: "Members",
    aliases: ["ui"]
}