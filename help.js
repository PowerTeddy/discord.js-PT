const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args, prefix) => {

    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if(args[0]) {
        message.delete();
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.MessageEmbed()
            .setColor(colours.cyan)
            .setAuthor(`PT Bot Help`, message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`The bot prefix is: \`\`${prefix}\`\`\n\n**Command:** ${command.config.name}\n*Aliases:* ${command.config.noalias || command.config.aliases.join(", ") || "No Aliases Available"}\n\n**Usage:** \`\`${command.config.usage || "No Usage"}\`\`\n\n ${command.config.description || "No Description"}\n\n**Examples:** \n${command.config.examples|| `No Examples availabe\n Try \`\`${command.config.usage}\`\``}\n\n**Accessable by:** ${command.config.accessableby || "Members"}`)
            .setTimestamp()
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL())
            message.author.send(SHembed);
        }}

    if(!args[0]) {
        message.delete();
        

        if(message.member.hasPermission("ADMINISTRATOR") || message.author == message.guild.owner) {
            let embed = new Discord.RichEmbed()
            .setAuthor(`Help Command!`, message.guild.iconURL)
            .setColor(colours.redlight)
            .setDescription(`${message.author.username} check your dms!`)

            let Sembed = new Discord.MessageEmbed()
            .setColor(colours.cyan)
            .setAuthor(`PT Bot Help **Administrator Version**`, bot.user.displayAvatarURL())
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setDescription(`These are the available commands for the **PT** Bot!\nThe bot prefix is: \`${prefix}\``)
            .addField(`Commands:`, "```help\n avatar\n cat\n ping\n serverinfo\n userinfo\n code\n 8ball\n mangaavatar\n cat\n fact\n name\n pat\n spoiler\n wallpaper\n createinvite\n invite\n meme\n quiz\n stats```" +
            `Administrator Commands:`, "```addrole\n removerole\n createchannel \n mute\n prefix\n prune```")
            .addField("Command Description", "To see the Description of a command use !help <Command Name>")
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL())
            message.channel.send(embed).then(m => m.delete(10000));
            message.author.send(Sembed)


        } else {
            let embed = new Discord.MessageEmbed()
            .setAuthor(`Help Command!`, message.guild.iconURL())
            .setColor(colours.redlight)
            .setDescription(`${message.author.username} check your dms!`)
            
            let Sembed = new Discord.MessageEmbed()
            .setColor(colours.cyan)
            .setAuthor(`PT Bot Help`, bot.user.displayAvatarURL())
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setDescription(`These are the available commands for the **PT** Bot!\nThe bot prefix is: \`\`${prefix}\`\``)
            .addFields(
                { name: 'Commands:', value: '```help\n avatar\n cat\n ping\n serverinfo\n addrole\n removerole\n userinfo\n code\n createchannel\n mute\n prefix\n prune\n 8ball\n mangaavatar\n cat\n fact\n name\n pat\n spoiler\n wallpaper\n createinvite\n invite\n meme\n quiz\n stats```', inline: true },
                { name: 'Command Description', value: 'To see the Description of a command use !help <Command Name>' },
                { name: 'Help Legend', value: '``none``: **Exact Text** (e.g., !help, Type "!help")\n' +
                '``<>``: **Type of Text** (e.g., !help <command>, Type "!help help")\n' +
                '``()``: **Type of Text between Parentheses** (e.g., !help (command), Type "!help (help)")\n' +
                '``[]``: **Type of Text between Brackets** (e.g., !help [command], Type "!help [help]")\n' +
                '``*``: **Optional** (e.g., !help *<command>, Type "!help" or "!help help")'}
            )
            .setFooter(`${botconfig.embedfooter}`, bot.user.displayAvatarURL())
            message.channel.send(embed).then(m => m.delete({timeout: 10000}));
            message.author.send(Sembed)
        }
    }
}


module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "!help",
    description: "",
    accessableby: "Members"
}