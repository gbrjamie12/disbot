/* Run the snippet as soon as you install it */
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

/* Fill these datils */
const details = {
  name: 'GBRJAMIE', // Channel Name
  url: 'https://www.youtube.com/c/GBRJAMIE', //Channel URL
  guild_id: '641400400200859649', // Your server ID where you want to add the subs stats
};

/* Find the channel whose name contains 'subscribers' */
const channels = await lib.discord.guilds['@0.1.0'].channels.list({
  guild_id: details.guild_id,
});
const subChannel = channels.find((x) => x.name.includes('subscribers'));

/* Get the Html Data of website */
const rawHtml = await axios(details.url).then((res) => res.data);

/* Going to use regex to get subs count */
const superSet = rawHtml.match(/"responseContext".+?(?="tvBanner":)/s)[0];
const subSet = '{' + superSet.match(/(?<=subscribers"}},)"simpleText":(.)+/);
const subData = JSON.parse(subSet.substr(0, subSet.length - 3));

/* If channel name is same as subs then stop the execution */
const subs = subData?.simpleText;
if (subChannel?.name === subs) return;

/* If channel exist then update it with new subs */
if (subChannel) {
  await lib.discord.channels['@0.2.0'].update({
    channel_id: subChannel.id,
    name: subs,
  });
} else {
  /* If channel do not exist then create new category with channel */
  const role = await lib.discord.guilds['@0.1.0'].roles
    .list({
      guild_id: details.guild_id,
    })
    .then((roles) => roles.find((x) => x.name === '@everyone'));

  const category = await lib.discord.guilds['@0.1.0'].channels.create({
    guild_id: details.guild_id,
    name: details.name,
    type: 4,
    position: 0,
  });

  await lib.discord.guilds['@0.1.0'].channels.create({
    guild_id: details.guild_id,
    name: subs,
    type: 2,
    parent_id: category.id,
    permission_overwrites: [
      {
        id: role.id,
        deny: `${1 << 20}`,
        type: 0,
      },
    ],
  });
}

/* If you liked my snippet then plz subscribe my yt xD ( DBD AND MORE ) */
