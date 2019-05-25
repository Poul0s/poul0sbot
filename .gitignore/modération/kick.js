const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let modRole = message.guild.roles.find("name", "PermKick");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermKick** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("tu n'as pas la permission de kick.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
 
            return message.reply("Tu n'a pas mentionné de personne").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply ("Je n'arrive pas à expulser cet utilisateur, tu t'es peut être trompé ou tu as essayé de kick un joueur impossible à expulser")
        }
        let params3 = message.content.split(" " + kickMember + " ").slice(1);
        let réson2 = params3
        if(!réson2) return message.reply("tu n'as pas mis de réson à ton ban");
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permissions de kick (KICK_MEMBERS").catch(console.error);
        }
        kickMember.kick().then(member => {
//            message.reply(`${member.user.username} a été expulser du serveur avec succès`).catch(console.error);
            let authorkick = message.author
            var embedkick = new Discord.RichEmbed()
            .setAuthor(authorkick.username, authorkick.displayAvatarURL)
            .setTitle("kick")
            .addField("Auteur du kick :", `${message.author.username}`)
            .addField("Personne kick :", `${kickMember.user.username}`)
            .setImage(`${kickMember.user.displayAvatarURL}`)
            .addField("raison :", réson2)
            .setFooter("NejiBot")
            .setTimestamp()
            message.channel.send(embedkick);
            kickMember.createDM().then(function (channel) {
                return channel.send(`Tu as été kick du serveur ${message.guild.name} pour ${réson}`)
            });
        }).catch(console.error)
}
module.exports.help = {
    name: "kick"
}
        