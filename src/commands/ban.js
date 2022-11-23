import { SlashCommandBuilder } from "@discordjs/builders";

const banCommand = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('bans a user from guild')
  .addSubcommand((subcommand => subcommand
    .setName('temp')
    .setDescription('Temporarily bans a user')
    .addUserOption((option => option
      .setName('user')
      .setDescription('user to be banned')
      )
    )
  ))
  .addSubcommand((subcommand => subcommand
  .setName('perma')
  .setDescription('Permanently bans a user')
  .addUserOption((option => option
    .setName('user')
    .setDescription('user to be banned')
    )
  )
));

export default banCommand.toJSON();
