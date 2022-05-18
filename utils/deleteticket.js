export default (client, Tags, isAdmin, permlvl, MessageActionRow, MessageEmbed, Roller, MessageButton) => {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return 0;
        if (interaction.customId != "deleteticket") return 0;
        const guild = interaction.guild
        const tag = await Tags.findOne({where:{guild_id:guild.id}})
        const tickets = await tag.get("usersTickets")
        const user_id = await interaction.user.id
        const member = await guild.members.fetch(user_id)
        if(!isAdmin(member)[0]) return 0;
        const channel = guild.channels.cache.find(c => c.id == interaction.channelId)
        const members = await guild.members.fetch()
        members.forEach(async member =>{
            if(tickets[member.id] != undefined){
            if(tickets[member.id].channel_id == channel.id){
                tickets[member.id].channel_id = ""
                tickets[member.id].kapatmaDurum = 0
                await Tags.update({usersTickets:tickets},{where:{guild_id:guild.id}})
            }
        }
        })
        await channel.delete()
    })
    
}