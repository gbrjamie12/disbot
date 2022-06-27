const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const ALLOWED_LINK_PATHS = [
  'https://www.youtube.com',
  'https://youtube.com/clip',
  'https://tenor.com',
  'https://youtu.be',
  'https://vm.tiktok.com',
];

let linkMatches = Array.from(context.params.event.content.matchAll(/http(s?):\/\/[^\s]*/gi));

let bannedLinkMatches = linkMatches.filter((linkMatch) => {
  return !ALLOWED_LINK_PATHS.find((allowedPath) => {
    return linkMatch[0].startsWith(allowedPath);
  });
});

if (bannedLinkMatches.length) {
  await lib.discord.channels['@0.1.1'].messages.destroy({
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Links from that site are not allowed in this server.`
  });
}