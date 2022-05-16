import fs from "fs";
export default (client) =>{
    client.on("channelDelete",async (channel)=>{
        if(channel.type != "GUILD_TEXT") return 0;
        const files = fs.readdirSync(`./logs/${channel.guild.id}/${channel.name}`).filter(file => file.endsWith(".txt"))
        files.forEach(file =>{
            fs.unlink(`./logs/${channel.guild.id}/${channel.name}/${file}`, (err) => {
                if (err) return console.log(err)
              })
        })
    })
}