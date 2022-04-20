import { Client, Collection } from "discord.js";
import "dotenv/config";
import { read, readdirSync, utimes } from "fs";

const client = new Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]
})

/* ---------------------------------------- UTILS ----------------------------------------*/

const messagelog = await import("./utils/messagelog.js").then(u => u.default)
messagelog(client)

/* ---------------------------------------- UTILS ----------------------------------------*/


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