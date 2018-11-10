const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var auth = message.author
    if(message.mentions.users.size === 0) {
 
        return message.reply("Tu n'a pas mentionné de personne").catch(console.error);
    }
    if(message.mentions.users.size === 1) {
        let fightMember1 = message.guild.member(message.mentions.users.first());
        var fight = [
            `${auth}`,
            `${fightMember1}`
        ]
        let fightresult = (fight[Math.floor(Math.random() * fight.length)])
        if(fightresult === `${auth}`){
        let mort = (`${fightMember1}`)
        var embedfight = new Discord.RichEmbed()
.setAuthor(auth.username, auth.displayAvatarURL)
.setTitle("duel")
.addField("Duel entre :", `${auth} et ${fightMember1}`)
.addField("Gagnant :", `${fightresult}`)
.addField("Mort :", `${mort}`)
.setFooter("NejiBot")
.setTimestamp()
message.channel.send(embedfight)
        }
        if(fightresult === `${fightMember1}`){
        let mort = (`${auth}`)
        var embedfight = new Discord.RichEmbed()
.setAuthor(auth.username, auth.displayAvatarURL)
.setTitle("duel")
.addField("Duel entre :", `${auth} et ${fightMember1}`)
.addField("Gagnant :", `${fightresult}`)
.addField("Mort :", `${mort}`)
.setFooter("NejiBot")
.setTimestamp()
message.channel.send(embedfight)
        }
    }/*
    if(message.mentions.users.size === 2) {
        let fightMember1 = message.guild.member(message.mentions.users.first());
        let fightMember2 = message.guild.member(message.mentions.users.second());
var fight = [
    `${auth}`,
    `${fightMember1}`
    `${fightMember2}`
]
let fightresult = (fight[Math.floor(Math.random() * fight.length)])
if(fightresult === `${auth}`){
    let mort = (`${fightMember1} et ${fightMember2}`)
    var embedfight = new Discord.RichEmbed()
.setAuthor(auth.username, auth.displayAvatarURL)
.setTitle("duel")
.addField("Duel entre :", `${auth}, ${fightMember1} et ${fightMember2}`)
.addField("Gagnant :", `${fightresult}`)
.addField("Mort :", `${mort}`)
.setFooter("NejiBot")
.setTimestamp()
message.channel.send(embedfight)
}
if(fightresult === `${fightMember1}`){
    let mort = (`${auth} et ${fightMember2}`)
    var embedfight = new Discord.RichEmbed()
.setAuthor(auth.username, auth.displayAvatarURL)
.setTitle("duel")
.addField("Duel entre :", `${auth}, ${fightMember1} et ${fightMember2}`)
.addField("Gagnant :", `${fightresult}`)
.addField("Mort :", `${mort}`)
.setFooter("NejiBot")
.setTimestamp()
message.channel.send(embedfight)
}
if(fightresult === `${fightMember2}`){
    let mort = (`${fightMember1} et ${auth}`)
    var embedfight = new Discord.RichEmbed()
.setAuthor(auth.username, auth.displayAvatarURL)
.setTitle("duel")
.addField("Duel entre :", `${auth}, ${fightMember1} et ${fightMember2}`)
.addField("Gagnant :", `${fightresult}`)
.addField("Mort :", `${mort}`)
.setFooter("NejiBot")
.setTimestamp()
message.channel.send(embedfight)
}
    }*/
    return;
}
module.exports.help = {
    name: "duel"
}
