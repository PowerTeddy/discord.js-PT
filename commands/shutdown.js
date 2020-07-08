const Discord = require("discord.js")
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {

    if(message.author.id != "332637820390735885") return message.channel.send("You're the bot the owner!")

    try {
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


}


module.exports.config = {
    name: "shutdown",
    description: "**Super Secret Command**: Shuts down the bot!",
    usage: "!shutdown",
    accessableby: "Bot Owner",
    aliases: ["botstop"]
}