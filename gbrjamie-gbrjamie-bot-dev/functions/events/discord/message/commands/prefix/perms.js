const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const message = context.params.event;

if (message.content.startsWith('-perms')) {
  const roles = await lib.discord.guilds['@0.1.0'].roles
    .list({
      guild_id: message.guild_id, // required
    })
    .then((roles) => roles.filter((x) => message.member.roles.includes(x.id)));

  const permissions = [];
  for (let role of roles)
    for (let permission of role.permission_names) {
      if (!permissions.includes(permission)) permissions.push(permission);
    }

  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: message.channel_id,
    content: ``,
    embed: {
      color: 0xff2050,
      description: permissions.map((x) => `**\`${x}\`**`).join(' • '),
      title: `${message.author.username}'s Permissions`,
      thumbnail: {
        url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`,
      },
    },
  });
}
