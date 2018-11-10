const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var embedcréateur = new Discord.RichEmbed()
    .setTitle("Mon créateur + dédicasse")
    .setDescription("Sur ce message, vous allez voir qui m'a crée, qui m'a aidé pour le développement et des dédicasse.")
    .addField("Créateur", "Thunlos#8358")
    .addField("Ceux qui ont aidé mon créateur", "Moitié prix#4263, LePtitMetalleux#7215", "RΞd CrΛft ツ#4512")
    .addField("dédicasse", "Pyrius#9402 et KeNoDa#4258")
    .setColor("#FE0000")
    .setFooter("NejiBot")
    .setTimestamp()
message.channel.send(embedcréateur);
}
module.exports.help = {
    name: "créateur"
}