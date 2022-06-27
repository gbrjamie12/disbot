const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//catch
if (!context.params.event.member.permission_names.includes('MANAGE_CHANNELS')) {
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: ``,
        description: `<@${context.params.event.member.user.id}>, You require the \`MANAGE_CHANNELS\` permission to use this command!`,
        color: 0xff0000, //red
      },
    ],
  });
  return;
}

const role = await lib.discord.guilds['@0.1.0'].roles
  .list({
    guild_id: `${context.params.event.guild_id}`,
  })
  .then((roles) => roles.find((x) => x.name === '@everyone'));

await lib.discord.channels['@0.1.1'].permissions.update({
  overwrite_id: `${role.id}`,
  channel_id: `${context.params.event.channel_id}`,
  deny: `${1 << 11}`,
  type: 0,
});

await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `<#${context.params.event.channel_id}> Has been **LOCKED** by <@${context.params.event.member.user.id}>! Use \`/unlock\` to unlock the chat.`,
});

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/