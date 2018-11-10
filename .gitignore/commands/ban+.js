const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
if(message.author.id === "300546341518573569") {
            const member = message.mentions.members.first();
            if (!member) return message.reply("Tu as oublier de mentionner une personne.");
            let userre = message.author
                    userre.createDM().then(function (channelhelp) {
                        return channelhelp.send(`L'id de l'utilisateur que vous avez banni mon chef est ${member.user.id}`);
                })
            member.ban().then(member => {
                message.reply(`${member.user.username} a été bannis du serveur par mon créateur (il as sûrement éssayé de me faire crash sur ce serv)`).catch(console.error);
                message.guilds.map(channel => member.ban().then(member2 => {
            }).catch(console.error)
            )})
    }else{
        return message.reply("tu n'as pas accès à cette commande")
    }
}
module.exports.help = {
    name: "ban+"
}