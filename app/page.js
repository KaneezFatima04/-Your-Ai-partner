"use client";
import Link from "next/link";
import Character from "./Character";
import { ArrowRight } from "lucide-react";

export default function Onboarding() {
  return (
    <main className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      
      <div className="z-10 text-center space-y-6 max-w-2xl px-6">
        <h1 className="text-7xl font-bold text-white tracking-tighter">
          Meet <span className="text-blue-500">PenGu.</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Your new 3D AI companion. Always there to listen, learn, and hang out.
        </p>
        
        <div className="h-[300px] w-full">
           <Character />
        </div>

        <Link href="/auth" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
          Start Chatting <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}