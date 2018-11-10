const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var auth = message.author.id
    if(message.author.id === "300546341518573569") {
      bot.users.get("300546341518573569").send("Je m'eteint");
          message.channel.send("Ârret en cours").then(() => {
              console.log(`${bot.user.username} est désormais hors ligne.`)
      bot.destroy();
              process.exit()
          })
          }else{
            message.reply("Tu n'as pas les permissions pour faire ceci")
            bot.users.get("300546341518573569").send(`${message.author.id} a voulu m'éteindre`)
            console.log(`Tentative de stoppage par ${message.author.id}`)
            return; 
          }
}
module.exports.help = {
    name: "stopbot"
}