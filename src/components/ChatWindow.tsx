import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { PaperAirplaneIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { Toast } from './Toast';
import { agixService } from '../services/agixService';

export const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatHistory, addChatMessage, startCampaign, addRandomLeads } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      setIsLoading(true);
      // Add user message
      addChatMessage(message, 'user');
      setShowToast(true);

      // Get response from AGIX
      const response = await agixService.sendMessage(message);
      addChatMessage(response.response, 'assistant');

      // Add random leads when we get a response
      const randomLeadCount = Math.floor(Math.random() * 1) + 1; // 1-3 leads
      addRandomLeads(randomLeadCount);

      // Handle campaign-related commands
      if (message.toLowerCase().includes('start campaign')) {
        await agixService.startCampaign({
          plans: ['A', 'B'],
          leads: [], // Add your leads data here
        });
      }

      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      addChatMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Talk to Agenoid</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm transition-colors duration-200 pr-24 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Menu as="div" className="absolute right-2 top-1/2 -translate-y-1/2">
              <Menu.Button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <PlusIcon className="h-5 w-5 text-gray-500" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Upload CSV
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => startCampaign()}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Start Campaign
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            <span>{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>
      </form>

      {showToast && (
        <Toast
          message="Message sent!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}; 