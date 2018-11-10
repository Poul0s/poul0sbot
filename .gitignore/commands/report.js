const Discord = require('discord.js')
        module.exports.run = async (bot, message, args) => {
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.reply("tu n'as pas mentionné d'utilisateur");
        let reason = args.join(" ").slice(22);
        if(!reason) return message.reply("Tu n'a pas mis de réson.")
        let userr = message.author
        let reportEmbed = new Discord.RichEmbed()
            .setAuthor(userr.username, userr.displayAvatarURL)
            .setTitle(`Report`)
            .setColor("#FE0000")
            .addField(`Joueur Report`, message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])))
            .addField(`Pour`, reason)
            .addField(`Sur le discord`, message.guild.name)
            .addField(`Dans le channel`, message.channel)
            .setFooter("NejiBot")
            .setTimestamp()
        let reportschannel = message.guild.channels.find(`name`, "reports")
        if(!reportschannel) {
            message.guild.createChannel("reports")
            message.reply("il n'y avait pas de salon report, il viens d'être créer, merci de refaire un report.")
        }
//return bot.channels.findAll("name", "reports").map(channel => channel.send(reportEmbed));
        reportschannel.send(reportEmbed);
        }
        module.exports.help = {
                name: "report"
            }