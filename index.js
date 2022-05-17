import { Client, Collection,MessageEmbed,MessageActionRow,MessageButton } from "discord.js";
import "dotenv/config";
import {  readdirSync } from "fs";
import { Sequelize, DataTypes } from 'sequelize';

const client = new Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]
})

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction.message.id);
});

client.login(process.env.token)
/* --------------------------------- USEFUL THINGS -------------------------- */

const Roller = {"Founder":"716104504713674783",
				"Management":"768571517021585469",
				"Game admin 5":"763172319178522675",
                "Game admin 4":"763172319178522675",
                "Game admin 3":"763172319178522675",
                "Game admin 2":"763172319178522675",
                "Game admin 1":"763172319178522675",
				"Helper 3":"929067556470407198",
                "Helper 2":"929067556470407198",
                "Helper 1":"929067556470407198",
				}

function RolVarMiMember(member,role) {
    return member.roles.cache.find(r=> r.id === role) ? true : false
}


function isAdmin(member){
    let admin = false
    let rol = ""
    for (var key in Roller){
        if(RolVarMiMember(member,Roller[key])){
            admin = true
            rol = key
            break
        }
    }
    return [admin,rol]
}

function permlvl(role){
    let level = 0;
    switch(role){
        case "Founder":
            level = 10
            break;
        case "Management":
            level = 9
            break;
        case "Game admin 5":
            level = 8
            break;
        case "Game admin 4":
            level = 7
            break;
        case "Game admin 3":
            level = 6
            break;
        case "Game admin 2":
            level = 5
            break;
        case "Game admin 1":
            level = 4
            break;
        case "Helper 3":
            level = 3
            break;
        case "Helper 2":
            level = 2
            break;
        case "Helper 1":
            level = 1
            break;
    }
    return level
}

/* ------------------------------------------- DATABASE ---------------------- */
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
    cacheLink:{type:DataTypes.JSON,defaultValue:{cache_link:"",cache_tarih:""}},
    userRoles:{type:DataTypes.JSON,defaultValue:{}}
})
/* ------------------------------------------- DATABASE ---------------------- */

await Tags.sync()


/* ---------------------------------------- UTILS ----------------------------------------*/

readdirSync("./utils").forEach(async file =>{
    const util = await import(`./utils/${file}`).then(m=> m.default)
    await util(client,Tags,isAdmin,permlvl,MessageActionRow,MessageEmbed,Roller,MessageButton)
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
    await event(client,Tags,Roller,RolVarMiMember,isAdmin,permlvl,MessageActionRow,MessageButton,MessageEmbed)
})
/* ---------------------------------------- EVENT HANDLER --------------------------------- */ 
