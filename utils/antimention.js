export default (client,Tags,isAdmin) => {
    client.on("messageCreate", async message => {
        if(message.author.bot) return 0;
        const member = message.member
        const etiket = message.mentions.members.first()
        if(etiket == undefined) return 0;
        if(!isAdmin(etiket)[0]) return 0;
        if(isAdmin(member)[0]) return 0;
        const muteRol = message.guild.roles.cache.find(role => role.id === "ROLİD")
        const tag = await Tags.findOne({where:{guild_id:message.guild.id}})
        const data = await tag.get("antimention")
        data[member.id].etiketsayi = data[member.id].etiketsayi+1
        await Tags.update({antimention:data},{where:{guild_id:message.guild.id}})
        if(data[member.id].etiketsayi >=5){
            member.roles.add(muteRol)
            message.channel.send("Kanallar üzerinden çok fazla etiket attığın için bir saat mutelendin.").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            const mute = await tag.get("muteList")
			mute[member.id] = {muteDurum:1}
			await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            setTimeout(async ()=>{
                if(!RolVarMiMember(member,Roller["Mute"])) return 0;
                member.roles.remove(muteRol)
                mute[member.id] = {muteDurum:0}
                await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            },86400000)
            
        }
        else if(data[member.id].etiketsayi >=4){
            member.roles.add(muteRol)
            message.channel.send("Kanallar üzerinden çok fazla etiket attığın için 45 dakika mutelendin.").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            const mute = await tag.get("muteList")
			mute[member.id] = {muteDurum:1}
			await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            setTimeout(async ()=>{
                if(!RolVarMiMember(member,Roller["Mute"])) return 0;
                member.roles.remove(muteRol)
                mute[member.id] = {muteDurum:0}
                await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            },2700000)
            
        }
        else if(data[member.id].etiketsayi >=3){
            member.roles.add(muteRol)
            message.channel.send("Kanallar üzerinden çok fazla etiket attığın için 30 dakika mutelendin.").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            const mute = await tag.get("muteList")
			mute[member.id] = {muteDurum:1}
			await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            setTimeout(async ()=>{
                if(!RolVarMiMember(member,Roller["Mute"])) return 0;
                member.roles.remove(muteRol)
                mute[member.id] = {muteDurum:0}
                await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            },1800000)
            
        }
        else if(data[member.id].etiketsayi >=2){
            member.roles.add(muteRol)
            message.channel.send("Kanallar üzerinden çok fazla etiket attığın için 15 dakika mutelendin.").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
            const mute = await tag.get("muteList")
			mute[member.id] = {muteDurum:1}
			await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            setTimeout(async ()=>{
                if(!RolVarMiMember(member,Roller["Mute"])) return 0;
                member.roles.remove(muteRol)
                mute[member.id] = {muteDurum:0}
                await Tags.update({muteList:mute},{where:{guild_id:message.guild.id}})
            },900000)
            
        }
        else if(data[member.id].etiketsayi >=1){
            message.channel.send("Kanallar üzerinden birilerini etiketlemeye devam edersen mutelenebilirsin.").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                }, 5000);
            })
        }
        message.delete()
    })
}