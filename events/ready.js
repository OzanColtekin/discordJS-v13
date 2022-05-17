import fs from "fs";

export default (client, Tags,Roller,RolVarMiMember,isAdmin,permlvl) => {
    client.once("ready", async () => {
        const guilds = await client.guilds.fetch()

        console.log("Bot başladı!")

        /* -------------------------------------- LOG KANALLARI KONTROL ------------------------ */
        guilds.forEach(async guild => {
            const server = await guild.fetch()
            const channels = await server.channels.fetch()
            channels.forEach(async channel => {
                if (!fs.existsSync(`./logs/${guild.id}`)) {
                    fs.mkdirSync(`./logs/${guild.id}`, { recursive: true }, function (err) {
                        if (err) return console.log(err)
                    })
                }
                if (channel.type == "GUILD_TEXT") {
                    if (!fs.existsSync(`./logs/${guild.id}/${channel.name}`)) {
                        await fs.mkdirSync(`./logs/${guild.id}/${channel.name}`, { recursive: true }, function (err) {
                            if (err) return console.log(err)
                        })
                    }
                }

            })

        })
        /* -------------------------------------- LOG KANALLARI KONTROL ------------------------ */


        /* -------------------------------------- DATABASE CHECK --------------------------------- */

        /* ------------------------------- CREATE DATABASE ----------------*/
        guilds.forEach(async guild => {
            const sunucu = await guild.fetch()
            const tag = await Tags.findOne({ where: { guild_id: guild.id } })
            if (tag == null) {
                await Tags.create({ guild_id: guild.id })
                const invitelistesi = {};
                const ticketList = {}
                const members = await sunucu.members.fetch({ force: true })
                members.forEach(async member => {
                    invitelistesi[member.id] = { user_list: [] }
                    ticketList[member.id] = { channel_id: "", kapatmaDurum: 0 }
                })
                await Tags.update({ inviteList: invitelistesi }, { where: { guild_id: guild.id } })
                await Tags.update({ usersTickets: ticketList }, { where: { guild_id: guild.id } })
            }
        })
        /* ------------------------------- CREATE DATABASE ----------------*/

        /* ------------------------------- USER INVITE CONTROL ----------------*/
        guilds.forEach(async guild => {
            const sunucu = await guild.fetch()
            const tag = await Tags.findOne({ where: { guild_id: guild.id } })
            const members = await sunucu.members.fetch({ force: true })
            const data = await tag.get("inviteList")
            members.forEach(async member => {
                if (data[member.id] == undefined) {
                    data[member.id] = { user_list: [] }
                    await Tags.update({ inviteList: data }, { where: { guild_id: guild.id } })
                }
            })
        })
        /* ------------------------------- USER INVITE CONTROL ----------------*/

        /* ------------------------------- TICKETS CONTROL ----------------*/
        guilds.forEach(async guild => {
            const sunucu = await guild.fetch()
            const tag = await Tags.findOne({ where: { guild_id: guild.id } })
            const members = await sunucu.members.fetch({ force: true })
            const data = await tag.get("usersTickets")
            members.forEach(async member => {
                if (data[member.id] == undefined) {
                    data[member.id] = { channel_id: "", kapatmaDurum: 0 }
                    await Tags.update({ usersTickets: data }, { where: { guild_id: guild.id } })
                }
            })
        })
        /* ------------------------------- TICKETS CONTROL ----------------*/

        /* ------------------------------- ANTI MENTION CONTROL ----------------*/
        guilds.forEach(async guild => {
            const sunucu = await guild.fetch()
            const tag = await Tags.findOne({ where: { guild_id: guild.id } })
            const members = await sunucu.members.fetch({ force: true })
            const data = await tag.get("antimention")
            members.forEach(async member => {
                if (data[member.id] == undefined) {
                    data[member.id] = { etiketsayi: 0 }
                    await Tags.update({ antimention: data }, { where: { guild_id: guild.id } })
                }
            })
        })
        /* ------------------------------- ANTI MENTION CONTROL ----------------*/


        /* -------------------------------------- DATABASE CHECK --------------------------------- */
    })

}