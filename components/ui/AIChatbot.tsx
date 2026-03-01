'use client';

import { useState } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Opens or closes the floating chat panel.
  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ignore empty messages and avoid duplicate sends while waiting.
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    // Immediately show user message in chat history.
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Send user message to backend route powered by Gemini.
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');

      // Append AI response after successful request.
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
    } catch {
      // Graceful fallback message when network/API call fails.
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Sorry, I am having trouble connecting right now.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center text-3xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] transition-all z-50 text-white"
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-robot"></i>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-80 md:w-96 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] flex flex-col overflow-hidden z-50 h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-yellow-300 border-b-4 border-black p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center">
              <i className="fas fa-robot text-black text-xl"></i>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-wide">AI Assistant</h3>
              <p className="text-xs font-bold font-sans">Powered by Gemini</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 font-medium mt-10">
                Hi! Looking for a professional? Ask me for a recommendation!
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg border-2 border-black font-medium max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-blue-200 shadow-[-2px_2px_0px_0px_#000] rounded-tr-none'
                      : 'bg-white shadow-[2px_2px_0px_0px_#000] rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] rounded-tl-none flex items-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t-4 border-black flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., Need a cheap plumber..."
              className="flex-1 p-2 border-2 border-black rounded-lg font-bold focus:outline-none focus:shadow-[2px_2px_0px_0px_#000]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-green-400 border-2 border-black rounded-lg font-black shadow-[2px_2px_0px_0px_#000] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-[1px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
