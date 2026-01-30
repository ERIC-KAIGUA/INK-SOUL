// components/ChatSection.tsx
import { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns'; 
import { usePersistedMessages } from '../hooks/usePersistentMessage';

export default function ChatSection() {
  const { messages, addMessage, simulateArtistReply } = usePersistedMessages();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input.trim());
    simulateArtistReply(); 
    setInput('');
  };

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-5 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-shade rounded-xl shadow-2xl">
        <h2 className="font-bold text-foreground text-center">Chat with Your Artist</h2>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                msg.sender === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 block mt-1">
                {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t bg-gray-800 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-1.5 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}