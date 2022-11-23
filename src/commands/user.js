import { SlashCommandBuilder } from "@discordjs/builders";

const userCommand = new SlashCommandBuilder()
  .setName('users')
  .setDescription('Users cmd')
  .addUserOption((option) => 
    option.setName('user') // has to be all lowercase
  .setDescription('user')
);

export default userCommand.toJSON();
