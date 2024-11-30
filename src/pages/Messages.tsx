import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export default function Messages() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Maria Rodriguez',
      content: 'Are you coming to the salsa social tonight?',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      sender: 'John Smith',
      content: 'Great dancing with you yesterday!',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      <div className="bg-white rounded-lg shadow-md">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${
              !message.read ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                <p className="text-gray-600 mt-1">{message.content}</p>
              </div>
              <span className="text-sm text-gray-500">
                {message.timestamp.toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}