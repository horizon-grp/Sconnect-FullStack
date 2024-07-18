// resources/js/Components/ChatArea.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { format } from 'date-fns';
import { io } from 'socket.io-client';
import { FiMessageSquare } from 'react-icons/fi';

const socket = io('YOUR_SERVER_URL');

const ChatArea = ({ conversation, messages, setMessages, user }) => {
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      socket.emit('join', conversation.id);

      socket.on('newMessage', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
        scrollToBottom();
      });

      socket.on('typing', () => {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      });

      return () => {
        socket.emit('leave', conversation.id);
        socket.off();
      };
    }
  }, [conversation]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = { conversation_id: conversation.id, content: newMessage, sender_id: user.id };
      Inertia.post(`/messages/${conversation.id}`, messageData, {
        onSuccess: () => {
          socket.emit('newMessage', messageData);
          setMessages([...messages, { ...messageData, id: Date.now(), sender: user, created_at: new Date().toISOString() }]);
          setNewMessage('');
          scrollToBottom();
        },
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleTyping = () => {
    socket.emit('typing', conversation.id);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Choose a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold">{conversation.provider?.name || conversation.seeker?.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto my-4">
        {messages.length === 0 ? (
          <p className="text-gray-600 text-center">No messages yet.</p>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`my-2 p-3 rounded-lg ${message.sender_id === user.id ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
              <div className="flex items-start">
                <img src={message.sender?.profile_pic || 'default-avatar.png'} alt="Avatar" className="h-8 w-8 rounded-full mr-2" />
                <div>
                  <p>{message.content}</p>
                  <span className="text-xs text-gray-500">{format(new Date(message.created_at), 'p')}</span>
                </div>
              </div>
            </div>
          ))
        )}
        {typing && <p className="text-gray-500">Typing...</p>}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleTyping}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
