const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const os = require('os');
const cpuStat = require('cpu-stat');
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    cpuStat.usagePercent(function (error, percent, seconds) {
        if (error) {
          return console.error(error)
        }
        
        let cores = os.cpus().length // Counting how many cores your hosting has.
        let cpuModel = os.cpus()[0].model // Your hosting CPU model.
        let guild = bot.guilds.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
        let user = bot.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
        let channel = bot.channels.cache.size.toLocaleString() // Counting how many channels in the server that invite your bot.
        let usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
        let Node = process.version // Your node version.
        let CPU = percent.toFixed(2) // Your CPU usage.
        
        let embed = new Discord.MessageEmbed() 
        
        .setTitle(`${bot.user.username} Stats`)
        .setURL(botconfig.botinvitelink)
        .setColor(colours.grey_light)
        .addField('Bot Statistics:', `Server: ${guild} \nUser: ${user} \nChannel: ${channel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}%`)
        .addField('Physical Statistics:', `CPU: ${cores} - ${cpuModel} \nUptime: **${parseDur(bot.uptime)}**`)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(botconfig.embedfooter, bot.user.displayAvatarURL());
        
        message.channel.send(embed)
      })

      function formatBytes (a, b) {
        if (0 == a) return "0 Bytes";
        let c = 1024,
            d = b || 2,
            e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(a) / Math.log(c));
        
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
      } // Create MB, KB, TB or something in the back of your memory counters

      function parseDur(ms) {
        let seconds = ms / 1000,
            days = parseInt(seconds / 86400);
        seconds = seconds % 86400
        
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600
        
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60)
        
        if (days) {
          return `${days} day, ${hours} hours, ${minutes} minutes`
        } else if (hours) {
          return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
        } else if (minutes) {
          return `${minutes} minutes, ${seconds} seconds`
        }
        
        return `${seconds} second(s)`
      } // Uptime bot.
} 



module.exports.config = {
    name: "stats",
    description: "Tells you the stats for the bot.",    
    usage: "!stats",
    accessableby: "Members",
    aliases: ["botstats"]
}