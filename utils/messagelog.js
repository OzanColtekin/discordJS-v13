import {existsSync , writeFile} from "fs";

export default client => {
    client.on("messageCreate", async message => {
        var date = new Date(message.createdTimestamp)
		var dosyaName = `${message.channel.id}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', month:'numeric'})}-${date.toLocaleString('tr-TR',{timeZone:'Europe/Athens', day:'numeric'})}`
		var mesaj = `[${date.toLocaleString('tr-TR', { timeZone: 'UTC' })}] ${message.author.username}#${message.author.discriminator} (${message.author.id}): ${message.content}  \n`

		if(!existsSync(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`)){
			await writeFile(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`, "",{ flag: 'w+' },function (err) {
				if (err) return console.log(err);
		  });
		}
		await writeFile(`./logs/${message.guild.id}/${message.channel.name}/${dosyaName}.txt`, mesaj,{ flag: 'a+' },function (err) {
			  if (err) return console.log(err);
		});

    })
}