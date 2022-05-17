export default (client,Tags,isAdmin,permlvl,MessageActionRow,MessageEmbed,Roller)=>{
    client.on("messageCreate", async message => {
        if(message.author.bot) return 0;
        const member = message.member
        if(isAdmin(member)[0]) return 0;
        const tag = await Tags.findOne({where: {guild_id : message.guild.id}})
		const linkEngel = await tag.get("linkEngellemeDurum")
        if(linkEngel == 0) return 0;
        const logid = await tag.get("logchannel")
		const log = message.guild.channels.cache.find(c => c.id === logid)
        const probablyLinks = [".com",".tv",".net",".xyz",".gg",".io",".io","www.","https:","http:",".org",".biz",".party",".me"]
		probablyLinks.some(async word => {
			if(message.content.toLowerCase().includes(word)){
				if(!message.content.toLowerCase().includes("saints-rp.com")){
                    if(!message.content.toLowerCase().includes("youtube.com") && !message.content.toLowerCase().includes("https://cdn.discordapp.com/attachments/")){
                        await message.delete();
                        let embed = new MessageEmbed()
                        .setAuthor({name :'Saints Roleplay', iconURL:'https://i.hizliresim.com/rtbr3kh.png',url:'https://19-pp.com/'})
                        .setTitle('Link Engelleme Sistemi')
                        .setDescription(`**${message.member}** adlı kişi reklam yapıyor olabilir : ${message.content}`)
                        .setFooter({text:'Saints Roleplay', iconURL:'https://i.hizliresim.com/3atro9p.png'});
                        log.send({ embeds: [embed] })
                    }
				}   
				return 0;
			}
		})
    })
}