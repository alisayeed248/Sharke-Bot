import { SlashCommandBuilder } from "@discordjs/builders";

const scheduleCommand = new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Schedule a time to be pinged!')
    .addStringOption((option) => 
      option
      .setName('timezone')
      .setDescription('Select your timezone.')
      .setRequired(true)
      .setChoices({
        name: 'EST',
        value: 'EST',
      }, {
        name: 'PST',
        value: 'PST',
      }, {
        name: 'CST',
        value: 'CST',
      }
    )
  )
  .addStringOption((option) =>
      option
      .setName('time')
      .setDescription('Select a time.')
      .setRequired(true)
      .setChoices({
        name: 'Morning',
        value: 'Morning',
      }, {
        name: 'Evening',
        value: 'Evening',
      }
    )
  )
  .addUserOption((option) =>
      option.setName('person')
      .setDescription('Select a user to be pinged')
      .setRequired(true)
  )
  ;

export default scheduleCommand.toJSON();
