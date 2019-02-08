const Discord = require('discord.js')
const bot = new Discord.Client()
const low  = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const ms = require ("ms");
const fs = require("fs");
bot.commands = new Discord.Collection();
var version = ["1.0.2"]
var prefix = ("/")
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
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Je ne trouve pas les commandes");
      return;
    }
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} à bien été chargé`);
      bot.commands.set(props.help.name, props);
    });
  });
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
bot.on("message", message => {
let command = message.content.split (" ")[0];
    const cmd = message.content
    const args = message.content.slice(prefix.length).split(/ +/);
    var auth = message.author
//début join
    if(cmd.startsWith(prefix +  'join')) {
        message.channel.send(`Si tu veux venir sur mon discord join sur https://discord.gg/yJBdh6z`);
    }
//début invite
    if (cmd.startsWith(prefix +  'invite')) {
        message.reply(`Pour pouvoir m'invité sur ton serveur discord, va sur ce lien http://bit.ly/NejiBot , après tu peux aussi inviter mon double qui va supprimé tout les mauvais message, pour l'inviter va sur ce lien : http://bit.ly/NejiPlus .`);
    }
//début ping
    if(cmd.startsWith(prefix +  'ping')){
        message.channel.send('Le temps de latence sur le serveur = `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
    }
//début liste des serveur
    if (cmd.startsWith(prefix +  'serverlist')){
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`));
    }
//fin liste des serveur
if (message.content.startsWith(prefix +  "inc")){
    message.reply("Le message global est un message qui à été envoyé depuis un autre serveur, pour parler toi aussi au autre serveur, il faut utilisé la commande /NejiChat 'message'")
}
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
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = message.content.split(" ").slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});
bot.login(process.env.TOKEN)
