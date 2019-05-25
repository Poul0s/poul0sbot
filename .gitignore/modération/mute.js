const Discord = require('discord.js')
const ms = require ("ms");
module.exports.run = async (bot, message, args) => {
let modRole = message.guild.roles.find("name", "PermMute");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermMute** sur le serveur, veuillez en créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de mute.")
        }
        let member = message.mentions.members.first();
        if(!member) return message.reply("tu n'as pas mentionné de personne valide");
        let muteRole = message.guild.roles.find("name", "Muted");
        if(!muteRole) return message.reply("Il n'y as pas de grade **Muted** sur le serveur, veuillez en créer un s'il vous plaît");
        let params = message.content.split(" ").slice(1);
        let time = params[1];
        if(!time) return message.reply("tu n'as pas spécifié de temps de mute.");
        let paramsm = message.content.split(" " + member + " " + time + " ").slice(1);
        let résonm = paramsm
        if(!résonm) return message.reply("tu n'as pas mis de réson à ton mute");
        member.addRole(muteRole.id);
        //message.channel.send(`${message.author.username} à mute ${member.user.tag} pendant ${ms(ms(time), {long: true})} ! PS: si le grade se redémarre ou crash avant la fin du mute, il faudra enlevé le grade Muted manuellement.`);
        let authormute = message.author
        var embedmute = new Discord.RichEmbed()
        .setAuthor(authormute.username, authormute.displayAvatarURL)
        .setTitle("Mute")
        .addField("Auteur du mute :", `${message.author.username}`)
        .addField("Personne banni :", `${member.user.username}`)
        .setImage(`${member.user.displayAvatarURL}`)
        .addField("Pendant :", `${ms(ms(time), {long: true})}`)
        .addField("raison :", résonm)
        .setFooter("NejiBot")
        .setTimestamp()
        message.channel.send(embedmute);
        setTimeout(function() {
            member.removeRole(muteRole.id);
            message.channel.send(`@${member.user.tag}, ton temps de mute est finit, tu peux désormais reparlé`)
        }, ms(time));
}
module.exports.help = {
    name: "mute"
}     