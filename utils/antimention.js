export default (client,Tags,isAdmin) => {
    client.on("messageCreate", async message => {
        if(message.author.bot) return 0;
        const member = message.member
        const etiket = message.mentions.members.first()
        if(etiket == undefined) return 0;
        if(!isAdmin(etiket)[0]) return 0;
        if(isAdmin(member)[0]) return 0;
        
    })
}