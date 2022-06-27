module.exports = async (event, context) => {
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

  const userID = `${context.params.event.author.id}`;

  const username = `${context.params.event.author.username}`;

  const BANNED_WORDS = [`Fuck`, `Nigger`, `Fucking`, `F*CK`, `Fucker`, `F**k`, `Cunt`, `fuck u`,`faggot`,`whore`,`slut`,`Cunt`,`Cunt`,]; // Add banned words,

  const regEx = new RegExp(BANNED_WORDS.join('|'), 'gi');

  let messageContent = event.content;

  if (messageContent.match(regEx)) {
    await lib.discord.channels['@0.0.3'].messages.destroy({
      message_id: event.id,
      channel_id: event.channel_id,
    }),
      await lib.discord.users['@0.0.3'].dms.create({
        recipient_id: `${context.params.event.author.id}`,
        content: `banned word detected! \n 
        Filtered message: \`${messageContent}\``, //Message you want users to see when bot DMs them
      });

    await lib.discord.channels['@0.0.3'].messages.create({
      channel_id: `943330075829493800`, // Log channel of your server where you'll be notified when someone swears'
      content: '', // Message header
      tts: false,
      embed: {
        type: 'rich',
        color: 0xff0000,
        author: {
          name: `${username}`,
          icon_url: '', //author user icon link
        },
        title: '', // Embed title
        description: `${username} has said a banned word`, // This is changeable
        fields: [
          { 
            name: 'info:',
            value: `<@${userID}> | \`User ID:${userID}\` | \n \`Guild ID:${context.params.event.guild_id}\`|\`Channel ID:${context.params.event.channel_id}\``,
          },
          {
            name: 'Filtered Message',
            value: `||${messageContent}||`,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: '',
        },
      },
    });
  }
};
