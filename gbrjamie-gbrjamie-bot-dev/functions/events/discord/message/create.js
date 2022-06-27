const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

const bot_name = 'GBRJAMIE-BOT'; //Your bot name
const command = '!set-ai-channel'

const key = "ai-channels"
const content = context.params.event.content;

// Setup command
if (content.startsWith(command)) {
  const channel_ids = content.match(/\d{18}/)
  if (channel_ids && channel_ids[0]) {
    const channel_id = channel_ids[0]
    const index = await lib.utils.kv['@0.1.16'].get({ key }) || {};
    index[context.params.event.guild_id] = channel_id;
    await lib.utils.kv['@0.1.16'].set({ key, value: index });
    await lib.discord.channels['@0.2.1'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Your AI channel is now <#${channel_id}>.`
    });
  } else {
    await lib.discord.channels['@0.2.1'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Please mention a channel in order to set the AI channel.`
    });
  }
  return
}

// Are we in the AI channel?
const index = await lib.utils.kv['@0.1.16'].get({ key }) || {};
const channel_id = index[context.params.event.guild_id]
console.log(channel_id);
if (context.params.event.channel_id !== channel_id) return;

let returnMsg = await axios(
  `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
    content
  )}&botname=${encodeURIComponent(bot_name)}&ownername=CTK WARRIOR&user=${
    context.params.event.author.id
  }`
);
returnMsg = returnMsg ? returnMsg.data : false;
if (!returnMsg || !returnMsg.message) return;

await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: returnMsg.message,
  message_reference: {
    message_id: context.params.event.id,
  },
});