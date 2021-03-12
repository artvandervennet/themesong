require('dotenv').config();
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const path = require('path');
const { checkServerIdentity } = require('tls');
let song;

let ids = ["543941331119112232", "344066959077539843"]
let HasSong = false

function checkForSong(id, oldMember, newMember){

    for(i=0; i<ids.length; i++){
        if(id == ids[i]){
            HasSong = true
        }
    }

}

function correctSong(id, oldMember, newMember){

    switch (id)
{
    case "543941331119112232":   //liz
        song = "Test2.mp3"
        break;
    case "344066959077539843":   //me
        song = "ttbag.mp3"
        break;

   default: song = "test.mp3"
}
    
}

bot.once('ready', () =>{
        console.log(`Bot ready, logged in as ${bot.user.tag}!`);
    })


bot.on('voiceStateUpdate', (oldMember, newMember) => {
    HasSong = false
    const newUserChannel = newMember.channelID
    const oldUserChannel = oldMember.channelID

    checkForSong(newMember.member.user.id, oldMember, newMember)
  
    if(newUserChannel === '817151892010434613' || newUserChannel === '818606518551052289' || newUserChannel === '802142824442626063' || newUserChannel === '802982289533173770'|| newUserChannel === "780445098319544324" ||  newUserChannel === "816650701999570954"){
        if(newMember.member.user.id !== "817150980105437184" && newUserChannel !== oldUserChannel && HasSong){
            correctSong(newMember.member.user.id, oldMember, newMember)
      newMember.channel.join().then((connection) => {
            connection.play(path.join(__dirname, song))
      })
        }
    
      
    }else if(newUserChannel !== oldMember.channelID) {
        oldMember.channel.leave()
    }
  })

bot.login(process.env.TOKEN);
