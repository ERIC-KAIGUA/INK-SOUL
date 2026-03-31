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
    <div className="flex flex-col w-full max-w-3xl mx-auto mt-5 shadow-lg">
      {/* Header */}
      <div className="p-4 bg-shade rounded-t-xl shadow-2xl">
        <h2 className="font-bold text-foreground text-center text-lg">
          Chat with Your Artist
        </h2>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 min-h-[400px] max-h-[60vh] rounded-b-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
              <span className="text-xs opacity-70 block mt-1.5">
                {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed for mobile */}
      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 bg-gray-800 border-t border-gray-700 rounded-b-xl sticky bottom-0"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-full bg-gray-700 text-white 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 text-base min-h-[48px]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors 
                     rounded-full font-medium text-white flex-shrink-0 min-h-[48px]"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}