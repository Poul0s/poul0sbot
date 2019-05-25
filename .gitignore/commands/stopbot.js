const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    if(message.author.id === "519186194886688779") {
      bot.users.get("519186194886688779").send("Je m'eteint");
          message.channel.send("Ârret en cours").then(() => {
              console.log(`${bot.user.username} est désormais hors ligne.`)
      bot.destroy();
              process.exit()
          })
          }else{
            message.reply("Tu n'as pas les permissions pour faire ceci")
            bot.users.get("519186194886688779").send(`${message.author.id} a voulu m'éteindre`)
            console.log(`Tentative de stoppage par ${message.author.id}`)
            return; 
          }
}
module.exports.help = {
    name: "stopbot"
}