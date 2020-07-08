const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {

    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Is this really my ping", "Is it okay? I can\'t look", "I hope it isn\'t bad"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
    })

}


module.exports.config = {
    name: "ping",
    description: "PONG! Displays the api & bot latency",
    usage: "!ping",
    accessableby: "Members",
    aliases: ["latency"]
}