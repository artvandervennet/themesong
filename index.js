const discord = require("discord.js");
const commando = require("discord.js-commando")
const fs = require("fs");
const config = require("./config.json");
const bot = new discord.Client({disableEveryone : true});
const path = require('path');
const { checkServerIdentity } = require('tls');
let song;

//when bot ready
bot.on("ready", async () => {
    console.log('${bot.user.username} is ready');
    bot.user.setActivity("Cool People Shit");
});

//load commands
bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split('.').pop() === "js");

    if (jsfiles.length <= 0) return console.log("there are no commands to load...");

    console.log(`loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

//Message event
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
})



function correctSong(id, oldMember, newMember){

    switch (id)
{
    case "543941331119112232":   //liz
        song = "songs/Test2.mp3"
        break;
    case "344066959077539843":   //me
        song = "songs/ttbag.mp3"
        break;

   default: song = "songs/Test.mp3"
   
}
    
}

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    const newUserChannel = newMember.channelID
    const oldUserChannel = oldMember.channelID

  
    if(newUserChannel === '817151892010434613' || newUserChannel === '818606518551052289' || newUserChannel === '802142824442626063' || newUserChannel === '802982289533173770'|| newUserChannel === "780445098319544324" ||  newUserChannel === "816650701999570954"){
        if(newMember.member.user.id !== "817150980105437184" && newUserChannel !== oldUserChannel){
            correctSong(newMember.member.user.id, oldMember, newMember)
      newMember.channel.join().then((connection) => {
            connection.play(path.join(__dirname, song))
            console.log(song)
      })
        }
    
      
    }else if(newUserChannel !== oldMember.channelID) {
        oldMember.channel.leave()
    }
  })


bot.login(config.token);