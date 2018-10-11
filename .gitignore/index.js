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
    bot.user.setGame('use /help').catch(console.error)
        .then(() => console.log('setGame mis en place'))
    bot.user.setUsername('NejiBot').catch(console.error)
        .then(() => console.log('setusername mis en place'))
})

bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send("Bienvenue sur le serveur, n'hesite pas à utilisé la commande /help pour savoir les commande que je fais.")
    }).catch(console.error)
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

//ancienne commande help en cas de problème
//bot.on('message', function (message) {
//    if (message.content === prefix + 'help') {
//        message.channel.send(`Les commande sont:
//-**/help**
//-**/ban**
//-**/kick**
//-**Bonjour**
//-(soon)**/invite**
//-**/join**
//-**/serverlist**
//-**/ping**(bugger un peut xD)
//-(désactivé raison : bug)**/clear**
//-**/8ball**(la commande ne marche pas, si un pro dev pourrait m'aider sur Poul0s#8358 , sa serait gentil.)
//-**/info**
//PS:La commande help n'est pas terminer.`)
//    }
//})
//fin de l'ancienne commande help

bot.on('message', message => {
    if(message.content === prefix + "help")
        var embed = new Discord.RichEmbed()
            .setTitle("Liste des commande")
            .addField("/help", "Permet de voir la liste des commande.")
            .addField("/ban", "Permet de bannir un utilisateur.")
            .addField("/kick", "Permet de kick un membre du serveur.")
            .addField("(soon) /invite", "Permet de m'ajouter sur ton serveur discord, mais la je suis en beta donc je ne suis pas public.")
            .addField("/join", "Permet de rejoindre mon serveur discord.")
            .addField("/serverlist", "permet de voir la liste des serveur ou je suis.")
            .addField("(bug) /ping", "Permet de voir la latence entre moi et le serveur.")
            .addField("(desactivé) /clear", "permet de clear tout les message d'un salon.")
            .addField("/8ball (la commande ne marche pas, si un pro dev pourrait m'aider sur Poul0s#8358 , sa serait gentil.)", "On pose une question et le bot repond aléatoirement.")
            .addField("/info", "Permet de voir les info du serveur.")
            .addField("/NejiChat **VotreMessage**", "Le /NejiChat est une commande qui permet de parler avec tout les autre serveur qui m'ont, mais cela require le salon textuel #neji-chat")
            .addField("/createur", "Permet de savoir qui m'a crée")
            .addField("PS", "Vu que le bot n'est pas terminé, la commande n'est pas terminé non plus.")
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
    message.channel.sendEmbed(embed)
})


 bot.on('message', function (message) {
    if (message.content === prefix + 'join') {
        message.channel.send(`Si tu veux venir sur mon discord join sur https://discord.gg/yJBdh6z`)
    }
})

bot.on('message', function (message) {
    if (message.content === prefix + 'invite') {
        message.channel.send(`Mon bot n'est pas encore prêt à etre rendu public, sorry ${message.author.username}.`)
    }
})

bot.on('message', function (message) {
    if (message.content === prefix + 'ping'){
        message.channel.sendMessage('Le temps de latence sur le serveur = `' + `${message.createdTimestamp - Date.now()}` + ' ms`')
    }
})

bot.on('message', function (message) {
    if (message.content === prefix + 'serverlist'){
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
    }
})



//beta bot.on('message', function (message) {
//beta    if (message.content === prefix + 'clear') {
//beta         if (message.member.hasPermission("MANAGE_MESSAGES")){
//beta            message.channel.fetchMessage()
//beta                .then(function(list){
//beta                    message.channel.bulkDelete(list);
//beta                }, function(err){message.channel.send("Une erreur as été trouvé, merci de contacter @Poul0s#8358 avec le code 206")})
//beta         }
//beta    }
//beta })



bot.on('message', function (message) {
    if (message.content === prefix + "8ball"){
     let args = message.content.split(" ").slice(1);
     let tte = args.join(" ")
        if (!tte){
            return message.reply("Tu n'as pas poser de question")};

            var replys = [
                "Oui",
                "non",
                "Je sait pas, laisse moi réflechir",
                "Ptetre ya moyen",
                "T'es un malade bernard, **UN MALADE**"
            ].catch(console.error)

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball")
            .addField("Question", tte)
            .addField("Réponse", reponse)
            message.channel.sendEmbed(bembed)
        }})

bot.on('message', message => {
    if(message.content === prefix + "info")
    var embed = new Discord.RichEmbed()
        .setDescription("information du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Le discord a été créée le", message.guild.createdAt)
        .addField("Tu as rejoins le discord le", message.guild.joinedAt)
        .addField("Membres total sur le discord", message.guild.memberCount)
    message.channel.sendEmbed(embed)
})

bot.on('message', function (message) {
    if(message.content.startsWith(prefix + 'NejiChat')) {
        let args = message.content.split(" ").slice(1);
        let xo03 = args.join(" ")
        var xo02 = message.guild.channels.find('name', 'neji-chat');
        if(!xo02) return message.reply("Il n'y as pas de salon textuel se nommant #neji-chat pour la commande /NejiChat")
        if(message.channel.name === 'neji-Chat') return message.channel.send("La commande doit être effectué dans le salon #neji-chat")
        if(!xo03) return message.reply("Tu n'as pas ecrit de message à envoyé à tout les discords.")
        var embedglobal = new Discord.RichEmbed()
            .setColor("#FE0000")
            .setTitle("Message Global")
            .addField("Pseudo", message.author.tag, true)
            .addField("Discord", message.guild.name, true)
            .addField("Message", xo03)
            .setFooter("NejiBot")
            .setTimestamp()
        bot.channels.findAll('name', 'neji-chat').map(channel => channel.send(embedglobal))
    }
})


bot.on('message', function (message) {
    if (message.content === prefix + "createur")
        message.channel.send("Mon créateur est Poul0s#8358")
})

bot.login(process.env.TOKEN)
