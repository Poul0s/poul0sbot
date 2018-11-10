const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let userre = message.author
        let embed = new Discord.RichEmbed()
            /*.setTitle("Liste des commande")
            .addField("/ban", "Permet de bannir un utilisateur.", true)
            .addField("/kick", "Permet de kick un membre du serveur.", true)
            .addField("/invite", "Permet de m'ajouter sur ton serveur discord.", true)
            .addField("/join", "Permet de rejoindre mon serveur discord.", true)
            .addField("/serverlist", "permet de voir la liste des serveur ou je suis.", true)
            .addField("(bug) /ping", "Permet de voir la latence entre moi et le serveur.", true)
            .addField("/8ball", "On pose une question et le bot répond aléatoirement.", true)
            .addField("/info", "Permet de voir les info du serveur.",true)
            .addField("/NejiChat **VotreMessage**", "Le /NejiChat est une commande qui permet de parler avec tout les autre serveur qui m'ont, mais cela require le salon textuel #neji-chat", true)
            .addField("/créateur", "Permet de savoir qui m'a crée", true)*
            .addField("/clear", "Permet d'effacer de 2 à 100 message.", true)
            .addField("/chifoumi", "Permet de faire un pierre feuille ciseaux avec le bot", true)
            .addField("/report", "Permet de report un joueur pour une telle raison.", true)
            .addField("/blague", "Le bot répond avec une blague aléatoire.", true)
            .addField("/mute", "Permet de mute un utilisateur (/mute @Poul0s#8358 10m) /x PS: Faite gaf que le grade Muted n'ai pas les permissions de parle et d'envoyer des message.", true)
            .addField("/énigme", "Le bot répond avec une énigme aléatoire",true)
            .addField("/giveaway", "Permet d'organiser des giveaway, exemple /giveaway 5 1 10€ paysafecard", true)
            .addField("/Maj", "Permet de voir la maj la plus récente", true)
            .addField("/AllMaj", "Permet de voir la liste des mise a jour jusqu'a 10 maj", true)
            .addField("/listEmoji", "permet d'avoir la list des emoji sur le serveur", true)
            .addField("/sondage", "Permet de créer des sondage", true)
            .addField("/duel", "permet de faire un duel et de voir qui est le meilleur !", true)
            .addField("PS", "Vu que le bot n'est pas terminé, la commande n'est pas terminé non plus.")
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
            */
        .setTitle("Liste des commande")
        .setDescription("Pour voir la description d'une commande, utilise la commande /aide <VotreCommande>")
        .setColor("FE0000")
        .addField("Modération", "/ban \n/kick \n/mute \n/clear \n/report", true)
        .addField("Utilitaire", "/invite \n/join \n/serverlist \n/ping \n/info \n/NejiChat \n/giveaway \n/listEmoji \n/sondage", true)
        .addField("fun", "/8ball \n/chifoumi \n/blague \n/énigme \n/duel", true)
        .addField("Musique", "/yt", true)
        .addField("Autre", "/créateur \n/Maj \n/AllMaj", true)
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