const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")){
        return message.reply("tu n'as pas les permission **MANAGE_ROLES**")
    }
    if(!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")){
        return message.reply("Je n'ai pas les permission **MANAGE_ROLES**")
    }
let addroleUser = message.guild.member(message.mentions.users.first());
 if(!addroleUser) {
     return message.reply ("Je n'arrive pas à trouvé cet utilisateur, tu t'es peut être trompé")
 }
 let paramsrole = message.content.split(" " + addroleUser + " ").slice(1);
     let addrole = paramsrole
     if(!addrole){
         return message.reply("tu n'as pas mis le grade a ajouté");
     }
     let addrole2 = message.guild.roles.find("name", `${addrole}`);
     if(!addrole2){
         return message.reply("je n'arrive pas à trouver ce role")
     }
     if(!addrole2 < message.author.roles){
         return message.reply("le roles que tu veux ajouté est plus grand que le tiens... je sait se que tu voulait faire...")
     }
     addroleUser.addRole(addrole2)
}
module.exports.help = {
    name: "addrole"
}