const Discord = require('discord.js')
module.exports.run = async (bot, message) => {
    let args = message.content.split(" ").slice(1);
    let tte = args.join(" ")
    if (!tte){
        return message.reply("Tu n'as pas poser de question")};

    var replys = [
        "Oui",
        "non",
        "Je sait pas, laisse moi réflechir",
        "Ptetre ya moyen",
        "T'es un malade bernard, **UN MALADE**",
        "demande à ta mère",
        "demande à ton père",
        "enchallah comme on dirait en bretagne (désolé la bretagne)",
        "ok mais tu me doit 50€"
    ]

    let reponse = (replys[Math.floor(Math.random() * replys.length)])
    var bembed = new Discord.RichEmbed()
        .setDescription(":8ball: 8ball :8ball:")
        .addField("Question", tte)
        .addField("Réponse", reponse)
    message.channel.send(bembed);
}
module.exports.help = {
    name: "8ball"
}