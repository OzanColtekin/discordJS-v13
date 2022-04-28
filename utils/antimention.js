export default (client,Tags) => {
    client.on("messageCreate", async message => {
        if(message.author.bot) return 0;
        const member = message.member
        const etiket = message.mentions.members.first()
        if(etiket == undefined) return 0;
        console.log(member.name)
    })
}