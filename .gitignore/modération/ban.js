const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let modRole = message.guild.roles.find("name", "PermBan");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermBan** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de bannir.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Tu as oublier de mentionner une personne.");
        let params2 = message.content.split(" " + member + " ").slice(1);
        let réson = params2
        if(!réson) return message.reply("tu n'as pas mis de réson à ton ban");
        member.ban().then(member => {
//            message.reply(`${member.user.username} a été bannis du serveur.`).catch(console.error);
            let authorban = message.author
            var embedban = new Discord.RichEmbed()
            .setAuthor(authorban.username, authorban.displayAvatarURL)
            .setTitle("Ban")
            .addField("Auteur du ban :", `${message.author.username}`)
            .addField("Personne banni :", `${member.user.username}`)
            .setImage(`${member.user.displayAvatarURL}`)
            .addField("raison :", réson)
            .setFooter("NejiBot")
            .setTimestamp()
            message.channel.send(embedban);
 
            member.createDM().then(function (channel2) {
                return channel2.send(`Tu as été bannis du serveur ${message.guild.name} pour ${réson}`)
            });
        }).catch(console.error)
}
module.exports.help = {
    name: "ban"
}   