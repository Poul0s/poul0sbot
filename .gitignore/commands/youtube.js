const Discord = require('discord.js')
var ffmpeg = require('ffmpeg');
const YoutubeStream = require('ytdl-core')
module.exports.run = async (bot, message, args) => {
let channelvc = message.guild.channels
.filter(function (channel) { return channel.type === 'voice' })
.first()
let args1 = message.content.split(" ")
channelvc.join()
.then(function (connect) {
        let stream = YoutubeStream(args1[1])
        stream.on('error', function () {
            message.reply("Je ne peux pas lire cette vidéo, il faut bien mettre l'URL de la vidéo hein")
            connect.discconnect()
        })
        connect.playStream(stream)
        .on('end', function () {
            connect.discconnect()
        })
})
}
module.exports.help = {
    name: "yt"
}