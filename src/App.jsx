import { useState } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div 
      className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}
    >
      
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        toggleHistory={toggleHistory} 
      />
      <ChatWindow />
      
    </div>
  );
}

export default App;