const { streamText } = require('ai');
const openrouter = require('@ai-sdk/openai').createOpenAI({ apiKey: '123' });

async function run() {
  const result = streamText({
    model: openrouter('gpt-3.5-turbo'),
    messages: [{role: 'user', content: 'hi'}],
  });
  console.log("METHODS:", Object.keys(result.__proto__));
  console.log("ALL:", Object.getOwnPropertyNames(Object.getPrototypeOf(result)));
}
run();
