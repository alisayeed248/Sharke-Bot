import { SlashCommandBuilder } from "@discordjs/builders";

const rolesCommand = new SlashCommandBuilder()
  .setName('addrole')
  .setDescription('Add a role')
  .addRoleOption((option) => 
  option.setName('newrole') // has to be all lowercase
  .setDescription('Adds a new role')
  .setRequired(true)
);

export default rolesCommand.toJSON();
