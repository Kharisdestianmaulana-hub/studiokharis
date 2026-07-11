const { useChat } = require('@ai-sdk/react');
const { renderToString } = require('react-dom/server');
const React = require('react');

function Test() {
  const chat = useChat({
    chat: {
      messages: [
        { id: '1', role: 'assistant', content: 'test', parts: [{type: 'text', text: 'test'}] }
      ],
      status: 'ready',
      error: undefined,
      sendMessage: () => {},
      addToolOutput: () => {}
    }
  });
  console.log("KEYS of M:", Object.keys(chat.messages[0]));
  return React.createElement('div', null, 'test');
}
renderToString(React.createElement(Test));
