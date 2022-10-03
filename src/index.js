import { config } from 'dotenv';
import { Client } from 'discord.js';

config();

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });
const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);
