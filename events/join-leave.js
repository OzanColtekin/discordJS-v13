export default async (client, Tags, isAdmin, permlvl, MessageEmbed) => {

    client.on("guildMemberAdd", async member => {
        const tag = await Tags.findOne({ where: { guild_id: member.guild.id } })
        const guild = client.guilds.cache.get(member.guild.id);
        const data = await tag.get("muteList")
        const ticketlistem = await tag.get("usersTickets")
        const invitelistem = await tag.get("inviteList")
		const antimentionliste = await tag.get("antimention")
        const logdata = await tag.get("welcomelog")
        const kisisayisi = await tag.get("memberCountChannel")
        invitelistem[member.id] = {user_list:[]}
        ticketlistem[member.id] = {channel_id:"",kapatmaDurum:0}
        antimentionliste[member.id] = {etiketsayi:0}
        await Tags.update({inviteList:invitelistem},{where:{guild_id:guild.id}})
		await Tags.update({usersTickets:ticketlistem},{where:{guild_id:guild.id}})
		await Tags.update({antimention:antimentionliste},{where:{guild_id:guild.id}})
        if(data[member.id]){
    		if(data[member.id].muteDurum == 1){
    		member.roles.add(MuteRol)
    		}
    	}
    })
    client.on("guildMemberRemove", async member => {
        const tag = await Tags.findOne({where: {guild_id: member.guild.id}})
		const inviteListe = await tag.get("inviteList")
		const ticketlistem = await tag.get("usersTickets")
		const antimentionliste = await tag.get("antimention")
		const guild = await client.guilds.cache.get(member.guild.id);
		const logdata = await tag.get("welcomelog")
		const inviteTakipDurum = await tag.get("inviteTakipDurumu")
		const kisisayisi = await tag.get("memberCountChannel")
        delete inviteListe[member.id]
		delete ticketlistem[member.id]
		delete antimentionliste[member.id]
		await Tags.update({usersTickets:ticketlistem},{where:{guild_id:member.guild.id}})
		await Tags.update({inviteList:inviteListe},{where:{guild_id:member.guild.id}})
		await Tags.update({antimention:antimentionliste},{where:{guild_id:member.guild.id}})

    })
}