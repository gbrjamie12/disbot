const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event
if (event.content.startsWith(`-help`)){//change the prefix to anything
await lib.discord.channels['@0.1.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Command list `,
      "description": "",
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `Helpfull Commands`, //you can change this
          "value": "\`-code\` Displays my support a creator. \n \`-rules\`Displays a list of the rules. \n \`-info\` Displays a users information." //change the commands to your commands
        },
        {
          "name": `moderation commands`, //you can change this
          "value": "\`unmute\` To unmute a specified user. \n \`mute\` To mute a specified user. \n \`kick\` To kick a user from the server. \n \`warn\` To warn a specified user. \n \`lock\` To Lock a specified channel admin only.\n \`unlock\` To unlock a specified channel admin only." //change this to anything you want
        }
      ],
      "footer": {
        "text": `Requested by ${context.params.event.author.username}` //dont change
      }
    }
  ]
});
}