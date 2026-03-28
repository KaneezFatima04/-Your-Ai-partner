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
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: "Analyzing input... I'm synchronized with your movements." }]);
    }, 1000);
  };

  return (
    <main className="h-screen w-full bg-[#050505] flex flex-col overflow-hidden text-white font-sans relative">
      
      {/* --- THEME ELEMENTS (Glows) --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="p-8 flex justify-between items-center z-20 relative">
        <Link href="/" className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
            <ChevronLeft size={18} />
          </div>
          Back to Hub
        </Link>
        
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-500">Panda-v3</span>
            <span className="text-[9px] text-gray-500 font-medium">Latency: 24ms</span>
          </div>
          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] animate-pulse" />
        </div>
      </header>

      <div className="flex-1 flex flex-row items-center px-20 gap-16 relative z-10 overflow-hidden mb-8">
        
        {/* --- LEFT SIDE: THE COMPANION --- */}
        <div className="relative w-[450px] h-[550px] flex-shrink-0">
            {/* Decorative Rings */}
            <div className="absolute inset-0 border border-blue-500/10 rounded-[4rem] scale-105 pointer-events-none" />
            <div className="absolute inset-0 border border-blue-500/5 rounded-[4rem] scale-110 pointer-events-none" />
            
            <div className="w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
               <Character />
               
               {/* UI Overlay on Model */}
               <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                 <Zap size={14} className="text-blue-500" />
                 {/* <span className="text-[9px] uppercase font-bold tracking-[0.3em]">Holographic Link</span> */}
               </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: CHAT INTERFACE --- */}
        <div className="flex-1 h-full flex flex-col max-w-2xl">
          
          {/* MESSAGES AREA */}
          <div 
            ref={scrollRef} 
            className="flex-1 w-full flex flex-col gap-6 overflow-y-auto pr-4 mb-8 custom-scrollbar pt-4"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 mb-2 px-1">
                  {msg.role === 'user' ? 'Protocol: User' : 'Protocol: Panda'}
                </span>
                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white font-medium shadow-[0_10px_30px_rgba(37,99,235,0.25)] rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-gray-200 backdrop-blur-xl rounded-tl-none hover:bg-white/10'
                }`}>
                  <p className="text-[14px] leading-relaxed tracking-wide">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* INPUT SYSTEM */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative w-full bg-[#0f0f0f]/80 border border-white/10 rounded-[2.5rem] p-2 flex items-center backdrop-blur-2xl shadow-2xl transition-all">
                <div className="p-3 bg-white/5 rounded-full ml-1">
                    <Sparkles size={16} className="text-blue-400" />
                </div>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Initialize transmission..." 
                    className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 text-sm placeholder:text-gray-600"
                />
                <button 
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-90"
                >
                    <Send size={18} />
                </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.5), transparent);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}