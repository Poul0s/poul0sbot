const Discord = require('discord.js')
const bot = new Discord.Client()
const low  = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const ms = require ("ms");
var prefix = ("/")
var version = ("[1.0.0]")
 
bot.on("message", message => {
    var blackembed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Commande impossible à effectuer!")
  .addField("Vous ne pouvez pas m'utiliser car vous êtes banni du bot!", "Vous avez peut être essayé de me faire crash :/", true)
  .setImage("http://www.parisenligne.com/wp-content/imgs/image-liste-noire-70.jpg")
   if(message.content.startsWith(prefix)) {
    if(message.author.id === "ID1") return message.channel.send(blackembed)
  }
})
//début option bot
bot.on('ready', function () {
    // bot.user.setAvatar('./avatar.png').catch(console.error)
    //bot.user.setActivity({name: "use /help", type: "STREAMING", url: "https://www.twitch.tv/realnejibot"}).catch(console.error)
    //.then(() => console.log('setactivity reussi'))
    //bot.user.setActivity(`use /help | ${bot.guilds.size} serveurs `, { type: 'STREAMING', url: 'https://www.twitch.tv/realnejibot' }).then(() => console.log('setActivity reussi'))
    bot.user.setUsername('NejiBot').catch(console.error)
        .then(() => console.log('setusername mis en place'))
    bot.user.setStatus("dnd")
});
function changing_status() {
     let status = [`/help | versions ${version}`, `/help | ${bot.guilds.size} serveurs`, `/help | ${bot.users.size} membre`, '/help | soon site web', '/help | /maj']
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random, { type: 'STREAMING', url: 'https://www.twitch.tv/realnejibot' })
 }
 
 bot.on("ready", () => {
    console.log(`${bot.user.username} est en ligne sur ${bot.guilds.size} serveurs avec : ${bot.users.size} urilisateur`);
    setInterval(changing_status, 5000);
})
//fin option bot
/* juste rien
bot.on('ready', memberbl => {
let blacklist = ['256072394026778624', '390535949278380033', '367978177483505664'];
let foundInGuild = false;
    for (for i in blacklist) {
        if(bot.guilds.toLowerCase().includes(blacklist[i].toLowerCase())) foundInGuild = true;
    }
    if (foundInGuild) {
        user.guild.kick.then
    }
})
rien*/
 
//Neji+ : https://discordapp.com/oauth2/authorize?client_id=503107250911444994&scope=bot&permissions=8
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
bot.on('message', message => {
    let command = message.content.split (" ")[0];
    let cmd = message.content.split (" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    var auth = message.author
    command = args.shift().toLowerCase();
    if (message.content.startsWith(prefix + "kick")) {
        let modRole = message.guild.roles.find("name", "PermKick");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermKick** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("tu n'as pas la permission de kick.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
 
            return message.reply("Tu n'a pas mentionné de personne").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply ("Je n'arrive pas à expulser cet utilisateur, tu t'es peut être trompé ou tu as essayé de kick un joueur impossible à expulser")
        }
        let params3 = message.content.split(" " + kickMember + " ").slice(1);
        let réson2 = params3
        if(!réson2) return message.reply("tu n'as pas mis de réson à ton ban");
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permissions de kick (KICK_MEMBERS").catch(console.error);
        }
        kickMember.kick().then(member => {
//            message.reply(`${member.user.username} a été expulser du serveur avec succès`).catch(console.error);
            let authorkick = message.author
            var embedkick = new Discord.RichEmbed()
            .setAuthor(authorkick.username, authorkick.displayAvatarURL)
            .setTitle("kick")
            .addField("Auteur du kick :", `${message.author.username}`)
            .addField("Personne kick :", `${kickMember.user.username}`)
            .setImage(`${kickMember.user.displayAvatarURL}`)
            .addField("raison :", réson2)
            .setFooter("NejiBot")
            .setTimestamp()
            message.channel.send(embedkick);
            kickMember.createDM().then(function (channel) {
                return channel.send(`Tu as été kick du serveur ${message.guild.name} pour ${réson}`)
            });
        }).catch(console.error)
    }
    if (message.content.startsWith(prefix + "ban")) {
        let modRole = message.guild.roles.find("name", "PermBan");
        if(!modRole) return message.reply("Il n'y as pas de grade **PermBan** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de bannir.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Tu as oublier de mentionner une personne.");
        let params2 = message.content.split(" " + member + " ").slice(1);
        let réson = params2
        if(!réson) return message.reply("tu n'as pas mis de réson à ton ban");
        member.ban().then(member => {
//            message.reply(`${member.user.username} a été bannis du serveur.`).catch(console.error);
            let authorban = message.author
            var embedban = new Discord.RichEmbed()
            .setAuthor(authorban.username, authorban.displayAvatarURL)
            .setTitle("Ban")
            .addField("Auteur du ban :", `${message.author.username}`)
            .addField("Personne banni :", `${member.user.username}`)
            .setImage(`${member.user.displayAvatarURL}`)
            .addField("raison :", réson)
            .setFooter("NejiBot")
            .setTimestamp()
            message.channel.send(embedban);
 
            member.createDM().then(function (channel2) {
                return channel2.send(`Tu as été bannis du serveur ${message.guild.name} pour ${réson}`)
            });
        }).catch(console.error)
    }
    //fin kick ban
    if(message.content.startsWith(prefix + "maj")){
        var embedmaj = new Discord.RichEmbed()
        .setAuthor(auth.username, auth.displayAvatarURL)
        .setTitle(`Maj ${version}`)
        .setDescription("Pour voir toute les maj, utilise la commande /AllMaj")
        .addField("Ajout :", "/giveaway | /maj | /AllMaj | /addRole")
        .addField("Modification :", "/help | status")
        .addField("/Giveaway :", "Permet d'organisé des concours.")
        .addField("/maj", "Permet de voir les nouveauté de la maj la plus récente.")
        .addField("/AllMaj", "permet de voir toutes les nouveauté de mise à jour jusqu'à 10 maj")
        .addField("/addRole", "Permet d'ajouté un role à quelqu'un (peut être très utile sur téléphone)")
        .addField("/help", "La commande /help s'affiche désormais en message privé.")
        .addField("status", "le status change toute les 5 secondes désormais")
        .setFooter("NejiBot")
        .setTimestamp()
        .setColor("FE0000")
        return message.channel.send(embedmaj)
    }
    if(message.content.startsWith(prefix + "AllMaj")){
        var embedmajall = new Discord.RichEmbed()
        .setAuthor(auth.username, auth.displayAvatarURL)
        .setTitle("Liste des maj")
        .setDescription("Si vous voyer que ya qu'une seule maj c psk les autre se rajouterons au fur et a mesure")
        .addField("maj [1.0.0]", "Nouveauté: /giveaway | /maj | /AllMaj | /addRole, Modification: /help | status")
        .setFooter("Nejibot")
        .setTimestamp()
    }
/*
    //début clear
    if(message.content.startsWith(prefix + 'clear')) {
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
*/
    //début mute
    if(message.content.startsWith(prefix + 'mute')) {
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
        let paramsm = message.content.split(" " + member + " " + time + " ").slice(1);
        let résonm = paramsm
        if(!résonm) return message.reply("tu n'as pas mis de réson à ton mute");
        member.addRole(muteRole.id);
        //message.channel.send(`${message.author.username} à mute ${member.user.tag} pendant ${ms(ms(time), {long: true})} ! PS: si le grade se redémarre ou crash avant la fin du mute, il faudra enlevé le grade Muted manuellement.`);
        let authormute = message.author
        var embedmute = new Discord.RichEmbed()
        .setAuthor(authormute.username, authormute.displayAvatarURL)
        .setTitle("Mute")
        .addField("Auteur du mute :", `${message.author.username}`)
        .addField("Personne banni :", `${member.user.username}`)
        .setImage(`${member.user.displayAvatarURL}`)
        .addField("Pendant :", `${ms(ms(time), {long: true})}`)
        .addField("raison :", résonm)
        .setFooter("NejiBot")
        .setTimestamp()
        message.channel.send(embedmute);
        setTimeout(function() {
            member.removeRole(muteRole.id);
            message.channel.send(`@${member.user.tag}, ton temps de mute est finit, tu peux désormais reparlé`)
        }, ms(time));
    }
    //fin mute
    //"280440665182175243" |
    if(message.content.startsWith(prefix + "kenodar")) {
      if(message.author.id === "280440665182175243" | "300546341518573569") {
          var embedkr = new Discord.RichEmbed()
          .setTitle('[Règle du Discord]')
          .setDescription("Afin que la bonne ambiance et le respect soit présent voici les quelques règles à respecter sur ce discord !")
          .addField("Numéro 1", "Le respect est une priorité sur le discord si vous ne respecter pas un membre quelconque vous serait automatiquement sanctionné !")
          .addField("Numéro 2", "Interdiction d'insulté, menace irl, menace de hack un membre quelconque")
          .addField("Numéro 3", "Les propos nazis ou anticémites sont totalement interdits sur ce discord !")
          .addField("Numéro 4", "Si les personnes qui développe ne vous répondent pas tout de suite il est inutile de les spammer, il est nécésaire de leurs donner une bonne condition de travail pour développer !")
          .addField("Numéro 5", "Il est inutile de spammer un membre du staff ! ils vous réponderont dans les plus bref délai !")
          .setColor("#FE0000")
          .setFooter("Règlement")
          message.channel.send(embedkr);
      }else{
          message.reply("Tu n'as pas la permissions d'utilisé cette commande")
      }
    }
    if(message.content.startsWith(prefix +'ban+')) {
        if(message.author.id === "300546341518573569") {
            const member = message.mentions.members.first();
            if (!member) return message.reply("Tu as oublier de mentionner une personne.");
            member.ban().then(member => {
                message.reply(`${member.user.username} a été bannis du serveur.`).catch(console.error);
                message.delete()
            }).catch(console.error)
        }else{
            message.channel.send("Tu n'as pas la permission d'exécuter cette commande.");
        }}
//début bonjour
    if (message.content === 'Bonjour') {
        message.channel.send(`Salut ${message.author.username}`);
    }
    if (message.content === 'bonjour') {
        message.channel.send(`Salut ${message.author.username}`);
    }
//fin bonjour
    if(message.content.startsWith(prefix +  'report')){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.reply("tu n'as pas mentionné d'utilisateur");
        let reason = args.join(" ").slice(22);
        if(!reason) return message.reply("Tu n'a pas mis de réson.")
        let userr = message.author
        let reportEmbed = new Discord.RichEmbed()
            .setAuthor(userr.username, userr.displayAvatarURL)
            .setTitle(`Report`)
            .setColor("#FE0000")
            .addField(`Joueur Report`, message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])))
            .addField(`Pour`, reason)
            .addField(`Sur le discord`, message.guild.name)
            .addField(`Dans le channel`, message.channel)
            .setFooter("NejiBot")
            .setTimestamp()
        let reportschannel = message.guild.channels.find(`name`, "reports")
        if(!reportschannel) {
            message.guild.createChannel("reports")
            message.reply("il n'y avait pas de salon report, il viens d'être créer, merci de refaire un report.")
        }
//return bot.channels.findAll("name", "reports").map(channel => channel.send(reportEmbed));
        reportschannel.send(reportEmbed);
    }
//début help
    if(message.content.startsWith(prefix +  "help")){
    let userre = message.author
        let embed = new Discord.RichEmbed()
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
            .addField("/report", "Permet de report un joueur pour une telle raison.")
            .addField("/blague", "Le bot répond avec une blague aléatoire.")
            .addField("/mute", "Permet de mute un utilisateur (/mute @Poul0s#8358 10m) /x PS: Faite gaf que le grade Muted n'ai pas les permissions de parle et d'envoyer des message.")
            .addField("/énigme", "Le bot répond avec une énigme aléatoire")
            .addField("/giveaway", "Permet d'organiser des giveaway, exemple /giveaway 5 1 10€ paysafecard")
            .addField("/Maj", "Permet de voir la maj la plus récente")
            .addField("/AllMaj", "Permet de voir la liste des mise a jour jusqu'a 10 maj")
            /*
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            .addField("")
            */
            .addField("PS", "Vu que le bot n'est pas terminé, la commande n'est pas terminé non plus.")
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
    message.channel.send("aide envoyé en privé");
        userre.createDM().then(function (channelhelp) {
         channelhelp.send(embed);
    })
}
if(message.content.startsWith(prefix +  "warn")){
    if(!auth) return message.channel.send("tu n'as pas mentionné d'utilisateur")
    var warnuser = message.mentions.users.first();
    let paramswarn = message.content.split(" " + warnuser + " ").slice(1);
    let raisonwarn = paramswarn
    if(!message.guild.channels.find(`name`, "warn")) return message.reply("le channel #warn est inexistant")
    var embedwarnDM = new Discord.RichEmbed()
    .setAuthor(auth.username, auth.displayAvatarURL)
    .setTitle("WARN")
    .addField("raison", `Tu as été warn du serveur ${message.guild.name} à ${message.createdTimestamp} pour ${raisonwarn} `)
    .setFooter("NejiBot")
    .setTimestamp()
    warnuser.createDM().then(function (channelwarnDM) {
        channelwarnDM.send(embedwarnDM)
    })
    var embedwarnPUBLIC = new Discord.RichEmbed()
    .setAuthor(auth.username, auth.displayAvatarURL)
    .setTitle("WARN")
    .addField("Personne warn :", `${warnuser.username}`)
    .addField("raison du warn :", `${raisonwarn}`)
    .addField("warn à:", `${message.createdTimestamp}`)
    message.guild.channels.find(`name`, "warn").send(embedwarnPUBLIC);
    return;
    }
   if(message.content.startsWith(prefix +  "addrole")){
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
    if(message.content === "#GABARD"){
        message.channel.send("Muena muena muene kisuéyawésa")
    }
    /*
    if(message.content === `${bot.Client.tag}`){
        message.channel.send("Oui, c'est moi")
    }
    pb*/
//début join
    if(message.content.startsWith(prefix +  'join')) {
        message.channel.send(`Si tu veux venir sur mon discord join sur https://discord.gg/yJBdh6z`);
    }
//fin join
 
//début invite
    if (message.content.startsWith(prefix +  'invite')) {
        message.reply(`Pour pouvoir m'invité sur ton serveur discord, va sur ce lien http://bit.ly/NejiBot , après tu peux aussi inviter mon double qui va supprimé tout les mauvais message, pour l'inviter va sur ce lien : http://bit.ly/NejiPlus .`);
    }
//fin invite
 
//début ping
    if(message.content.startsWith(prefix +  'ping')){
        message.channel.send('Le temps de latence sur le serveur = `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
    }
//fin ping
 
//début liste des serveur
    if (message.content.startsWith(prefix +  'serverlist')){
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`));
    }
//fin liste des serveur
//début 8ball
    if (message.content.startsWith(prefix +  "8ball")){
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
    if (message.content === "/solution 1"){
        message.channel.send(`${message.author.username} : Hier, on était le 31 décembre, elle a eu 18 ans. Cette année, elle va avoir 19 ans et l'année prochaine, 20 ans.`);
    }
 
    if (message.content === "/solution 2"){
        message.channel.send(`${message.author.username} : 3 car il reste l'odorat, le toucher et le goût. Muet ne correspond pas à la privation d'un sens.`)
    }
 
    if (message.content === "/solution 3"){
        message.channel.send(`${message.author.username} : le someil`)
    }
 
    if (message.content === "/solution 4"){
        message.channel.send(`${message.author.username} : La vie ! Plus on avance dans le temps, plus on s'approche de la mort`)
    }
 
    if (message.content === "/solution 5"){
        message.channel.send(`${message.author.username} : L'équilibre, car lorsqu'on perd l'équilibre on tombe.`)
    }
 
    if (message.content === "/solution 6"){
        message.channel.send(`${message.author.username} : essaye de traduire cette ligne de code de hexadecimal à texte normal`)
    }
 
    if (message.content === "/solution 7"){
        message.channel.send(`${message.author.username} : essaye de traduire ce texte de binaire en texte puis ce texte à texte normal`)
    }
 
    if (message.content === "/solution 8"){
        message.channel.send(`${message.author.username} : essaye de traduire ce texte de hexadecimal en texte puis ce texte en binaire à texte`)
    }
 
    if (message.content === "/solution 9"){
        message.channel.send(`${message.author.username} : essaye de traduire ce texte de binaire en texte normal`)
    }
if(message.content.startsWith(prefix +  "énigme")){
        var enigme = [
            "01000010 01110010 01100001 01110110 01101111 00101100 00100000 01110100 01110101 00100000 01100001 01110011 00100000 01100011 01101111 01101101 01110000 01110010 01101001 01110011 00100000 01110001 01110101 01100101 00100000 01100011 01011100 00100111 11101001 01110100 01100001 01101001 01110100 00100000 01100100 01110101 00100000 01100010 01101001 01101110 01100001 01101001 01110010 01100101 (solution : /solution 9)",
            "Avant-hier, Julie avait 17 ans mais l'année prochaine, elle aura 20 ans. Comment est-ce possible ? (pour la solution ecrit /solution 1)",
            "Si je suis muet, aveugle et sourd, combien de sens me reste-t-il ?(normalement il y en as 5 mdr on sait jamais) (pour la solution écrit /solution 2)",
            "On me cherche la nuit, Quand on me trouve, On ne s'en rend compte que quand je suis parti. Qui suis-je ? (pour la solution écrivez /solution 3)",
            "Qu'est ce qui s'allonge et rétrécit en même temps ? (pour solution : /solution 4)",
            "Si tu me perds, tu tombes. Qui suis-je ? (solution : /solution 5",
            "42 72 61 76 6f 2c 20 73 69 20 74 75 20 61 73 20 72 c3 a9 75 73 73 69 20 63 65 74 74 65 20 c3 a9 6e 69 67 6d 65 20 65 6e 20 68 65 78 61 64 c3 a9 63 69 6d 61 6c 20 73 61 6e 73 20 73 6f 6c 75 74 69 6f 6e 2c 20 74 75 20 65 73 74 20 75 6e 20 67 c3 a9 6e 69 65 (solution : /solution 6)",
            "00110111 00110011 00100000 00110110 00111001 00100000 00110010 00110000 00100000 00110111 00110100 00100000 00110111 00110101 00100000 00110010 00110000 00100000 00110110 00110001 00100000 00110111 00110011 00100000 00110010 00110000 00100000 00110111 00110100 00100000 00110111 00110010 00100000 00110110 01100110 00100000 00110111 00110101 00100000 00110111 00110110 00100000 01100011 00110011 00100000 01100001 00111001 00100000 00110010 00110000 00100000 00110110 01100011 00100000 00110010 00110111 00100000 01100011 00110011 00100000 01100001 00111001 00100000 00110110 01100101 00100000 00110110 00111001 00100000 00110110 00110111 00100000 00110110 01100100 00100000 00110110 00110101 00100000 00110010 00110000 00100000 00110111 00110011 00100000 00110110 00110001 00100000 00110110 01100101 00100000 00110111 00110011 00100000 00110010 00110000 00100000 00110110 01100011 00100000 00110110 00110001 00100000 00110010 00110000 00100000 00110111 00110011 00100000 00110110 01100110 00100000 00110110 01100011 00100000 00110111 00110101 00100000 00110111 00110100 00100000 00110110 00111001 00100000 00110110 01100110 00100000 00110110 01100101 00100000 00110010 00110000 00100000 00110110 01100001 00100000 00110111 00110100 00100000 00110110 00110101 00100000 00110010 00110000 00100000 00110111 00110000 00100000 00110110 00110001 00100000 00110111 00111001 00100000 00110110 00110101 00100000 00110010 00110000 00100000 00110111 00110101 00100000 00110110 01100101 00100000 00110010 00110000 00100000 00110110 01100010 00100000 00110110 00110101 00100000 00110110 00110010 00100000 00110110 00110001 00100000 00110110 00110010 (solution : /solution 7)",
            "30 31 31 31 30 30 31 31 20 30 31 31 30 31 30 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 31 30 30 20 30 31 31 31 30 31 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 31 30 30 20 30 31 31 31 30 30 31 30 20 30 31 31 30 31 31 31 31 20 30 31 31 31 30 31 30 31 20 30 31 31 31 30 31 31 30 20 30 31 31 30 30 31 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 30 31 31 20 30 31 31 30 30 30 30 31 20 30 31 31 30 31 31 31 30 20 30 31 31 31 30 30 31 31 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 30 31 31 20 30 31 31 30 31 31 31 31 20 30 31 31 30 31 31 30 30 20 30 31 31 31 30 31 30 31 20 30 31 31 31 30 31 30 30 20 30 31 31 30 31 30 30 31 20 30 31 31 30 31 31 31 31 20 30 31 31 30 31 31 31 30 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 31 30 30 20 30 31 31 30 30 30 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 30 30 31 31 31 20 30 31 31 30 30 30 30 31 20 30 31 31 30 30 31 31 31 20 30 31 31 30 31 31 31 30 20 31 31 30 30 30 30 31 31 20 31 30 31 30 31 30 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 30 31 31 30 30 20 30 31 31 30 30 31 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 31 30 30 30 30 20 30 31 31 30 30 30 31 31 20 30 30 31 30 30 30 30 30 20 30 31 31 30 30 31 30 30 20 30 31 31 30 30 31 30 31 20 30 30 31 30 30 30 30 30 20 30 31 31 30 31 30 31 31 20 30 31 31 30 31 30 30 31 20 30 31 31 30 31 31 31 30 20 30 31 31 31 30 30 31 31 20 30 31 31 31 30 31 30 30 20 30 31 31 30 30 30 30 31 20 30 31 31 30 30 30 30 31 20 30 31 31 31 30 30 31 30 (solution : /solution 8)"
        ]
        let enigme2 = (enigme[Math.floor(Math.random() * enigme.length)])
        let auth = message.author
        let embede = new Discord.RichEmbed()
        .setTitle("énigme")
            .setAuthor(auth.username, auth.displayAvatarURL)
            .addField("L'énigme est:", enigme2)
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
        message.channel.send(embede)
    }
    if(message.content.startsWith(prefix +  "blague")){
        var blague = [
            "Quelle mamie fait peur au voleur ? Mamie Traillette",
            "J'ai fait une blague sur les magazin, mais elle a pas supermarché",
            "Pourquoi c'est dificile de conduire dans le nord ? parce que les voiture n'arrete pas de caller",
            "Comment est-ce que les chouette savent quand leurs mari boudent ? Parce qu'hiboude",
            "Pourquoi mettont tout les crocos en prison ? Parce que les crocos dealent",
            "Quel est le bar préférer des espagnol ? Le bar-celone",
            "Pourquoi les mexicains aime manger au toilette ? parce qu'ils aiment manger épicé (manger et pissé)",
            "Que faisaient les dinausores quand ils n'arrivait pas à se décider ? Des tirageosaure",
            "Quesqu'un tennis man adore faire ? Rendre un service",
            "Que se passe t'il quand deux poisson s'énerve ? Le thon monte",
            "Que fait un cendrier devant un assenceur ? il veut des cendres",
            "Quel est le jambon que tout le monde déteste ? le sale ami",
            "Que dit une noisette quand elle tombe à l'eau ? Je me noix",
            "Quel est le sport préféré des insecte ? Le criquet",
            "Pourquoi hulk a un beau jardin ? Car il a la main verte",
            "Que fait un hibou dans une casserole ? hi-boux",
            "Comment les abeille comunique entre elles ? par e-miel",
            "Que dit-on à une fleur qui a eu 0 à son controle ? Qu-elle s'est planté",
            "Que fait un employé de Sephora à sa pause clope ? il parfumer",
            "Qu'est ce qu'une frite enceinte ? Une patate sauté.",
            "Que fait une lampe quand elle se fait arréter ? elle crit À LED",
            "Pourquoi les bières sont toujours strésser ? parce qu'elles ont la pression",
            "Pourquoi les poisson n'ont plus de maison ? Car on les as des truite",
            "Pourquoi le lapin est bleu ? parce qu'on lapin",
            "Pourquoi Harry poter est triste ? Parce que personne n'harry à sa blague",
            "Comment appel t'on un combat entre un petit poid et une carotte ? un bon duel",
            "Pourquoi les éoliennes n'ont pas d'amis ? parce qu'elles se prenne toujours des vend",
            "D'où viennent les dangers les plus d'angereux ? D'angers",
            "Quel est la fée que tout les enfant déteste ? La fée C",
            "Quel poisson n'a pas de certificat de naissance ? le poisson-pané",
            "Comment s'avoir quand un rat est content ? il sourit",
            "Pourquoi ls chercheurs ont toujours un trou de mémoire ? car il se creuse la tête",
            "Quel est l'instrument de music préféré des maladit ? la bach-terie",
            "Que fait un geek quand il a peur ? il URL",
            "Quel est le fast-food préféré de flash ? quick",
            "Comment reconnaitre un cannibales ? Il manges des petits suisse",
            "Qu'est-qu'y est vert et qui se déplace dans l'eau ? Un chou marin",
            "Que fait une vache quand elle ferme les yeux ? Du lait concentré",
            "Quel super-héros donne le plus vite l'heure ? Speed heure man",
            "Quel est le fruit préféré des prof d'histoire ? les dates",
            "Quel est la déesse du wifi ? la déesse L",
            "Qu'est-ce qui est pire qu'un vent ? un vampire",
            "Qu'est-ce qu'un hamster dans l'espace ? Un hamsteroïde",
            "Quel est la femme de l'hamster ? L'hamsterdame",
            "Dans qu'elle pays ne bronze t'on pas du nez ? le Nepal",
            "Qu'elle est la différence entre la grammaire et le divorce ? Dans la grammaire c'est le masculin qui gagne",
            "Pourquoi Winnie l'ourson veut se marié ? Pour partir en lune de miel",
            "Que dit une mère geek à son fils pour venir manger ? alt tab",
            "Quel est la meilleur heure pour écouter la music ? Deezer",
            "Comment appel t'on un chat qui va dans l'espace ? un chatellite",
            "Que fait un jardinier quand il mange ? il raconte des salade",
            "Ou est-ce que l'homme transparent par t'il en vacanse ? chez ses trans parents",
            "Pourquoi Napoléon ne voulait pas s'acheté de maison ? parce qu'il avait un bonapart",
            "Que dit frodon devant sa maison ? C'est la que j'hobbit",
            "Qu'elles sont les deux fruit qu'on trouve devant les maison ? Les coins et les mûres",
            "Pourquoi un chasseur emmène t'il son fusil au toilette ? pour tirer la chasse",
            "Quel est le crustacé le plus léger de la mer ? Le palourde",
            "Que dit un informaticiens quand il s'ennui ? Je me fichier",
            "Où va messi quand il se blessent ? à la pharmessi",
            "Que demande un footballeur à son coiffeur ? la coupe du monde",
            "Quel mot devient drôle après qu'on lui ajoute une lettre ? C'est le mot rôle (d-rôle).",
            "Quel est l'animal le plus connecté ? Le porc USB"
        ]
        let reponseblague = (blague[Math.floor(Math.random() * blague.length)])
        let userb = message.author
        let embedb = new Discord.RichEmbed()
            .setTitle("blague")
            .setAuthor(userb.username, userb.displayAvatarURL)
            .addField("La blague est:", reponseblague)
            .setColor("#FE0000")
            .setFooter("NejiBot")
            .setTimestamp()
        message.channel.send(embedb)
    }
//début info
if (message.content.startsWith(prefix +  "info")){
    var embedi = new Discord.RichEmbed()
        .setDescription("information du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Le discord a été créée le", message.guild.createdAt)
        .addField("Tu as rejoins le discord le", message.member.joinedAt)
        .addField("j'ai rejoins le discord le", message.client.JoinedAt)
        .addField("Membres total sur le discord", message.guild.memberCount)
        .setColor("#FE0000")
        .setFooter("NejiBot")
        .setTimestamp()
    message.channel.send(embedi);
}
//fin info
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
if (message.content.startsWith(prefix +  "inc")){
    message.reply("Le message global est un message qui à été envoyé depuis un autre serveur, pour parler toi aussi au autre serveur, il faut utilisé la commande /NejiChat 'message'")
}
//début chat global
    if (message.content.startsWith(prefix +  'NejiChat')) {
        let args = message.content.split(" ").slice(1);
        let xo03 = args.join(" ")
        var xo02 = message.guild.channels.find('name', 'neji-chat');
        if(!xo02) return message.reply("Il n'y as pas de salon textuel se nommant #neji-chat pour la commande /NejiChat");
        if(message.channel.name === 'neji-Chat') return message.channel.send("La commande doit être effectué dans le salon #neji-chat");
        if(!xo03) return message.reply("Tu n'as pas ecrit de message à envoyé à tout les discords.");
        var embedglobal = new Discord.RichEmbed()
            .setColor("#FE0000")
            .setTitle("Message Global")
            .setDescription("utilise /inc pour avoir les info")
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
    if (message.content.startsWith(prefix +  "créateur")){
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
    }
//fin créateur
//début trakafoins
    if(message.content === "trakafoins")
        message.channel.send("TRAAAKAAAFOOIIINNNNS");
//fin trakafoins
//début token
    if (message.content.startsWith(prefix +  "token")){
        message.channel.send(`${message.author.username} mon token est T UN MALADE JAMAIS JLE DIRAIT`);
    }
//fin token
//début chifoumi
    if(message.content.startsWith(prefix + "chifoumi pierre")){
 
        var replysp = [
            "feuille, perdu, la prochaine fois peut être.",
            "pierre, égalité",
            "ciseaux, bravo, tu as gagné !"
        ]
 
        let reponsep = (replysp[Math.floor(Math.random() * replysp.length)])
        var embedpierre = new Discord.RichEmbed()
            .setTitle("chifoumi")
            .addField(`${message.author.username} :`, "pierre")
            .addField(`NejiBot :`, reponsep)
            .setFooter("NejiBot")
            .setTimestamp()
            .setColor("FE0000")
        message.channel.send(embedpierre);
    }
    if (message.content.startsWith(prefix + "chifoumi feuille")){
 
        var replysf = [
            "feuille, égalité",
            "pierre, bravo tu as gagné",
            "ciseaux, perdu, tu peux gagnera la prochaine fois peut être"
        ]
 
        let reponsef = (replysf[Math.floor(Math.random() * replysf.length)])
        var embedfeuille = new Discord.RichEmbed()
            .setTitle("chifoumi")
            .addField(`${message.author.username} :`, "feuille")
            .addField(`NejiBot :`, reponsef)
            .setFooter("NejiBot")
            .setTimestamp()
            .setColor("FE0000")
        message.channel.send(embedfeuille);
    }
    if (message.content.startsWith(prefix + "chifoumi ciseaux")){
        let argspierre = message.content.split(" ").slice(1);
        let ttepierre = argspierre.join(" ")
        if (!ttepierre){
            return message.reply("Tu n'as pas choisix ton action")};
 
        var replysc = [
            "feuille",
            "pierre",
            "ciseaux"
        ]
 
        let reponsec = (replysc[Math.floor(Math.random() * replysc.length)]) // la c les commande de chifoumie
        var embedciseaux = new Discord.RichEmbed()
            .setTitle("chifoumi")
            .addField(`${message.author.username} :`, "ciseaux")
            .addField(`NejiBot :`, reponsec)
            .setFooter("NejiBot")
            .setTimestamp()
            .setColor("FE0000")
        message.channel.send(embedciseaux);
    }
    if(message.content.startsWith(prefix + "chifoumi")){
        let argspierre = message.content.split(" ").slice(1);
        let ttepierre = argspierre.join(" ")
        if (!ttepierre){
            return message.reply(`Tu dois choisir entre "/chifoumi pierre", "/chifoumi feuille" ou "/chifoumi ciseaux"`)};
    }
    //fin chifoumi
    /*
    //début annonce all serv
    if(message.author.id === "300546341518573569") {
        if(message.content.startsWith(prefix +  'AnnonceNeji') {
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
})
//début nouveau membre
bot.on('guildMemberAdd', function (member) {
    member.createDM().then(function (channel) {
        return channel.send("Bienvenue sur le serveur, n'hesite pas à utilisé la commande /help pour savoir les commande que je fais.")
    }).catch(console.error)
});
bot.on("guildMemberAdd", member => {
    let joinchannel = member.guild.channels.find(`name`, "hi-bye")
    if(!joinchannel) {
       return member.guild.createChannel("hi-bye")
        /*
        let joinchannel2 = member.guild.channels.find(`name`, "hi-bye")
        timeout: 1000
        const joinembed2 = new Discord.RichEmbed()
    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
    .setImage(`${member.user.displayAvatarURL}`)
    .setTitle("Nouveau membre")
    .setColor("#FE0000")
    .addField(`Bienvenue à ${member.user.tag} sur le serveur ${member.guild.name}`)
    .setFooter("NejiBot")
    .setTimestamp()
    joinchannel2.send(joinembed2);
    */
    }
    const joinembed = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
        .setImage(`${member.user.displayAvatarURL}`)
        .setTitle("Nouveau membre")
        .setColor("#FE0000")
        .addField(`Bienvenue à ${member.user.tag} sur le serveur ${member.guild.name}`, "N'hésite pas à utilisé la commande /help")
        .setFooter("NejiBot")
        .setTimestamp()
    return joinchannel.send(joinembed);
})
//fin nouveau membre
bot.on("guildMemberRemove", member => {
    let leavechannel = member.guild.channels.find(`name`, "hi-bye")
    if(!leavechannel) {
        return member.guild.createChannel("hi-bye")
        /*
        let joinchannel2 = member.guild.channels.find(`name`, "hi-bye")
        timeout: 1000
        const joinembed2 = new Discord.RichEmbed()
    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
    .setImage(`${member.user.displayAvatarURL}`)
    .setTitle("Nouveau membre")
    .setColor("#FE0000")
    .addField(`Bienvenue à ${member.user.tag} sur le serveur ${member.guild.name}`)
    .setFooter("NejiBot")
    .setTimestamp()
    joinchannel2.send(joinembed2);
    */
    }
    const leaveembed = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
        .setImage(`${member.user.displayAvatarURL}`)
        .setTitle("membre parti")
        .setColor("#FE0000")
        .addField(`aurevoir et à bientôt ${member.user.tag} sur le serveur ${member.guild.name}`, "nous attendions ton retour avec impatience (ou pas)")
        .setFooter("NejiBot")
        .setTimestamp()
    return leavechannel.send(leaveembed);
})
bot.on("message", async message => {
if(message.content.startsWith(prefix + "giveaway")) {
    let givRole = message.guild.roles.find("name", "PermGive");
        if(!givRole) return message.reply("Il n'y as pas de grade **PermGive** sur le serveur, veuillez un créer un s'il vous plaît")
        if(!message.member.roles.has(givRole.id)) {
            return message.reply("tu n'as pas la permission de faire un giveaway.").catch(console.error);
        }
    var messageArray = message.content.split(" ");
    var time;
    var gagnant;
        gagnant = Number(messageArray[2]);
        if(!gagnant) return message.reply("tu n'as pas mis le nombre de gagnant")
        time = Number(messageArray[1]);
        if(!time) return message.reply("tu n'as pas mis de temps")
        let pari = message.content.split(" " + time + " " + gagnant + " ").slice(1);
            let item = pari
            if(!item) return message.reply("tu n'as pas mis de chose à faire gagné")
            let member = message.author
            var embedgiveaway = new Discord.RichEmbed()
            .setAuthor(member.username, member.displayAvatarURL)
            .setTitle("Giveaway")
            .addField("Chose a gagné :", `${item}`)
            .addField("Nombre de gagnant :", `${gagnant}`)
            .addField("Temps :", `${time} minute`)
            //.addField("Se termine à :", `${message.createdAt + time * 60000}`)
            .setFooter(`Giveaway`)
            //message.channel.send(embedgiveaway);
            var embedgiveawaySent = await message.channel.send(embedgiveaway);
            embedgiveawaySent.react("🎉");
            setTimeout(function() {
             var peopleReacted = embedgiveawaySent.reactions.get("🎉").users.array();
             var inodex = Math.floor(Math.random() * peopleReacted.length);
             var ggg = [];
             var gggmessage = "";  
             for (var i = 0; i < gagnant; i++){
            ggg.push(peopleReacted[inodex]);
            inodex = Math.floor(Math.random() * peopleReacted.length);
             }
             for (var i = 0; i < ggg.length; i++){
                 if (ggg[i].id === bot.user.id){
                 ggg.slice(i, 1);
                     continue;
                 }
               gggmessage += (ggg[i].toString() + " ");
             }
             var haveHas = "a";
             if (ggg.length == 1){
                 haveHas = "a gagné";
             }else{
                 haveHas = "ont gagné";
             }
             let gigg = ggg
             message.channel.send(gigg + " " + haveHas + " " + `${item}`);
            }, time * 60000);
        }
    })


bot.login(process.env.TOKEN)
