import fs from "fs";
export default (client) =>{
    client.on("channelCreate",async (channel)=>{
        if(channel.type != "GUILD_TEXT") return 0;
        if(!fs.existsSync(`./logs/${channel.guild.id}/${channel.name}`)){
            fs.mkdirSync(`./logs/${channel.guild.id}/${channel.name}`,{ recursive: true },function(err){
                if(err) return console.log(err)
            })
        }
    })
}