const Discord = require('discord.js')
module.exports.run = async (bot, message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    if(!emojiList) return message.reply("Il n'y pas pas d'émoji sur ce serveur")
    return message.reply(`${emojiList}`)
}
module.exports.help = {
    name: "listEmoji"
}