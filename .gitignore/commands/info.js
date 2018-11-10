const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var embedi = new Discord.RichEmbed()
    .setDescription("information du discord")
    .addField("Nom du discord", message.guild.name)
    .addField("Le discord a été créée le", message.guild.createdAt)
    .addField("Tu as rejoins le discord le", message.member.joinedAt)
    .addField("j'ai rejoins le discord le", message.client.JoinedAt)
    .addField("Membres total sur le discord", message.guild.memberCount)
    .setColor("#FE0000")
    .setFooter("NejiBot")
    .setTimestamp()
message.channel.send(embedi);
}
module.exports.help = {
    name: "info"
}