export default (client,Tags,isAdmin,permlvl,MessageActionRow,MessageEmbed,Roller,MessageButton) =>{
    client.on("interactionCreate",async interaction=>{
        if(!interaction.isButton()) return 0;
        if(interaction.customId != "createticket") return 0;
        const guild = interaction.guild
        const tag = await Tags.findOne({where:{guild_id:guild.id}})
        const tickets = await tag.get("usersTickets")
        const ticketmesajı = await tag.get("ticketMessage")
        const user_id = await interaction.user.id
        const member = await guild.members.fetch(user_id)
        if(tickets[user_id].channel_id.length != 0) return 0;
        const channel_name = member.user.username + member.user.discriminator + "-destek";
        guild.channels.create(channel_name,{type:"GUILD_TEXT"}).then(async channel => {
            await channel.setParent(ticketmesajı.parent_id);
            await channel.permissionOverwrites.set([{
                id: user_id,
                allow:["VIEW_CHANNEL"],
            },
            {
                id: Roller["Founder"],
                allow:["VIEW_CHANNEL"],
            },
            {
                id:Roller["Everyone"],
                deny:["VIEW_CHANNEL"],
            }])
            tickets[user_id].channel_id = channel.id
            await Tags.update({usersTickets:tickets},{where:{guild_id:guild.id}})
            const closebutton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('closeticket')
					.setLabel('🔒 Destek Kapat')
					.setStyle('DANGER'),
			);
            let embed = new MessageEmbed()
                        .setColor("#33FFCA")
                        .setDescription(`Destek ekibi en kısa sürede talebini yanıtlayacak.\nTalebi kapatmak için aşağıda bulunan butona tıklaman yeterli.`)
                        .setFooter({text:'Saints Roleplay', iconURL:'https://i.hizliresim.com/3atro9p.png'});
            channel.send({components:[closebutton],embeds:[embed]})
            channel.send(`Merhaba ${member}! Talebi oluşturma sebebini kısaca özetler misin?`)
        })
    })
}