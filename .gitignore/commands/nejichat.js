const Discord = require('discord.js')
module.exports.run = async (bot, message) => {
    if(!message.guild.id === "481945559859593226" || "498792784908648458") return message.reply("Le serveur ou tu est n'est pas autorisé à envoyé des message global, pour être ajouté dans la liste, il faut contacté Thunlos#8358")
    let args = message.content.split(" ").slice(1);
    let xo03 = args.join(" ")
    var xo02 = message.guild.channels.find('name', 'neji-chat');
    if(!xo02) return message.reply("Il n'y as pas de salon textuel se nommant #neji-chat pour la commande /NejiChat");
    if(message.channel.name === 'neji-Chat') return message.channel.send("La commande doit être effectué dans le salon #neji-chat");
    if(!xo03) return message.reply("Tu n'as pas ecrit de message à envoyé à tout les discords.");
    var embedglobal = new Discord.RichEmbed()
        .setColor("#FE0000")
        .setTitle("Message Global")
        .setDescription("utilise /inc pour avoir les info")
        .addField("Pseudo", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Message", xo03)
        .setFooter("NejiBot")
        .setTimestamp()
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("LIBRE").send(embedglobal)
        bot.channels.get("499985648321822731").send(embedglobal)
        bot.channels.get("499983825238097941").send(embedglobal)
        return;
}
module.exports.help = {
    name: "NejiChat"
}