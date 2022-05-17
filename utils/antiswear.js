import fs from "fs";
export default (client,Tags,isAdmin,permlvl,MessageActionRow,MessageEmbed,Roller) => {
    client.on("messageCreate" , async message =>{
        if (message.author.bot) return 0;
        const member = message.member
        if (isAdmin(member)[0] && permlvl(isAdmin(member)[1]) > 9) return 0;
        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })
        const logdata = await tag.get("logchannel")
        const log = message.guild.channels.cache.get(logdata)
        await fs.readFile(`./kelimeler.txt`, 'utf8', function(err, data) {
            var kelimeler = data.split(",")
            for(let i =0;i<kelimeler.length-1;i++){
                if(message.content.toLowerCase().includes(kelimeler[i])){
                    message.delete()
                    let embed = new MessageEmbed()
                        .setAuthor({name :'Saints Roleplay', iconURL:'https://i.hizliresim.com/rtbr3kh.png',url:'https://19-pp.com/'})
                        .setTitle('Link Engelleme Sistemi')
                        .setDescription(`${message.member} yasaklı kelime kullandığınız için mesajınız silindi.`)
                        .setFooter({text:'Saints Roleplay', iconURL:'https://i.hizliresim.com/3atro9p.png'});
                    message.channel.send({ embeds: [embed] }).then(msg =>{
                        setTimeout(()=>{
                            msg.delete()
                        },2000)
                    })
                    let embed2 = new MessageEmbed()
					.setAuthor({name :'Saints Roleplay', iconURL:'https://i.hizliresim.com/rtbr3kh.png',url:'https://19-pp.com/'})
					.setTitle('Link Engelleme Sistemi')
					.setDescription(`**${message.member}** adlı kişi yasaklı kelime kullandı: ${message.content}`)
					.setFooter({text:'Saints Roleplay', iconURL:'https://i.hizliresim.com/3atro9p.png'});
					log.send({ embeds: [embed2] })
                }
            }
        })
    })
    
}