const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(!args[0]) {
        message.delete();
        message.channel.createInvite(
            {
                maxAge: 3600,
                unique: true
            }
        )
        .then(invite => {
            let iEmbed = new Discord.MessageEmbed()
            .setColor(colours.cream)
            .setAuthor(message.guild.name, message.author.displayAvatarURL())
            .setTitle("The Invite Link")
            .setDescription(`\`\`\`https://discord.gg/${invite.code}\`\`\``)
            .setURL(`https://discord.gg/${invite.code }`)
            .addField("Time", "This Invite Link Will Only last: ``1 Hour``")
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL());

            message.author.send({embed: iEmbed})
        });
    };


} 



module.exports.config = {
    name: "createinvite",
    description: "Creates a new invite link for the channel you're on.",    
    usage: "!createinvite",
    accessableby: "Members",
    aliases: ["newinvite", "newinvitelink", "invitecreate"]
}