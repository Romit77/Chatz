"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketProvider";
import { Send, MessageCircle } from "lucide-react";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 animate-gradient-x">
      <header className="bg-chat-bg p-4">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <MessageCircle className="mr-2 animate-bounce" />
          Chat App
        </h1>
      </header>
      <main className="flex-grow flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full">
        <div className="flex-grow bg-chat-bg rounded-lg p-4 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center animate-pulse">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 last:mb-0 animate-fade-in">
                <p className="bg-gray-700 text-white rounded-lg p-2 inline-block">
                  {msg}
                </p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim()) {
              sendMessage(message);
              setMessage("");
            }
          }}
          className="flex gap-2"
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            placeholder="Type your message..."
            className="flex-grow bg-gray-800 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 ease-in-out transform hover:scale-101 focus:scale-101"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-1 animate-pulse" />
            Send
          </button>
        </form>
      </main>

      <footer className="text-center p-4 text-gray-500">
        © 2023 Chat App. All rights reserved.
      </footer>
    </div>
  );
}
