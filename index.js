import { Client,Collection } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";

const client = new Client({
    intents:["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"]
})

client.login(process.env.token)