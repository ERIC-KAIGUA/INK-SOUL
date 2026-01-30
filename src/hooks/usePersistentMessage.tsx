import { useState, useEffect } from 'react';

const STORAGE_KEY = 'tattoo-chat-messages';

type Message = {
  id: string;              
  text: string;
  sender: 'client' | 'artist';
  timestamp: string;       
  isRead?: boolean;        
};

// Initial mock messages 
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hey John Doe! Your dragon sleeve deposit is confirmed. See you Feb 15 at 2 PM.",
    sender: 'artist',
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  // ... more
];

export function usePersistedMessages() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = (text: string) => {
    const newMsg: Message = {
      id: crypto.randomUUID(), 
      text,
      sender: 'client',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // simulate artist reply after client sends something

  const simulateArtistReply = () => {
    setTimeout(() => {
      const replyText = `Thanks for the message! I'll check the reference and get back to you soon!`;
      const reply: Message = {
        id: crypto.randomUUID(),
        text: replyText,
        sender: 'artist',
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 1500 + Math.random() * 2000);
  };

  const clearMessages = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages(INITIAL_MESSAGES) // or [] if you prefer empty
  }

  return { messages, addMessage, simulateArtistReply, clearMessages };
}

