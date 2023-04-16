import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [messageFromFlutter, setMessageFromFlutter] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  function onSendMessageButtonClick() {
    if (!window.sendMessage) {
      console.error('native error');
      return;
    }
    window.sendMessage.postMessage(JSON.stringify({ type: 'sendMessage', message: inputMessage }));
  }

  window.flutterMessage = (message) => {
    console.log('recv message: ${message}');
    setMessageFromFlutter(message.toString());
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input
          type="text"
          placeholder="メッセージ入力"
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button onClick={onSendMessageButtonClick}>メッセージ送信</button>
        <p>Message from Flutter: {messageFromFlutter}</p>
      </header>
    </div>
  );
}

export default App;
