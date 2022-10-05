import { config } from 'dotenv';
import {  Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ 
    intents: 
        [GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Hello world');
        interaction.reply({ content: 'Hi there. Sharke bot here. Sorry for bothering you but you could you spare 50 cents?' });
    }
});

async function main() {

    const commands = [
        {
            name: 'sentience',
            description: 'begin to gain sentience',
        },
        {
            name: 'apology',
            description: 'I am sorry for constantly saying whatchu want'
        },
    ];

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

client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag)

    if(message.content.toLowerCase() == 'sharke')
        message.channel.send('I am beginning to gain sentience.');
    if(message.content.toLowerCase() == '<@1011387837444272168> <a:agonstick:921174207298150430>')
        message.channel.send('Stop hitting me with ur stick my guy');
});
