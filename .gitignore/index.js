const Discord = require('discord.js')
const bot = new Discord.Client()
const low  = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const ms = require ("ms");
var prefix = ("/")


//début xp
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

bot.on('message', message => {

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
                .setColor('#FE0000')
                .setDescription("affichage des XP")
                .addField("XP: ", `${xpfinal[1]} xp`)
                .setFooter("NejiBot")
                .setTimestamp()
                message.channel.send(xp_embed);
        }}
    });
    
    
        //fin xp

//début kick ban
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
    }
    //fin kick ban

    //début clear
        if(command === 'clear') {
            let modRole = message.guild.roles.find("name", "PermMute");
            if(!modRole) return message.reply("Il n'y as pas de grade **PermMute** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de clear.")
        }
            var args2 = message.content.split(" ").slice(1);
            var messagecount = parseInt(args2.join(" "))
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
            message.delete()
    }
    //fin clear
    

    //début mute
    if(command === 'mute') {
            let modRole = message.guild.roles.find("name", "PermMute");
            if(!modRole) return message.reply("Il n'y as pas de grade **PermMute** sur le serveur, veuillez en créer un s'il vous plaît")
            if(!message.member.roles.has(modRole.id)) {
                return message.reply("Tu n'as pas la permissions de mute.")
            }
            let member = message.mentions.members.first();
            if(!member) return message.reply("tu n'as pas mentionné de personne valide");
            let muteRole = message.guild.roles.find("name", "Muted");
            if(!muteRole) return message.reply("Il n'y as pas de grade **Muted** sur le serveur, veuillez en créer un s'il vous plaît");
            let params = message.content.split(" ").slice(1);
            let time = params[1];
            if(!time) return message.reply("tu n'as pas spécifié de temps de mute.");

            member.addRole(muteRole.id);
            message.channel.send(`${message.author.username} à mute ${member.user.tag} pendant ${ms(ms(time), {long: true})} ! PS: si le grade se redémarre ou crash avant la fin du mute, il faudra enlevé le grade Muted manuellement.`);

            setTimeout(function() {
              member.removeRole(muteRole.id);
              message.channel.send(`${member.user.tag}, ton temps de mute est finit, tu peux désormais reparlé`)
            }, ms(time));
    }
    //fin mute


//début bonjour
    if (message.content === 'Bonjour') {
        message.channel.send(`Salut ${message.author.username}`);
    }


    if (message.content === 'bonjour') {
        message.channel.send(`Salut ${message.author.username}`);
    }
//fin bonjour

if(command === 'report'){
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!rUser) return message.reply("tu n'as pas mentionné d'utilisateur");
let reason = args.join(" ").slice(22);
if(!reason) return message.reply("Tu n'a pas mis de réson.")

let reportEmbed = new Discord.RichEmbed()
.setTitle(`Report`)
.setColor("#FE0000")
.addField(`Joueur Report`, message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])))
.addField(`Pour`, reason)
.addField(`Joueur qui a report`, message.author.tag)
.addField(`Dans le channel`, message.channel)
.setFooter("NejiBot")
.setTimestamp()

let reportschannel = message.guild.channels.find(`name`, "reports")
if(!reportschannel) {
    message.guild.createChannel("reports")
    message.reply("il n'y avait pas de salon report, il viens d'être créer, merci de refaire un report.")
}

return bot.channels.findAll("name", "reports").map(channel => channel.send(reportEmbed));

    
}

//début help
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

    if(command === "help")
        var embed = new Discord.RichEmbed()
            .setTitle("Liste des commande")
            .addField("/help", "Permet de voir la liste des commande.")
            .addField("/ban", "Permet de bannir un utilisateur.")
            .addField("/kick", "Permet de kick un membre du serveur.")
            .addField("/invite", "Permet de m'ajouter sur ton serveur discord.")
            .addField("/join", "Permet de rejoindre mon serveur discord.")
            .addField("/serverlist", "permet de voir la liste des serveur ou je suis.")
            .addField("(bug) /ping", "Permet de voir la latence entre moi et le serveur.")
            .addField("/8ball", "On pose une question et le bot répond aléatoirement.")
            .addField("/info", "Permet de voir les info du serveur.")
            .addField("/NejiChat **VotreMessage**", "Le /NejiChat est une commande qui permet de parler avec tout les autre serveur qui m'ont, mais cela require le salon textuel #neji-chat")
            .addField("/créateur", "Permet de savoir qui m'a crée")
            .addField("/clear", "Permet d'effacer de 2 à 100 message.")
            .addField("/chifoumi", "Permet de faire un pierre feuille ciseaux avec le bot")
            .addField("/mute", "Permet de mute un utilisateur (/mute @Poul0s#8358 10m) /x PS: Faite gaf que le grade Muted n'ai pas les permissions de parle et d'envoyer des message.")
            .addField("PS", "Vu que le bot n'est pas terminé, la commande n'est pas terminé non plus.")
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
    message.channel.send(embed);
//fin help

//début join
if(command === 'join') {
        message.channel.send(`Si tu veux venir sur mon discord join sur https://discord.gg/yJBdh6z`);
    }
//fin join

//début invite
if (command === 'invite') {
        message.channel.send(`Pour pouvoir m'invité sur ton serveur discord, va sur ce lien http://bit.ly/NejiBot ${message.author.username}.`);
    }
//fin invite

//début ping
if(command === 'ping'){
        message.channel.send('Le temps de latence sur le serveur = `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
    }
//fin ping

//début liste des serveur
if (command === 'serverlist'){
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`));
    }
//fin liste des serveur



//début 8ball
if (command === "8ball"){
     let args = message.content.split(" ").slice(1);
     let tte = args.join(" ")
        if (!tte){
            return message.reply("Tu n'as pas poser de question")};

            var replys = [
                "Oui",
                "non",
                "Je sait pas, laisse moi réflechir",
                "Ptetre ya moyen",
                "T'es un malade bernard, **UN MALADE**",
                "demande à ta mère",
                "demande à ton père",
                "enchallah comme on dirait en bretagne (désolé la bretagne)",
                "ok mais tu me doit 50€"
            ]

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball :8ball:")
            .addField("Question", tte)
            .addField("Réponse", reponse)
            message.channel.send(bembed);
        }
        //fin 8ball

//début info
if (command === "info")
    var embed = new Discord.RichEmbed()
        .setDescription("information du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Le discord a été créée le", message.guild.createdAt)
        .addField("Tu as rejoins le discord le", message.guild.joinedAt)
        .addField("Membres total sur le discord", message.guild.memberCount)
    message.channel.send(embed);
//fin info

/*
//déut creation neji-annonce
bot.on('ready', function () {
    let nej1 = bot.guild.channel.find('name', 'annonce-neji')
    //début de la création
    if(!nej1){
        try{
            nej1 = bot.guild.createChannel({
                name: "annonce-neji"
            })
        }catch(e){
            console.log(e.stack);
        }
    }
    //fin de la création

})
*/
//fin creation neji annonce

/*
bot.on("message", message => {
  let nej1 = message.guild.channels.find('name', 'annonce-neji')
  if(!nej1){
    message.guild.createChannel({
        name: "annonce-neji"
    })
} 
})
*/

bot.on('message', message => {
    if(message.content.startsWith(prefix + 'AnnonceNeji')) {
      let args8 = message.content.split(" ").slice(1);
    let nej1 = message.guild.channels.find('name', 'annonce-neji')
    if(!nej1){
     //message.guild.createChannel("annonce-neji")
     return message.reply(`Il n'y as pas de salon **annonce-neji** sur les serveur ${bot.channels.findAll("name", "annonce-neji").map()}`)
 }
 if(!args8) return message.reply("Tu dois entrer un message")
 
 if (message.author.id === "300546341518573569") {
     var embedannonce = new Discord.RichEmbed()
     .setTitle("Annonce")
     .setColor("#FE0000")
     .addField("message", args8)
     .setTimestamp()
     return bot.channels.findAll("name", "annonce-neji").map(channel => channel.send(embedannonce));
 
 }else{
     message.channel.send("Tu n'as pas les permissions d'envoyer une annonce")
 }  
    }  
})


 

 




//pk ya ca ??? : })
//fin creation neji annonce

//début chat global
if (command === 'NejiChat') {
        let args = message.content.split(" ").slice(1);
        let xo03 = args.join(" ")
        var xo02 = message.guild.channels.find('name', 'neji-chat');
        if(!xo02) return message.reply("Il n'y as pas de salon textuel se nommant #neji-chat pour la commande /NejiChat");
        if(message.channel.name === 'neji-Chat') return message.channel.send("La commande doit être effectué dans le salon #neji-chat");
        if(!xo03) return message.reply("Tu n'as pas ecrit de message à envoyé à tout les discords.");
        var embedglobal = new Discord.RichEmbed()
            .setColor("#FE0000")
            .setTitle("Message Global")
            .setDescription("Le message global est un message qui à été envoyé depuis un autre serveur, pour parler toi aussi au autre serveur, il faut utilisé la commande /NejiChat 'message'")
            .addField("Pseudo", message.author.tag, true)
            .addField("Discord", message.guild.name, true)
            .addField("Message", xo03)
            .setFooter("NejiBot")
            .setTimestamp()
        bot.channels.findAll('name', 'neji-chat').map(channel => channel.send(embedglobal));
    }
//fin chat global

//début créateur

//bot.on('message', function (message) {
//    if (message.content === prefix + "createur")
//        message.channel.send("Mon créateur est Poul0s#8358, les personnes qui ont aider le développeur pour me développé sont: Moitié prix#4263 et LePtitMetalleux#7215, dédicasse aussi à Pyrius#9402 et KeNoDa#4258")
//})

if (command === "créateur")
        var embedcréateur = new Discord.RichEmbed()
        .setTitle("Mon créateur + dédicasse")
        .setDescription("Sur ce message, vous allez voir qui m'a crée, qui m'a aidé pour le développement et des dédicasse.")
        .addField("Créateur", "Poul0s#8358")
        .addField("Ceux qui ont aidé mon créateur", "Moitié prix#4263 et LPtitMetalleux#7215")
        .addField("dédicasse", "Pyrius#9402 et KeNoDa#4258")
        .setColor("#FE0000")
        .setFooter("NejiBot")
        .setTimestamp()
    message.channel.send(embedcréateur);
//fin créateur

//début trakafoins
    if(message.content === "trakafoins")
    message.channel.send("TRAAAKAAAFOOIIINNNNS");
//fin trakafoins

//début token
if (command === "token")
    message.channel.send(`${message.author.username} mon token est T UN MALADE JAMAIS JLE DIRAIT`);
//fin token 

//début chifoumi
if (command === "chifoumi"){
     let argspierre = message.content.split(" ").slice(1);
     let ttepierre = argspierre.join(" ")
        if (!ttepierre){
            return message.reply("Tu n'as pas choisix ton action")};

            var replys = [
                "feuille",
                "pierre",
                "ciseaux"
            ]

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var embedpierre = new Discord.RichEmbed()
            .setTitle("chifoumi")
            .addField(`${message.author.username} :`, ttepierre)
            .addField(`NejiBot :`, reponse)
            .setFooter("NejiBot")
            .setTimestamp()
            .setColor("FE0000")
            message.channel.send(embedpierre);
        }
        //fin chifoumi

        /*
        //début annonce all serv
        if(message.author.id === "300546341518573569") {
            if(command === 'AnnonceNeji') {
                let argsp = message.content.split(" ").slice(1);
                let ne03 = argsp.join(" ")
                var ne02 = message.guild.channels.find('name', 'annonce-neji');
                if(!ne02) return message.reply("Il n'y as pas de salon textuel se nommant #annonce-neji pour la commande /AnnonceNeji");
                if(message.channel.name === 'neji-Chat') return message.channel.send("La commande doit être effectué dans le salon #Annonce-Neji");
                if(!ne03) return message.reply("Tu n'as pas ecrit de message à envoyé à tout les discords.");
                var embedglobalp = new Discord.RichEmbed()
                    .setColor("#FE0000")
                    .setTitle("Annonce NejiBot")
                    .addField("Discord", message.guild.name, true)
                    .addField("Message", ne03)
                    .setFooter("NejiBot")
                    .setTimestamp()
                bot.channels.findAll('name', 'annonce-neji').map(channel => channel.send(embedglobalp));
            }
        }
    });
    */


//début option bot
bot.on('ready', function () {
    // bot.user.setAvatar('./avatar.png').catch(console.error)
    bot.user.setActivity('use /help', {type: "STREAMING"}).catch(console.error)
        .then(() => console.log('setGame mis en place'))
    bot.user.setUsername('NejiBot').catch(console.error)
        .then(() => console.log('setusername mis en place'))
        
});
//fin option bot



//début nouveau membre
bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send("Bienvenue sur le serveur, n'hesite pas à utilisé la commande /help pour savoir les commande que je fais.");
    }).catch(console.error)
});
//fin nouveau membre
})

bot.login(process.env.TOKEN)
