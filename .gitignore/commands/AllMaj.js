const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
var embedmajall = new Discord.RichEmbed()
        .setAuthor(auth.username, auth.displayAvatarURL)
        .setTitle("Liste des maj")
        .setDescription("Si vous voyer que ya que 2 maj c psk les autre se rajouterons au fur et a mesure")
        .addField("maj [1.0.1]", "Nouveauté: /sondage | /duel")
        .addField("maj [1.0.0]", "Nouveauté: /giveaway | /maj | /AllMaj | /addRole, Modification: /help | status")
        .setFooter("Nejibot")
        .setTimestamp()
        return message.channel.send(embedmajall)
}
module.exports.help = {
        name: "AllMaj"
    }