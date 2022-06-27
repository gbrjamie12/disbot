// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let substrings = ['hello,*', 'hey,*', 'hi,*'];
let messageResponse = await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: [
    `Hey <@!${context.params.event.author.id}>! I'm a bot Built by NOTJAMIE.`,
    `You mentioned me in a message, so here I am!`
  ].join('\n'),
  embed: {
    title: 'Here is a list of my commands',
    type: 'rich', 
    color: 0x00AA00, // Green color
    description: '-help Displays a list of available commands.',
    fields: [{
      name: 'GBRJAMIE important links',
      value: [
        'Become A Member Here https://www.youtube.com/c/GBRJAMIE/membership  Streamlabs Donation link https://streamlabs.com/gbrgaming/tip',
        'Merch https://streamlabs.com/gbrgaming/merch \n Twitter- https://twitter.com/gbrjamie \n Twitch- https://www.twitch.tv/gbrjamie9',
        'Channel 2 https://www.youtube.com/channel/UCxtK40KotxjmJGnhUfAmGJA',
          
      ]
    .join('\n'),
    }]
  },
  tts: false
});

return messageResponse;
