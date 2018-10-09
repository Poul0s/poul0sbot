const Discord = require('discord.js')
const bot = new Discord.Client()
const low  = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const client = new Discord.Client()
var prefix = ("/")

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

bot.on('mzssage', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Statistics d'xp de ${message.author.username}`)
                .setColor('#F4D03F')
                .setDescription("affichage des XP")
                .addField("XP: ", `${xpfinal[1]} xp`)
                .setFooter("Salut :p")
            message.channel.send({embed: xp_embed});
        }}})


bot.on('message', message =>{
    let command = message.content.split (" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "PermKick");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermKick** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.if)) {
            return message.reply("tu n'as pas la permission de kick.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {

            return message.reply("Tu n'a pas mentionné de personne").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply ("Je n'arrive pas à expulser cet utilisateur, tu t'es peut être trompé ou tu as essayé de kick un joueur impossible à expulser")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permissions de kick (KICK_MEMBERS").catch(console.error);
        }
        kickMember.kick.then(member =>{
            message.reply(`${member.user.username} a été expulser du serveur avec succès`).catch(console.error);
        }).catch(console.error)
    }
    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "PermBan");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermBan** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de bannir.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Tu as oublier de mentionner une personne.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été bannis du serveur.`).catch(console.error);
        }).catch(console.error)
    }})



bot.on('ready', function () {
    // bot.user.setAvatar('./avatar.png').catch(console.error)
    bot.user.setGame('use /join').catch(console.error)
        .then(() => console.log('setGame mis en place'))
    bot.user.setUsername('NejiBot').catch(console.error)
        .then(() => console.log('setusername mis en place'))
})

bot.on('guildMemberAdd', function (member){
    member.createDM().then(function (channel){
   return channel.send('Bienvenue sur le serveur')
        }).catch(consol.error)
})

bot.on('message', function (message) {
  if (message.content === 'Bonjour') {
     message.channel.send(`Salut ${message.author.username}`)
  }
 })

bot.on('message', function (message) {
    if (message.content === 'bonjour') {
        message.channel.send(`Salut ${message.author.username}`)
    }
})

bot.on('message', function (message) {
    if (message.content === prefix + 'help') {
        message.channel.send(`Les commande sont:
-**/help**
-**/ban**
-**/kick**
-**Bonjour**
-(soon)**/invite
-(soon)**/join**
PS:La commande help n'est pas terminer.`)
    }
})


bot.login(process.env.TOKEN)
