const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
if(message.mentions.users.size === 0) return message.reply("Tu n'as pas mentionné d'utilisateur'").catch(console.error);
        let userreport = message.mentions.users.first()
        let raison = message.content.split(" " + userreport + " ").slice(1)
        let raison1 = raison[1];
        if(!raison) return message.reply("Tu n'as pas mis de raison")
            bot.users.get("300546341518573569").send(`${userreport.id} ${userreport.username} à été report sur le serveur ${message.guild.name} pour ^${raison1}`);
}
module.exports.help = {
    name: "reportb"
}