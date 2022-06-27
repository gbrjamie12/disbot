// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith('-profile')) {
  let data = context.params.event.content.split(' ');
  let userId = data[1];
  if (!userId) {
    return lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Missing user id. Try calling the command like this: **-profile @username**`,
    });
  }
  let memberInfo = await lib.discord.guilds['@0.1.0'].members.retrieve({
    user_id: userId,
    guild_id: `${context.params.event.guild_id}`,
  });
  let avatarUrl = memberInfo.user.avatar_url;
  if (avatarUrl) {
    let gifCheckResponse = await lib.http.request['@1.1.5']({
      method: 'GET',
      url: avatarUrl.replace('.png', '.gif'),
    });
    if (gifCheckResponse.statusCode === 200) {
      avatarUrl = avatarUrl.replace('.png', '.gif');
    }
  }
  await lib.discord.channels['@0.1.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    embed: {
      title: `Profile for user ${memberInfo.nick || memberInfo.user.username}`,
      description: `• **ID**: \`${member.user.id}\`\n• **Discriminator**: \`#${
        member.user.discriminator
      }\`
      • **is a Bot**: ${member.user.bot ? 'Yes' : 'No'}\n• **Nickname**: ${
        member.nick ? member.nick : 'None'
      }\n• **Joined At**: \`${new Date(member.joined_at)}\``,
      thumbnail: {
        url: avatarUrl,
      },
    },
  });
}
