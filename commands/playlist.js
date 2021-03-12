const discord = require("discord.js");
const commando = require("discord.js-commando")
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search')

module.exports.run = async (bot, message, args) => {

    const voicechannel = message.au

    if (!voicechannel) return message.channel.send('go in vc')

};

module.exports.help = {
    name: "ned"
};