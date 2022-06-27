const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const TDB_API = require('tdb-api');
const trivia = new TDB_API();
const content = context.params.event.content;

const keyAnswer = 'trivia_answer';
const keyToken = 'trivia_token';

if (content === '-trivia') {
  let token = await getToken();
  const resp = await trivia.getQuestions({
    token,
    encode: 'base64',
    amount: 1,
    difficulty: 'medium',
  });

  const data = parseBase64(resp.data[0]);
  let {category, question, type} = data;
  const answer = data.correct_answer;
  const answersWrong = data.incorrect_answers;
  console.log(data);

  let options = [answer, ...answersWrong];
  if (type === 'multiple') options = shuffle(options);

  // The user must answer with '#1', '#2' etc
  let answerCode = `#${options.indexOf(answer) + 1}`;

  // Save the answer for the user to respond to
  await lib.utils.kv['@0.1.16'].set({
    key: keyAnswer,
    value: {
      question,
      answer,
      answerCode,
    },
    ttl: 3600, // 1 hour
  });

  return await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: question,
        description: `Category: \`${category}\``,
        color: 0x00ffff,
        fields: options.map((opt, i) => ({
          name: `Answer #${i + 1}`,
          value: opt,
          inline: true,
        })),
        footer: {
          text: 'Reply with an answer like #1 to play',
        },
      },
    ],
  });
} else if (content.startsWith('#')) {
  const answerDetails = await lib.utils.kv['@0.1.16'].get({key: keyAnswer});
  if (answerDetails) {
    let {question, answer, answerCode} = answerDetails;
    const respond = (title, message) =>
      lib.discord.channels['@0.2.2'].messages.create({
        channel_id: context.params.event.channel_id,
        content: [
          `**${title}**`,
          '',
          `"*${answer}*" was the answer to the question`,
          `> ${question}`,
        ].join('\n'),
      });
      
    if (content === answerCode) await respond('Correct! 🎉');
    else await respond('Wrong! 😕');

    await lib.utils.kv['@0.1.16'].clear({key: keyAnswer});
  }
}

/** Shuffle the order of an array */
function shuffle(array) {
  return array.reduce(
    (all, item) => (Math.random() < 0.5 ? [...all, item] : [item, ...all]),
    []
  );
}

/** Get a token for the API that is valid for 6 hours */
async function getToken() {
  let token = await lib.utils.kv['@0.1.16'].get({key: `trivia_token`});
  if (!token) {
    token = await trivia.create_session_token();
    await lib.utils.kv['@0.1.16'].set({
      key: keyToken,
      value: token,
      ttl: 21600, // 6 hours for token to expire
    });
  }
  return token;
}

/** Convert a base64 value to utf */
function atob(base64encoded) {
  return Buffer.from(base64encoded, 'base64').toString('utf8');
}

/** Convert the base64 API response to utf */
function parseBase64(obj) {
  return Object.entries(obj).reduce(
    (out, [key, val]) => ({
      ...out,
      [key]: Array.isArray(val) ? val.map(atob) : atob(val),
    }),
    {}
  );
}
