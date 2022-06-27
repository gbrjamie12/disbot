const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let message = context.params.event.content;

if (message.startsWith(`-rules`)) {
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
        "title": `MAKE SURE TO FOLLOW THESE RULES `,
        "description": `• No questioning the Admins.\n• No asking to be granted roles/moderator roles.\n• @mention the moderators for support.\n• No @ everyone/@ here mentioning without permission.\n• No @mentioning spam.\n• No sexually explicit content.\n• No pornographic content.\n• No NSFW content\n• No illegal content.\n• No piracy.\n• No modding.\n• No hacking.\n• No publishing of personal information (including real names, addresses, emails, passwords, bank account and credit card information, etc.).\n• No personal attacks.\n• No harassment.\n• No sexism.\n• No racism.\n• No hate speech.\n• No religious discussions.\n• No trolling.\n• No spamming.\n• No excessive messaging (breaking up an idea in many posts instead of writing all out in just one post).\n• No CAPS LOCK.\n• No external emojis.\n• No advertisement.\n• No off topic/use the right text channel for the topic you wish to discuss.\n• No linking to other servers.\n• Self promote only self-promotion.`,
        "color": 0x00FFFF
      }
    ]
  });
}