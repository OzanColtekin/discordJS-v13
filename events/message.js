export default (client,Tags,Roller,RolVarMiMember,isAdmin,permlvl,MessageActionRow,MessageButton) =>{
    const prefix = process.env.prefix

    client.on("messageCreate",message =>{
        if(message.content.startsWith(prefix) == false) return 0;

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        
        const command = client.commands.get(commandName)
        if(!command) return 0;

        try{
            command.execute(message,MessageActionRow,MessageButton)
        }
        catch(e){
            console.log(e)
            message.reply("Bir hata oluştu!");
        }
    })
}