import React from 'react';
import { sendMessageToN8n } from '../services/n8nService';
import { ChatMessage } from '../types';

const ChatIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-110 z-30"
    aria-label="Open chat"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </button>
);

const ChatWindow: React.FC<{ 
    onClose: () => void; 
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}> = ({ onClose, messages, onSendMessage, isLoading }) => {
    const [input, setInput] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    return (
        <div className="fixed inset-0 sm:bottom-6 sm:right-6 sm:inset-auto sm:w-full sm:max-w-md sm:h-[70vh] sm:max-h-[600px] flex flex-col bg-white dark:bg-gray-800 shadow-2xl sm:rounded-lg border-gray-200 dark:border-gray-700 sm:border transition-all duration-300 ease-out transform-gpu sm:origin-bottom-right z-40">
             {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 sm:rounded-t-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">AI Assistant</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" aria-label="Close chat">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                           <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl flex items-center space-x-2">
                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={handleSend} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! How can I assist you today?" }
  ]);

  const handleSendMessage = React.useCallback(async (message: string) => {
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      setIsLoading(true);
      
      try {
          const reply = await sendMessageToN8n(message);
          setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } catch (error) {
           setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't connect to the server." }]);
      } finally {
          setIsLoading(false);
      }
  }, []);

  // Prevent body scroll when chat is open on mobile
  React.useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isOpen && isMobile) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { // Cleanup on unmount
        document.body.style.overflow = '';
    };
  }, [isOpen]);


  return (
    <>
      <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <ChatIcon onClick={() => setIsOpen(true)} />
      </div>
      <div className={`transition-all duration-300 ease-out ${isOpen ? 'opacity-100 visible sm:scale-100' : 'opacity-0 invisible sm:scale-95'}`}>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />}
      </div>
    </>
  );
};