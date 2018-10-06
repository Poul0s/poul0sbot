const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('message', message => {
    let command = message.content.split (" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "PermKick");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de kick.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {

            return message.reply("Tu as oublier de mentionner une personne").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply ("Je n'arrive pas à expulser cet utilisateur, tu t'es peut être trompé ou tu as essayé de kick un joueur impossible à expulser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permissions de kick (KICK_MEMBERS").catch(console.error);
        }
        kickMember.kick.then(member =>{
            message.reply(`${member.user.username} a été expulser du serveur`).catch(console.error);
        }).catch(console.error)
    }
    if (command === "ban"){
        let modRple = message.guild.roles.find("name", "PermBan");
        if(!message.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de ban.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Tu as oublier de mentionner une personne.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été bannis du serveur.`).catch(console.error);
        }).catch(console.error)
    }})


bot.on('ready', function () {
    bot.user.setAvatar('./avatar.png')
        .then(() => console.log('Avatar mis en place'))
        .catch(console.error)
    bot.user.setGame('vec neji')
        .then(() => console.log('Jeux mis en place'))
        .catch(console.error)
})

bot.on('guildMemberadd', function (member){
    member.createDM().then(function (channel){
   return channel.send('Bienvenue sur le serveur')
        }).catch(consol.error)
})

bot.on('message', function (message) {
  if (message.content === 'bonjour') {
     message.channel.send('salut')
  }
 })

bot.login(process.env.TOKEN)
