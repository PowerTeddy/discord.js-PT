const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args, prefix) => {
    const got = require('got')

    const Subreddits = ['meme', 'dankmemes']
    const randomReddit = Subreddits[Math.floor(Math.random() * Subreddits.length)]
    
    got(`https://www.reddit.com/r/${randomReddit}/random/.json`).then(response => {
        let content = JSON.parse(response.body);
        let image = content[0].data.children[0].data.url
        let author = content[0].data.children[0].data.author
        let redditpermalink = content[0].data.children[0].data.permalink
        let redditlink = `https://reddit.com${redditpermalink}`
        let title = content[0].data.children[0].data.title
        let thumbnail = content[0].data.children[0].data.thumbnail 
        let subredditname = content[0].data.children[0].data.subreddit_name_prefixed

        console.log(image)

        let embed = new Discord.MessageEmbed()
        .setColor(colours.red_dark)
        .setAuthor(subredditname, thumbnail)
        .setTitle(title)
        .setURL(redditlink)
        .setDescription(`**Author:** [${author}](https://reddit.com/user/${author}/)`)
        .setImage(image)
        .setTimestamp()
        .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL())
        
        message.channel.send(embed);

    }).catch(console.log)
}


module.exports.config = {
    name: "meme",
    description: "Sends a random meme.",
    usage: "!meme",
    accessableby: "Members",
    aliases: ["memes"]
}
