import { Client, Collection } from "discord.js";
import "dotenv/config";
import {  readdirSync } from "fs";
import { Sequelize, DataTypes } from 'sequelize';

const client = new Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]
})

client.login(process.env.token)

const sequelize = new Sequelize('database','user','password',{
    host:"localhost",
    dialect:"sqlite",
    logging:false,
    storage:'database.sqlite'
})

const Tags = sequelize.define('tags',{
    guild_id:{type:DataTypes.STRING, uniqe:true,allowNull:false},
    logchannel:{type:DataTypes.TEXT,defaultValue:""},
    welcomelog:{type:DataTypes.TEXT,defaultValue:""},
    giveaway:{type:DataTypes.JSON,defaultValue:{}},
    muteList:{type:DataTypes.JSON,defaultValue:{}},
    cekilisList:{type:DataTypes.JSON,defaultValue:{messages_id:[]}},
    inviteList:{type:DataTypes.JSON,defaultValue:{}},
    inviteTakipDurumu:{type:DataTypes.INTEGER,defaultValue:0},
    linkEngellemeDurum:{type:DataTypes.INTEGER,defaultValue:0},
    ticketMessage:{type:DataTypes.JSON,defaultValue:{parent_id: "",message_id:"",arsiv_id:""}},
    usersTickets:{type:DataTypes.JSON,defaultValue:{}},
    memberCountChannel:{type:DataTypes.TEXT,defaultValue:""},
    antimention:{type:DataTypes.JSON,defaultValue:{}},
    cacheLink:{type:DataTypes.JSON,defaultValue:{cache_link:"",cache_tarih:""}}
})

await Tags.sync({force : true})


/* ---------------------------------------- UTILS ----------------------------------------*/

readdirSync("./utils").forEach(async file =>{
    const util = await import(`./utils/${file}`).then(m=> m.default)
    await util(client,Tags)
})

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
    await event(client,Tags)
})
/* ---------------------------------------- EVENT HANDLER --------------------------------- */ 
