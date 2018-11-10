const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let choix = message.content.split(" ").slice(1)
let choixbis = choix[1]
if(!choix) return message.reply("Tu dois choisir entre pierre, feuille et ciseaux")
if(choixbis === "pierre" || "Pierre" || "pierres" || "Pierres"){
    var replysp = [
        "feuille",
        "pierre",
        "ciseaux"
    ]
if(replysp === "feuille") var gagnant = message.guild.member(bot.user).username
if(replysp === "pierre") var gagnant = "Personne"
if(replysp === "ciseaux") var gagnant = message.author.username
    let reponsep = (replysp[Math.floor(Math.random() * replysp.length)])
    var embedpierre = new Discord.RichEmbed()
        .setTitle("chifoumi")
        .addField(`${message.author.username} :`, "pierre")
        .addField(`NejiBot :`, reponsep)
        .addField(`Gagnant :`, gagnant)
        .setFooter("NejiBot")
        .setTimestamp()
        .setColor("FE0000")
    message.channel.send(embedpierre);
}
if(choixbis === "feuille" || "Feuille" || "feuilles" || "Feuilles"){
    var replysp = [
        "feuille",
        "pierre",
        "ciseaux"
    ]
if(replysp === "ciseaux") var gagnant = message.guild.member(bot.user).username
if(replysp === "feuille") var gagnant = "Personne"
if(replysp === "pierre") var gagnant = message.author.username
    let reponsep = (replysp[Math.floor(Math.random() * replysp.length)])
    var embedpierre = new Discord.RichEmbed()
        .setTitle("chifoumi")
        .addField(`${message.author.username} :`, "feuille")
        .addField(`NejiBot :`, reponsep)
        .addField(`Gagnant :`, gagnant)
        .setFooter("NejiBot")
        .setTimestamp()
        .setColor("FE0000")
    message.channel.send(embedpierre);
}
if(choixbis === "ciseaux" || "Ciseaux" || "ciseau" || "Ciseau"){
    var replysp = [
        "feuille",
        "pierre",
        "ciseaux"
    ]
if(replysp === "pierre") var gagnant = message.guild.member(bot.user).username
if(replysp === "ciseaux") var gagnant = "Personne"
if(replysp === "feuille") var gagnant = message.author.username
    let reponsep = (replysp[Math.floor(Math.random() * replysp.length)])
    var embedpierre = new Discord.RichEmbed()
        .setTitle("chifoumi")
        .addField(`${message.author.username} :`, "ciseaux")
        .addField(`NejiBot :`, reponsep)
        .addField(`Gagnant :`, gagnant)
        .setFooter("NejiBot")
        .setTimestamp()
        .setColor("FE0000")
    message.channel.send(embedpierre);
}
if(!choisbis === "ciseaux" || "Ciseaux" || "ciseau" || "Ciseau" || "feuille" || "Feuille" || "feuilles" || "Feuilles" || "pierre" || "Pierre" || "pierres" || "Pierres") return message.reply("Tu n'as pas choisix un bon mot, tu doit choisir entre pierre feuille ou ciseaux.")
}
module.exports.help = {
    name: "chifoumi"
}