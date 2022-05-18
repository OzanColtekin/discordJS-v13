export default {
    name:"ticket",
    execute(message,args,isAdmin,permlvl,MessageActionRow,MessageButton,MesajGönder,MessageEmbed,tag,Tags){
        const member = message.member
        if(!isAdmin(member)[0] && permlvl(isAdmin(member)[1])<9) return 0;
        if(!args[0]) return MesajGönder(message,"!ticket [kategori/arsiv/paylas]")
        const tickets = tag.get("ticketMessage")
        if(args[0]=="kategori"){
            if(!args[1]) return MesajGönder(message,"!ticket kategori [kategori id]")
            tickets.parent_id = args[1]
            Tags.update({ticketMessage:tickets},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
        else if(args[0] == "arsiv"){
            if(!args[1]) return MesajGönder(message,"!ticket arsiv [arsiv channel id]")
            tickets.arsiv_id = args[1]
            Tags.update({ticketMessage:tickets},{where:{guild_id:message.guild.id}})
            message.react("👍")
        }
        else if(args[0] == "paylas"){
            if(!args[1]) return MesajGönder(message,"!ticket paylas [#kanal]")
            const channel = message.mentions.channels.first()
            const embed = new MessageEmbed()
            .setColor("#33FFCA")
            .setTitle('Destek Paneli')
            .setDescription(`Destek talebi oluşturmak için aşağıdaki butona tıklayabilirsin.`)
            .setFooter({text:'Saints Roleplay', iconURL:'https://i.hizliresim.com/3atro9p.png'});
            const button = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('createticket')
					.setLabel('📩 Talep Aç')
					.setStyle('SECONDARY'),
			);
            channel.send({components:[button],embeds:[embed]}).then(async msg =>{
                tickets.message_id = msg.id
                await Tags.update({ticketMessage:tickets},{where:{guild_id:msg.guild.id}})

            })
        }
    }
}