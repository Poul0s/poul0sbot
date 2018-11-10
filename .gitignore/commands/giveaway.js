const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
    var messageArray = message.content.split(" ");
    var time;
    var gagnant;
        gagnant = Number(messageArray[1]);      
        if(!gagnant) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Combien y aura-t-il de gagnants? **\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`");  // verification pour les gagnants
     if(isNaN(gagnant)) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Combien y aura-t-il de gagnants? **\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`");
    
        time = Number(messageArray[2]);
        if(!time) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\nQuel est la durée de votre giveaway en seconde?\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`")
        if(isNaN(time)) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\nQuel est la durée de votre giveaway en seconde?\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`")  // verification pour le timer en seconde

    let pari = message.content.split(" " + gagnant + " " + time + " ").slice(1);
            var item = pari
            if(!item) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Que voulez-vous faire gagner?**\n\nExemple d'utilisation:\n`r!giveaway 60 1 un superbe t-shirt!`");  // verification pour le prix (si rien ne se passe il va rien afficher)

          
            let member = message.author
            var embedgiveaway = new Discord.RichEmbed() //création de l'embed d'annonce du giveaway
            .setAuthor(member.username, member.displayAvatarURL)
            .setTitle(":tada: GIVEAWAY ! :tada:") 
            .addField("Prix:", `** ${item} **`)
            .addField("Nombre de gagnants :", `** ${gagnant} ** gagnant(s)`)
            .addField("Fin du Giveaway dans:", `**${time}** secondes`)
            .addField("Pour participer, réagissez avec :tada: !!", "** **")
            .setFooter(`Nejibot`)
            .setTimestamp()
            var embedgiveawaySent = await message.channel.send(embedgiveaway);
embedgiveawaySent.react("\uD83C\uDF89"); // un emoji :tada: en unicode

            setTimeout(function() {
              embedgiveawaySent.reactions.forEach(r=>r.remove(bot.user));
             var peopleReacted = embedgiveawaySent.reactions.get("\uD83C\uDF89").users.array(); // vérification des users dans la liste des réacts
              var winners = embedgiveawaySent.reactions.get("\uD83C\uDF89").count
             var inodex = Math.floor(Math.random() * peopleReacted.length); // tirage au sort
              
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
              
          
             var haveHas = "a";  // changement pour du pluriel si nécessaire
              var Win = "NOUVEAU GAGNANT"
             if (ggg.length == 1){
                 haveHas = " vient de gagner: ";
               var Win = "NOUVEAU GAGNANT";
             }else{
                 haveHas = " viennent de gagner: ";
              var Win = "NOUVEAUX GAGNANTS";
             }
             let gigg = ggg
             
             if(gagnant > winners) { // si il y a moins de participants que le nombre de winner
               message.channel.send("Malheureusement, pas assez de personne ont pu être sélectionné,\nVous avez demandé` " + gagnant + " `possibles gagnant(s) mais vous avez eu que `" + winners + "` participant(s)")
             return;
             }
             
             message.channel.send(":tada: " + Win + " ! :tada: \n\n" + gigg  + haveHas + " " + `${item}`); // anonce du gagnant
            }, time * 1000);
    
    
       setTimeout(function() { 
    embedgiveawaySent.reactions.forEach(r=>r.remove(bot.user));
    }, time * 950)  // pour éviter que le bot s'auto choisit lor du tirage, il retire sa réaction peu avant le tirage, si il n'y a pas de participant il s'auto choisit quand meme!
}
module.exports.help = {
    name: "giveaway"
}