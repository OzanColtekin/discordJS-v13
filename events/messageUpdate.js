import fs from "fs";
export default (client) =>{
    client.on("messageUpdate", async message =>{
        if(message.author == null) return 0;
        if(message.author.bot) return 0;
        var date = new Date(message.createdTimestamp)
        var dosyaName = `${message.channel.id}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', month:'numeric'})}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', day:'numeric'})}`
		var mesaj = `[${date.toLocaleString('tr-TR', { timeZone: 'UTC' })}] ${message.author.username}#${message.author.discriminator} (${message.author.id}): ${message.content} olan mesajı ${message.reactions.message.content} olarak düzenledi.  \n`
        await fs.writeFile(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`, mesaj,{ flag: 'a+' },function (err) {
            if (err) return console.log(err);
        });
    })
}