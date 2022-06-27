const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// *** Set the channel ID to post in ***
const channel_id = process.env.WELCOME_CHANNEL_ID

await lib.discord.channels['@0.1.1'].messages.create({
  channel_id,
  content: `Welcome to this server <@${context.params.event.user.id}>!`,
  embed: {
    title: 'Server Information',
    type: 'rich',
    color: 0x0000AA,
    description: 'Here are some things to know about this Server',
    fields: [{
      name: 'Step #1',
      value: `Introduce yourself!`
    }, {
      name: 'Step #2',
      value: 'Be yourself!'
    }, {
      name: 'Step #3',
      value: `Don't be evil.`
    }, {
      name: 'More Important Information',
      value: [
        'You can find a full list of rules in the <#760640878556610590> channel \n Grab yourself a free role from <#936304796187644014> to show of your platform \n If you have any questions, feel free to DM the <@&754121292189270148> or <@&758392150638460958> If u need too.',
      ].join('\n')
    }]
  }
});