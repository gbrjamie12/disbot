const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const id = `943321951001251870`; // Your Channel ID goes here

const event = context.params.event;
const key = `rate_limit_${event.author.id}`;
const hasMessagedRecently = await lib.utils.kv['@0.1.16'].get({key});
const value = context.params.event.content;

if (context.params.event.channel_id == `${id}`) {
  if (isNaN(value)) {
  } else {
    if (hasMessagedRecently) {
      const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));
      const seconds = 1;
      const channel_id = event.channel_id;

      await lib.discord.channels['@0.2.0'].messages.destroy({
        message_id: event.id,
        channel_id,
      });

      const message = await lib.discord.channels['@0.2.0'].messages.create({
        channel_id,
        content: `<@${event.author.id}> You need to wait 10 seconds before sending another message`,
      });

      const message_id = message.id;
      for (let i = seconds; i > 0; i--) {
        await sleep(1000);
      }

      await lib.discord.channels['@0.2.0'].messages.destroy({
        message_id,
        channel_id,
      });
    } else {
      let message = context.params.event.content;

      let current_num = await lib.utils.kv['@0.1.16'].get({
        key: `currentnum`,
        defaultValue: 1,
      });
      let isAdmin =
        (context.params.event.member.permissions & (1 << 3)) === 1 << 3;

      if (context.params.event.content.startsWith('-reset') && isAdmin) {
        await lib.utils.kv['@0.1.16'].set({
          key: `currentnum`,
          value: 1,
        });

        await lib.discord.channels['@0.1.2'].messages.reactions.create({
          emoji: `✅`,
          message_id: context.params.event.id,
          channel_id: context.params.event.channel_id,
        });

        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `✅ Count has been reset. Next Number is 1`,
        });
      } else if (parseInt(message.split(' ')[0]) !== parseInt(current_num)) {
        await lib.discord.channels['@0.1.2'].messages.reactions.create({
          emoji: `❌`,
          message_id: context.params.event.id,
          channel_id: context.params.event.channel_id,
        });

        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `❌ Count has been reset. Next Number is 1`,
        });

        await lib.utils.kv['@0.1.16'].set({
          key: `currentnum`,
          value: 1,
        });
      } else {
        await lib.utils.kv['@0.1.16'].set({
          key: `currentnum`,
          value: parseInt(message.split(' ')[0]) + 1,
        });

        await lib.discord.channels['@0.1.2'].messages.reactions.create({
          emoji: `✅`,
          message_id: context.params.event.id,
          channel_id: context.params.event.channel_id,
        });
      }
    }
  }
  await lib.utils.kv['@0.1.16'].set({
    key: key,
    value: true,
    ttl: 1,
  });
}
