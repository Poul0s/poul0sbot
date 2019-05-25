const Discord = require('discord.js')   
    module.exports.run = async (bot, message, args) => {
var auth = message.author
        if(!auth) return message.channel.send("tu n'as pas mentionné d'utilisateur")
    var warnuser = message.mentions.users.first();
    let paramswarn = message.content.split(" " + warnuser + " ").slice(1);
    let raisonwarn = paramswarn
    if(!message.guild.channels.find(`name`, "warn")) return message.reply("le channel #warn est inexistant")
    var embedwarnDM = new Discord.RichEmbed()
    .setAuthor(auth.username, auth.displayAvatarURL)
    .setTitle("WARN")
    .addField("raison", `Tu as été warn du serveur ${message.guild.name} à ${message.createdTimestamp} pour ${raisonwarn} `)
    .setFooter("NejiBot")
    .setTimestamp()
    warnuser.createDM().then(function (channelwarnDM) {
        channelwarnDM.send(embedwarnDM)
    })
    var embedwarnPUBLIC = new Discord.RichEmbed()
    .setAuthor(auth.username, auth.displayAvatarURL)
    .setTitle("WARN")
    .addField("Personne warn :", `${warnuser.username}`)
    .addField("raison du warn :", `${raisonwarn}`)
    .addField("warn à:", `${message.createdTimestamp}`)
    message.guild.channels.find(`name`, "warn").send(embedwarnPUBLIC);
    return;
    }
    module.exports.help = {
        name: "warn"
    }