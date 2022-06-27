const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "allowed_mentions": {
    "replied_user": false,
    "parse": [
      "everyone"
    ]
  },
  "embeds": [
    {
      "type": "rich",
      "title": `🕺 USE CODE GBRJAMIE IN THE ITEM SHOP TODAY 🕺`,
      "description": "",
      "color": 0x00FFFF,
      "image": {
        "url": `https://i.imgur.com/PgCj659.png`,
        "height": 0,
        "width": 0
      }
    }
  ]
});