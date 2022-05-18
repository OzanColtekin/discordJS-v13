import fs from "fs";
export default (client, Tags, isAdmin, permlvl, MessageActionRow, MessageEmbed, Roller, MessageButton) => {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return 0;
        if (interaction.customId != "saveticket") return 0;
        const guild = interaction.guild
        const tag = await Tags.findOne({ where: { guild_id: guild.id } })
        const arsiv = await tag.get("ticketMessage")
        const member = await guild.members.fetch(interaction.user.id)
        const kanaladi = interaction.channel.name
        const desteksahip = kanaladi.split("-destek")[0]
        const log = await guild.channels.cache.find(c => c.id == arsiv.arsiv_id)
        const logsFiles = fs.readdirSync(`./logs/${guild.id}/${kanaladi}`).filter(file => file.endsWith(".txt"))
        logsFiles.forEach(file=>{
            console.log(file)
            const log_channel = file.split("-")[0]
            console.log(log_channel)
            if(log_channel.includes(interaction.channelId)){
                log.send({text:`**${member.user.username}** adlı kişi ${desteksahip} adlı kişinin transcriptini kayıt etti.`, files:[`./logs/${guild.id}/${kanaladi}/${file}`]})
            }
        })
    })
}