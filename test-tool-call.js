const { streamText, tool } = require('ai');
const { z } = require('zod');
const openrouter = require('@ai-sdk/openai').createOpenAI({ apiKey: process.env.OPENROUTER_API_KEY, baseURL: 'https://openrouter.ai/api/v1' });

async function run() {
  const result = streamText({
    model: openrouter('meta-llama/llama-3.1-8b-instruct:free'),
    prompt: 'what is the weather in SF?',
    tools: {
      getWeather: tool({
        description: 'Get weather',
        parameters: z.object({ location: z.string() }),
        execute: async () => 'sunny'
      })
    }
  });

  const response = result.toUIMessageStreamResponse();
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }
}
run();
