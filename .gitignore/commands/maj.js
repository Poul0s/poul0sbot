const Discord = require('discord.js')
var version = ("[1.0.1]")
        module.exports.run = async (bot, message, args) => {
        var auth = message.author
        var embedmaj = new Discord.RichEmbed()
        .setAuthor(auth.username, auth.displayAvatarURL)
        .setTitle(`Maj ${version}`)
        .setDescription("Pour voir toute les maj, utilise la commande /AllMaj")
        .addField("Ajout :", "/sondage | /duel")
        .addField("/sondage :", "Permet de faire des sondage")
        .addField("/duel", "Permet de faire un duel et voir qui est le meilleur !")
        .setFooter("NejiBot")
        .setTimestamp()
        .setColor("FE0000")
        return message.channel.send(embedmaj)
        }
        module.exports.help = {
                name: "maj"
            }