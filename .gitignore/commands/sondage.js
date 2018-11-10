const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
let argss = message.content.split(" ").slice(1)
let sondagee = argss.join(" ")
var embeds = new Discord.RichEmbed()
.setTitle("Sondage")
.addField(`${sondagee}`, "Répondre avec :white_check_mark: ou :x:")
.setColor("FE0000")
.setFooter("NejiBot")
.setTimestamp()
let sondagechannel = message.guild.channels.find("name", "sondage")
if(!sondagechannel) return message.reply("il n'y as pas de salon se nommant **sondage**")
var sondagechannel2 = await sondagechannel.send(embeds);
sondagechannel2.react("✅")
sondagechannel2.react("❌")
return message.delete();
}
module.exports.help = {
    name: "sondage"
}