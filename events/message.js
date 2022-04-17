export default client =>{
    const prefix = process.env.prefix
    client.on("messageCreate",message =>{
        if(message.content.startsWith(prefix) == false) return 0;
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        console.log(commandName)

    })
}