const { renderToString } = require('react-dom/server');
const React = require('react');

const messages = [
  {
    id: '1',
    role: 'assistant',
    content: '',
    parts: [
      { type: 'text', text: 'Hai! Ada' }
    ]
  }
];

function Test() {
  const m = messages[0];
  return React.createElement('div', null, [
    m.content,
    m.parts ? m.parts.map((p, i) => React.createElement('span', {key: i}, p.text)) : null
  ]);
}
console.log(renderToString(React.createElement(Test)));
