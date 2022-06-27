const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

require('fortnite-api')

const news = `https://fortnite-api.com/images/map_en.png`;
if (context.params.event.content.startsWith('-fortnitemap')) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `<@!${context.params.event.author.id}> here's the map! \n ${news}`,
  });
}
console.log(`The person recieved the message`);
