const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (context.params.event.content.startsWith('discord.gg/')) {
  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`,
  });
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@!${context.params.event.author.id}> No Discord links allowed!`,
  });
}
if (context.params.event.content.startsWith('https://discord.gg/')) {
  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`,
  });
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@!${context.params.event.author.id}> No Discord links allowed!`,
  });
}
