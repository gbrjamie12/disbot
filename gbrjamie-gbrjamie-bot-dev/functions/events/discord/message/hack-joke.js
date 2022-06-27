const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (context.params.event.content.startsWith(`+hack`)) {
  let event = context.params.event
  let text = context.params.event.content.split(` `);
  if (!text[1]) {
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Hey I need **YOU** to mention a user for me to hack.`,
    });
  } else if (!text[1].startsWith`<@`) {
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `Oops ${text[1]} had an NORD,VPN installed and caught you trying to hack them.`,
    });
  } else {
    let sleep = async (ms) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms || 0);
      });
    };
    let hackMessage = await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `<@${context.params.event.author.id}> is going to hack ${text[1]} `,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${Math.floor(
        Math.random() * 10
      )}%]** hacking has just begun, to late now to terminate`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 10
      }%]** injecting the virus `,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 20
      }%]** extracting user's info ....`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 30
      }%]** invading into user's bank account...:flushed:`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 40
      }%]** hacking user's social accounts (*Wolf Wistle*)`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 50
      }%]** **Half way there**`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 60
      }%]** password is **PA$$W0RD135**.........`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 70
      }%]** email is **Discord.lols@gmail.com** ...`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 80
      }%]** so close... User's bank [nill] your bank [$1,000] tottal money gained [$435]... `,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 90
      }%]** Almost done hold your horses!`,
    });
    await sleep(3000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[100%]** the hacking process is now done ${text[1]} is calling the police RUNNNN `,
    });
  }
}