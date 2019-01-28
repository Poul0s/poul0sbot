const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    let modRole = message.guild.roles.find("name", "PermMute");
    if(!modRole) return message.reply("Il n'y as pas de grade **PermMute** sur le serveur, veuillez un créer un s'il vous plaît")
    if(!message.member.roles.has(modRole.id)) {
        return message.reply("Tu n'as pas la permissions de clear.")
    }
    var args2 = message.content.split(" ").slice(1);
    //var messagecount = parseInt(args2.join(" "))
    var messagecount = args2
    //message.channel.fetchMessages({limit: messagecount}).then(messages => 
message.channel.bulkDelete(messagecount));
    message.delete()
}
module.exports.help = {
    name: "clear"
}
