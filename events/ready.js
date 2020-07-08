const Discord = require("discord.js")


module.exports = bot => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("so click Watch", {type: "STREAMING", url:"https://twitch.tv/powerteddy"});

    let statuses = [
        `${bot.guilds.size} servers!`,
        "!help",
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 7500)

}