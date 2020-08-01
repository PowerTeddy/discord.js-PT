const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

    if(!user) return message.channel.send('Please provide a user');

    message.guild.fetchInvites()
    .then(invites =>
        {
            const userInvites = invites.array().filter(o => o.inviter.id === user.id);
            var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }

                if(message.author.id === user.id) {
                    if(userInviteCount !== 0) {
                        message.reply(`You have invited ${userInviteCount} users to this server. Keep up the good work!`);
                    } else {
                        message.reply(`You have invited ${userInviteCount} users to this server. Try harder!`)
                    }
                } else if(!userInvites) {
                    if(message.author.id === user.id) {

                    } else {
                        message.channel.send(`${user} does not have invites`)
                    }
                } else {
                    message.channel.send(`${user} has invited ${userInviteCount} users to this server!`)
                }
        }
    )
} 



module.exports.config = {
    name: "invite",
    description: "Tells you how much people used invite links you created.",    
    usage: "!invite", //*<@user>
    accessableby: "Members",
    aliases: ["myinvites"]
}