// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let isKICK_MEMBERS =
  (context.params.event.member.permissions & (1 << 1)) === 1 << 1;

if (isKICK_MEMBERS) {
  let userId = context.params.event.data.options[0].value;
  let reason = context.params.event.data.options[1].value;
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: context.params.event.guild_id, // required
  });

  await lib.discord.users['@0.1.4'].dms.create({
    recipient_id: `${userId}`,
    content: '',
    embed: {
      type: 'rich',
      title: `**You were kicked!**`,
      description: `
*From:* **${guild.name}**
*For:* **${reason}**
*Moderator:* **<@${context.params.event.member.user.id}>**`,
      color: 131644,
    },
  });
  let result = await lib.discord.guilds['@0.1.0'].members.destroy({
    user_id: `${userId}`,
    guild_id: `${context.params.event.guild_id}`,
    reason: `${reason}`,
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `**<@${context.params.event.member.user.id}> - has kicked <@${userId}> - ID: ${userId}**`,
  });
} else {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `**<@${context.params.event.member.user.id}> - You need the KICK_MEMBERS permission to use the Kick command!**`,
  });
}
