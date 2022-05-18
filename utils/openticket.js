export default (client,Tags,isAdmin,permlvl,MessageActionRow,MessageEmbed,Roller,MessageButton) =>{
    client.on("interactionCreate",async interaction=>{
        if(!interaction.isButton()) return 0;
        if(interaction.customId != "openticket") return 0;
        const guild = interaction.guild
        const tag = await Tags.findOne({where:{guild_id:guild.id}})
        const tickets = await tag.get("usersTickets")
        const user_id = await interaction.user.id
        if(tickets[user_id].kapatmaDurum == 0) return 0;
        const channel = guild.channels.cache.find(c => c.id == interaction.channelId)
        const message = await channel.messages.fetch(interaction.message.id)
        message.delete()

        tickets[user_id].kapatmaDurum = 0
        await Tags.update({usersTickets:tickets},{where:{guild_id: guild.id}})
        await channel.permissionOverwrites.set([{
            id: user_id,
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Founder"],
            allow:["VIEW_CHANNEL"],
        },
        {
            id: Roller["Everyone"],
            deny:["VIEW_CHANNEL"],
        }])
    })
}