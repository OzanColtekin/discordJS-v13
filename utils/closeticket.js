export default (client, Tags, isAdmin, permlvl, MessageActionRow, MessageEmbed, Roller, MessageButton) => {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return 0;
        if (interaction.customId != "closeticket") return 0;
        const guild = interaction.guild
        const tag = await Tags.findOne({ where: { guild_id: guild.id } })
        const tickets = await tag.get("usersTickets")
        const user_id = await interaction.user.id
        var ticket_sahip = ""
        const members = await guild.members.fetch()
        const member = await guild.members.fetch(user_id)
        const channel = guild.channels.cache.find(c => c.id == interaction.channelId)
        members.forEach(member => {
            if (tickets[member.id] != undefined) {
                if (tickets[member.id].channel_id == channel.id) {
                    ticket_sahip = member.id
                }
            }
        })

        if (tickets[ticket_sahip] != undefined) {
            if (tickets[ticket_sahip.kapatmaDurum == 1]) return 0;
        }

        let embed = new MessageEmbed()
            .setDescription(`Destek talebi ${member} tarafından kapatıldı.`)

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('saveticket')
                    .setLabel('📝 Transcript')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('deleteticket')
                    .setLabel('⛔️ Sil')
                    .setStyle('DANGER'),
                new MessageButton()
                    .setCustomId('openticket')
                    .setLabel('🔓 Aç')
                    .setStyle('SUCCESS'),
            );
        channel.send({components:[row],embeds:[embed]})

        if(tickets[ticket_sahip] != undefined){
            await channel.permissionOverwrites.set([{
                id: ticket_sahip,
                allow:["VIEW_CHANNEL"],
            },
            {
                id: Roller["Founder"],
                allow:["VIEW_CHANNEL"],
            },
            {
                id: Roller["Everyone"],
                deny:["VIEW_CHANNEL","SEND_MESSAGES"],
            }])
    
        }
        else {
            await channel.permissionOverwrites.set([
            {
                id: Roller["Founder"],
                allow:["VIEW_CHANNEL"],
            },
            {
                id: Roller["Everyone"],
                deny:["VIEW_CHANNEL","SEND_MESSAGES"],
            }])
    
        }
        if(tickets[ticket_sahip] != undefined) {
            tickets[ticket_sahip].kapatmaDurum = 1
            await Tags.update({usersTickets:tickets},{where:{guild_id: guild.id}})
        }

    })
}