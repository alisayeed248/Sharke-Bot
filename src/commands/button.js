import { SlashCommandBuilder } from '@discordjs/builders';

const buttonCommand = new SlashCommandBuilder()
  .setName('button')
  .setDescription('Register a button');

export default buttonCommand.toJSON();
