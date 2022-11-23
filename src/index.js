import { config } from 'dotenv';
import { 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  Client, 
  GatewayIntentBits, 
  InteractionType,
  ModalBuilder, 
  Routes, 
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import { REST } from '@discordjs/rest';
import scheduleCommand from './commands/schedule.js';
import rolesCommand from './commands/roles.js';
import userCommand from './commands/user.js';
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';
import buttonCommand from './commands/button.js';

config();

const TOKEN = process.env.SHARKE_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {console.log(`${client.user.tag} has logged in!`)});

client.on('messageCreate', (m) => {
  if (m.author.bot) return;

  m.channel.send({
    content: 'Hey!',
    components: [
      new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId('button1')
          .setLabel('Button 1')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('button 2')
          .setLabel('Button 2')
          .setStyle(ButtonStyle.Secondary)
      ),
    ],
  })
});

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'schedule') {
      const timezone = interaction.options.get('timezone').value;
      const time = interaction.options.get('time').value;
      interaction.reply({ content: `Scheduled for ${time} ${timezone}`,
      });
    }
    else if (interaction.commandName === 'register') {
      console.log('register command initialized');
      const modal = new ModalBuilder()
        .setTitle('Register User Form')
        .setCustomId('registerUserModal')
        .setComponents(
          new ActionRowBuilder()
            .setComponents(
              new TextInputBuilder()
                .setLabel('username')
                .setCustomId('username')
                .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder()
            .setComponents(
              new TextInputBuilder()
                .setLabel('email')
                .setCustomId('email')
                .setStyle(TextInputStyle.Short)
          ),
          new ActionRowBuilder()
              .setComponents(
                new TextInputBuilder()
                  .setLabel('comment')
                  .setCustomId('comment')
                  .setStyle(TextInputStyle.Paragraph)
              )
        );

        interaction.showModal(modal);
    } else if (interaction.commandName === 'button') {
      interaction.reply({ content: 'Button!', components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId('button1')
            .setLabel('Button 1')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('button 2')
            .setLabel('Button 2')
            .setStyle(ButtonStyle.Secondary)
        ),
      ],
     });
    }
  }
  else if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === 'registerUserModal') {
      console.log(interaction.fields.getTextInputValue('username'));
    }
  }

  else if (interaction.isButton()) {
    console.log('Button interaction');
    console.log(interaction);
  }

  else if (interaction.isUserContextMenuCommand()) {
    console.log(interaction);
    if (interaction.commandName === 'Report') {
      console.log(interaction);
      console.log(interaction.targetMember);
      interaction.reply({ 
        content: `You reported ${interaction.targetMember}`,
      });
    } else if (interaction.commandName === 'Wave') {
      console.log(interaction);
      interaction.reply({
        content: `You waved to ${interaction.targetMember}`,
      });
    } 
  }

  else if (interaction.isMessageContextMenuCommand()) {
    console.log(interaction.targetMessage);
  }
  
});

async function main() {

  const commands = [
    scheduleCommand, 
    rolesCommand, 
    userCommand, 
    banCommand, 
    registerCommand, 
    buttonCommand,
    {
      name: 'Wave',
      type: 2,
    },
    {
      name: 'Report',
      type: 2,
    },
    {
      name: 'Report Message',
      type: 3,
    }
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
