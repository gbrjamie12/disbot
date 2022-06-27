const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-joke')) {
  const jokeJSON = await axios(
    'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit'
  ).then((res) => res.data);

  return lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: '',
    embed: {
      description: [ 
      `**${jokeJSON.joke || jokeJSON.setup}**`, 
      `${jokeJSON.delivery || ""}`
      ].join("\n"),
      color: 0xffff,
    },
  });
}
