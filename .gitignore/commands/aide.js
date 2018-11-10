const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    let args1 = message.content.split(" ").slice(1).join(" ")
    var auth = message.author
if(!args1) return message.reply("Tu n'as pas mis la commande ou la catégorie sur laquel tu voudrais plus d'info")
if(args1 === "ban"){
    embed.setTitle("/ban")
    .setDescription("Permet de bannir un utilisateur.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (ban) {
        return ban.send(embed);
       })  
}
if(args1 === "kick"){
    embed.setTitle("/kick")
    .setDescription("Permet de kick un membre du serveur.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (kick) {
       return kick.send(embed);
       })  
}
if(args1 === "invite"){
    embed.setTitle("/invite")
    .setDescription("Permet de m'ajouter sur ton serveur discord.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "join"){
    embed.setTitle("/join")
    .setDescription("Permet de rejoindre mon serveur discord.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "serverlist"){
    embed.setTitle("/serverlist")
    .setDescription("permet de voir la liste des serveur ou je suis.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "ping"){
    embed.setTitle("/ping")
    .setDescription("Permet de voir la latence entre moi et le serveur.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "8ball"){
    embed.setTitle("/8ball")
    .setDescription("On pose une question et le bot répond aléatoirement.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "info"){
    embed.setTitle("/info")
    .setDescription("Permet de voir les info du serveur.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "NejiChat"){
    embed.setTitle("/NejiChat")
    .setDescription("Le /NejiChat est une commande qui permet de parler avec tout les autre serveur qui m'ont, mais cela require le salon textuel #neji-chat")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "créateur"){
    embed.setTitle("/créateur")
    .setDescription("Permet de savoir qui m'ont crééent")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "clear"){
    embed.setTitle("/clear (non fonctionnel)")
    .setDescription("Permet d'effacer de 2 à 100 message.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "chifoumi"){
    embed.setTitle("/chifoumi")
    .setDescription("Permet de faire un pierre feuille ciseaux avec le bot")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "report"){
    embed.setTitle("/report")
    .setDescription("Permet de report un joueur pour une telle raison.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "blague"){
    embed.setTitle("/blague")
    .setDescription("Le bot répond avec une blague aléatoire.")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "mute"){
    embed.setTitle("/mute")
    .setDescription("Permet de mute un utilisateur (/mute @Poul0s#8358 10m) \n ``PS: Faite gaf que le grade Muted n'ai pas les permissions de parle et d'envoyer des message.``")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "énigme"){
    embed.setTitle("/énigme")
    .setDescription("Le bot répond avec une énigme aléatoire")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "giveaway"){
    embed.setTitle("/giveaway")
    .setDescription("Permet d'organiser des giveaway, exemple /giveaway 5 1 10€ paysafecard")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "Maj"){
    embed.setTitle("/Maj")
    .setDescription("Permet de voir la maj la plus récente")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "AllMaj"){
    embed.setTitle("/AllMaj")
    .setDescription("Permet de voir la liste des mise a jour jusqu'a 10 maj")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "listEmoji"){
    embed.setTitle("/listEmoji")
    .setDescription("permet d'avoir la list des emoji sur le serveur")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "sondage"){
    embed.setTitle("/sondage")
    .setDescription("Permet de créer des sondage")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "duel"){
    embed.setTitle("/duel")
    .setDescription("permet de faire un duel et de voir qui est le meilleur !")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
if(args1 === "yt"){
    embed.setTitle("/yt")
    .setDescription("Permet de faire joué une vidéo youtube dans le salon ou tu est")
    .setFooter("NejiBot")
    .setTimestamp()
    auth.createDM().then(function (mp) {
       return mp.send(embed);
       })  
}
}
module.exports.help = {
    name: "aide"
}