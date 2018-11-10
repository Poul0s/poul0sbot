const Discord = require('discord.js')
module.exports.run = async (bot, message, args) => {
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
    return message.channel.send(embedb)
}
module.exports.help = {
    name: "blague"
}