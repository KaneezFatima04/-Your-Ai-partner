"use client";
import { useState, useRef, useEffect } from "react";
import Character from "../Character";
import { Sparkles, ChevronLeft, Send, Zap } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "System online. Panda is ready. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // Load username
  useEffect(() => {
    const name = localStorage.getItem("penGu_user_name");
    if (name) setUsername(name);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response from AI" }
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to AI server" }
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="h-screen w-full bg-[#050505] flex flex-col overflow-hidden text-white font-sans relative">
      
      {/* Theme Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="p-8 flex justify-between items-center z-20 relative">
        <Link href="/" className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
            <ChevronLeft size={18} />
          </div>
          Back to Hub
        </Link>
        
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-500">
              Panda-v3
            </span>
            <span className="text-[9px] text-gray-500 font-medium">
              {username || "Guest"}
            </span>
          </div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </header>

      <div className="flex-1 flex flex-row items-center px-20 gap-16 relative z-10 overflow-hidden mb-8">
        
        {/* Left */}
        <div className="relative w-[450px] h-[550px] flex-shrink-0">
          <div className="absolute inset-0 border border-blue-500/10 rounded-[4rem] scale-105" />
          <div className="w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
            <Character />
            <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <Zap size={14} className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 h-full flex flex-col max-w-2xl">
          <div ref={scrollRef} className="flex-1 flex flex-col gap-6 overflow-y-auto pr-4 mb-8 pt-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] uppercase text-gray-500 mb-2">
                  {msg.role === 'user' ? username || "User" : "Panda"}
                </span>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Panda is thinking...</div>}
          </div>

          {/* Input */}
          <div className="relative group">
            <div className="relative w-full bg-[#0f0f0f]/80 border border-white/10 rounded-[2.5rem] p-2 flex items-center backdrop-blur-2xl">
              <div className="p-3 bg-white/5 rounded-full ml-1">
                <Sparkles size={16} className="text-blue-400" />
              </div>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Initialize transmission..."
                className="flex-1 bg-transparent outline-none text-white px-4"
              />
              <button onClick={handleSend} disabled={loading} className="bg-blue-600 p-3 rounded-full">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}