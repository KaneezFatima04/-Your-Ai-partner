import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";

// Lamp component
export function Lamp({ isOpen, setIsOpen }) {
  return (
    <div className="absolute left-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
      <div className="relative cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
        <motion.div 
          animate={{ 
            y: isOpen ? -8 : 0,
            backgroundColor: isOpen ? "#1d4ed8" : "#1a1a1a",
            borderColor: isOpen ? "#3b82f6" : "#333333",
            boxShadow: isOpen ? "0 0 50px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)" : "0 0 0px transparent"
          }}
          className="relative w-28 h-16 transition-all duration-500 ease-in-out border-2"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)" }}
        />
        <div className={`w-[1px] h-36 mx-auto transition-colors duration-700 ${isOpen ? 'bg-blue-500/50' : 'bg-white/10'}`} />
        <motion.div animate={{ borderColor: isOpen ? "#3b82f6" : "#1a1a1a" }} className="w-16 h-1.5 bg-[#080808] border-t rounded-full mx-auto -mt-1 shadow-2xl" />
        {!isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-[9px] uppercase tracking-[0.6em] text-blue-500/60 font-black animate-pulse">Click to Initialize</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Card wrapper
export function AuthCard({ title, submitText, children }) {
  return (
    <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-extralight text-white tracking-[0.1em] uppercase">{title}</h1>
          <div className="w-12 h-[2px] bg-blue-600 mt-3" />
        </div>
        <Fingerprint className="text-blue-500/40" size={32} />
      </div>
      {children}
    </div>
  );
}

// Input field
export function InputField({ icon, placeholder, type, value, onChange }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-blue-500 transition-colors">{icon}</div>
      <input 
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none text-white focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-[10px] font-bold tracking-[0.2em] placeholder:text-white/20"
      />
    </div>
  );
}

// Ambient blur layer
export function AmbientLayer({ isOpen }) {
  return (
    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
    </div>
  );
}