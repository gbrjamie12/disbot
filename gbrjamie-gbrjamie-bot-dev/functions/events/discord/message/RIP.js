const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const jimp = require('jimp');
module.exports = async (event, context) => {
  if (event.content.startsWith('-rip')) {
    let member = event.author.id;
    if (event.mentions.length >= 1) {
      member = event.mentions[0].id;
    }
    let user = await lib.discord.users['@0.1.4'].retrieve({
      user_id: member,
    });
    let img = await jimp.read(
      'https://cdn.discordapp.com/attachments/839401480162770974/869493447973806130/tombstone-159792_1280.png'
    );
    let avatar_jimp = await jimp.read(user.avatar_url);
    avatar_jimp.circle();
    avatar_jimp.grayscale();
    avatar_jimp.resize(555, 555);
    img.composite(avatar_jimp, 200, 600);
    let buffer = await img.getBufferAsync(jimp.MIME_PNG);
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: ``,
      filename: 'rip.png',
      file: buffer,
    });
  }
};
