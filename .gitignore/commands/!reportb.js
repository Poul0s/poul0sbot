const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
if(message.mentions.users.size === 0) return message.reply("Tu n'a pas mentionné de personne").catch(console.error);
        let userreport = message.mentions.users.first()
        let raison = message.content.split(" " + userreport + " ").slice(1)
        let raison1 = raison[1];
        if(!raison) return message.reply("Tu n'as pas mis de raison")
        if(raison1 === "spam command"){
            bot.users.get("300546341518573569").send(`${userreport.id} ${userreport.username} à été report sur le serveur ${message.guild.name} pour spam commande`);
          }
          if(raison1 === "autre"){
              let raisonother = message.content.split(" " + userreport + " " + raison1 + " ").slice(1)
              let raisonother2 = raisonother
              if(!raisonother) return message.reply("Tu n'as pas mis de raison pour autre...")
              if(raisonother2){
                bot.users.get("300546341518573569").send(`${userreport.id} ${userreport.username} à été report sur le serveur ${message.guild.name} pour ${raisonother2}`);
                console.log(`${userreport.id} ${userreport.username} à été report sur le serveur ${message.guild.name} pour ${raisonother2}`)
            }
          if(!raison === "spam command") return message.reply("Tu n'as pas mis un report valide, les report valide sont **autre** ou **spam command**")
}
}
module.exports.help = {
    name: "reportb"
}