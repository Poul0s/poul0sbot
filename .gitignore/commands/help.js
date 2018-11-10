const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let userre = message.author
        let embed = new Discord.RichEmbed()
            .setTitle("Liste des commande")
            .addField("/help", "Permet de voir la liste des commande.")
            .addField("/ban", "Permet de bannir un utilisateur.")
            .addField("/kick", "Permet de kick un membre du serveur.")
            .addField("/invite", "Permet de m'ajouter sur ton serveur discord.")
            .addField("/join", "Permet de rejoindre mon serveur discord.")
            .addField("/serverlist", "permet de voir la liste des serveur ou je suis.")
            .addField("(bug) /ping", "Permet de voir la latence entre moi et le serveur.")
            .addField("/8ball", "On pose une question et le bot répond aléatoirement.")
            .addField("/info", "Permet de voir les info du serveur.")
            .addField("/NejiChat **VotreMessage**", "Le /NejiChat est une commande qui permet de parler avec tout les autre serveur qui m'ont, mais cela require le salon textuel #neji-chat")
            .addField("/créateur", "Permet de savoir qui m'a crée")
            .addField("/clear", "Permet d'effacer de 2 à 100 message.")
            .addField("/chifoumi", "Permet de faire un pierre feuille ciseaux avec le bot")
            .addField("/report", "Permet de report un joueur pour une telle raison.")
            .addField("/blague", "Le bot répond avec une blague aléatoire.")
            .addField("/mute", "Permet de mute un utilisateur (/mute @Poul0s#8358 10m) /x PS: Faite gaf que le grade Muted n'ai pas les permissions de parle et d'envoyer des message.")
            .addField("/énigme", "Le bot répond avec une énigme aléatoire")
            .addField("/giveaway", "Permet d'organiser des giveaway, exemple /giveaway 5 1 10€ paysafecard")
            .addField("/Maj", "Permet de voir la maj la plus récente")
            .addField("/AllMaj", "Permet de voir la liste des mise a jour jusqu'a 10 maj")
            .addField("/listEmoji", "permet d'avoir la list des emoji sur le serveur")
            .addField("/sondage", "Permet de créer des sondage")
            .addField("/duel", "permet de faire un duel et de voir qui est le meilleur !")
            .addField("PS", "Vu que le bot n'est pas terminé, la commande n'est pas terminé non plus.")
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
    message.channel.send("aide envoyé en privé");
        userre.createDM().then(function (channelhelp) {
         channelhelp.send(embed);
        })
}
module.exports.help = {
        name: "help"
    }