const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let sl = message.content.split(" ").slice(1)
let sl1 = sl[1];
if(!sl) return message.reply("tu n'as pas mis le numéro de la solution")
if(sl1 === "1") return message.channel.send(`${message.author.username} : Hier, on était le 31 décembre, elle a eu 18 ans. Cette année, elle va avoir 19 ans et l'année prochaine, 20 ans.`);
if(sl1 === "2") return message.channel.send(`${message.author.username} : 3 car il reste l'odorat, le toucher et le goût. Muet ne correspond pas à la privation d'un sens.`)
if(sl1 === "3") return message.channel.send(`${message.author.username} : le someil`)
if(sl1 === "4") return message.channel.send(`${message.author.username} : La vie ! Plus on avance dans le temps, plus on s'approche de la mort`)
if(sl1 === "5") return message.channel.send(`${message.author.username} : L'équilibre, car lorsqu'on perd l'équilibre on tombe.`)
if(sl1 === "6") return message.channel.send(`${message.author.username} : essaye de traduire cette ligne de code de hexadecimal à texte normal`)
if(sl1 === "7") return message.channel.send(`${message.author.username} : essaye de traduire ce texte de binaire en texte puis ce texte à texte normal`)
if(sl1 === "8") return message.channel.send(`${message.author.username} : essaye de traduire ce texte de hexadecimal en texte puis ce texte en binaire à texte`)
if(sl1 === "9") return message.channel.send(`${message.author.username} : essaye de traduire ce texte de binaire en texte normal`)
}
module.exports.help = {
    name: "solution"
}