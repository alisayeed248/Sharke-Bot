import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'; 
import OrderCommand from './commands/order.js';
import RolesCommand from './commands/roles.js';
import UsersCommand from './commands/user.js';
import ChannelsCommand from './commands/channel.js';
import BanCommand from './commands/ban.js';

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
    ],
});

const rest = new REST({ versionn: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {

        if(interaction.commandName === 'order') {
            console.log('Order Command');
            console.log(interaction);
            
        }
        // if (interaction.commandName ==
        /*
        const words = interaction.options.get('test').value;
        interaction.reply({ content: ` ${words} ` });
        */
    }
});

async function main() {

    const commands = [ChannelsCommand]; //add commands to this array
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();
