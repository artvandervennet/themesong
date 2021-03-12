const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send('Hello world');

};

module.exports.help = {
    name: "tutorial"
};