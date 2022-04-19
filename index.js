import { Client, Collection } from "discord.js";
import "dotenv/config";
import { read, readdirSync } from "fs";

const client = new Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]
})

/* --------------------------------------- COMMAND HANDLER ------------------------------ */ 
client.commands = new Collection();
readdirSync("./commands").forEach(category=>{
    readdirSync(`./commands/${category}`).forEach(async file=>{
        const command = await import(`./commands/${category}/${file}`).then(c=> c.default)
        client.commands.set(command.name, command)

    })
})
/* ---------------------------------------- COMMAND HANDLER --------------------------------- */ 

/* ---------------------------------------- EVENT HANDLER --------------------------------- */ 
readdirSync("./events").forEach(async file =>{
    const event = await import(`./events/${file}`).then(m=> m.default)
    event(client)
})
/* ---------------------------------------- EVENT HANDLER --------------------------------- */ 

client.login(process.env.token)