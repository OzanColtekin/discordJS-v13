export default (client,Tags,Roller,RolVarMiMember,isAdmin,permlvl,MessageActionRow,MessageButton,MessageEmbed) =>{
    const prefix = process.env.prefix

    function MesajGönder(message,msj) {
        message.channel.send(msj)
    }
    

    client.on("messageCreate",async message =>{
        if(message.content.startsWith(prefix) == false) return 0;

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        
        const command = client.commands.get(commandName)
        if(!command) return 0;
        if(message.author.bot) return 0;
        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })
        try{
            command.execute(message,args,isAdmin,permlvl,MessageActionRow,MessageButton,MesajGönder,MessageEmbed,tag,Tags)
        }
        catch(e){
            console.log(e)
            message.reply("Bir hata oluştu!");
        }
    })
}