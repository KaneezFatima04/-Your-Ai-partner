"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Smile, Sparkles, Fingerprint } from "lucide-react";

export default function AuthPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Default to login
  const [formData, setFormData] = useState({ name: "", nickname: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use nickname for signup, otherwise default to a generic name for login or email prefix
    const displayName = !isLogin ? formData.nickname : formData.email.split('@')[0];
    localStorage.setItem("penGu_user_name", displayName);
    router.push("/chatPage");
  };

  return (
    <main className="h-screen w-full bg-[#030303] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- THE AESTHETIC BLUE-GLOW LAMP --- */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center z-50">
        <div className="relative cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
          
          {/* Lamp Shade - Now turns Blue on Click */}
          <motion.div 
            animate={{ 
              y: isOpen ? -8 : 0,
              backgroundColor: isOpen ? "#1d4ed8" : "#1a1a1a", // Deep Blue when on
              borderColor: isOpen ? "#3b82f6" : "#333333",
              boxShadow: isOpen ? "0 0 50px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.2)" : "0 0 0px transparent"
            }}
            className="relative w-28 h-16 transition-all duration-500 ease-in-out border-2"
            style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)" }}
          />

          {/* The Stem */}
          <div className={`w-[1px] h-36 mx-auto transition-colors duration-700 ${isOpen ? 'bg-blue-500/50' : 'bg-white/10'}`} />

          {/* The Base */}
          <motion.div 
            animate={{ borderColor: isOpen ? "#3b82f6" : "#1a1a1a" }}
            className="w-16 h-1.5 bg-[#080808] border-t rounded-full mx-auto -mt-1 shadow-2xl"
          />

          {/* Instruction Tooltip */}
          {!isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-[9px] uppercase tracking-[0.6em] text-blue-500/60 font-black animate-pulse">
                Click to Initialize
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- AUTH INTERFACE (Balanced Transparency) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 60 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 60 }}
            className="z-10 w-full max-w-md px-8 ml-[20%]"
          >
            {/* Softened background - using bg-white/5 and higher backdrop blur */}
            <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
              
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-4xl font-extralight text-white tracking-[0.1em] uppercase">
                    {isLogin ? "Access" : "Register"}
                  </h1>
                  <div className="w-12 h-[2px] bg-blue-600 mt-3" />
                </div>
                <Fingerprint className="text-blue-500/40" size={32} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {isLogin ? (
                    /* LOGIN FIELDS: Email & Password Only */
                    <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                      <InputField icon={<Mail size={18}/>} placeholder="NEURAL EMAIL" type="email" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
                      <InputField icon={<Lock size={18}/>} placeholder="SECURE PASSCODE" type="password" value={formData.password} onChange={(val) => setFormData({...formData, password: val})} />
                    </motion.div>
                  ) : (
                    /* SIGNUP FIELDS: Nickname, Email & Password */
                    <motion.div key="signup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                      <InputField icon={<Smile size={18}/>} placeholder="OPERATOR NICKNAME" type="text" value={formData.nickname} onChange={(val) => setFormData({...formData, nickname: val})} />
                      <InputField icon={<Mail size={18}/>} placeholder="NEURAL EMAIL" type="email" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
                      <InputField icon={<Lock size={18}/>} placeholder="CREATE PASSCODE" type="password" value={formData.password} onChange={(val) => setFormData({...formData, password: val})} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-8">
                  <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-blue-600 hover:text-white active:scale-95 shadow-xl flex items-center justify-center gap-3">
                    {isLogin ? "Authorize Link" : "Establish Identity"} <Sparkles size={16} />
                  </button>
                  
                  <button type="button" onClick={() => setIsLogin(!isLogin)} className="w-full text-center text-blue-400/60 text-[9px] uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors">
                    {isLogin ? "New Neural Profile?" : "Existing Operator?"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMBIENCE LAYER */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}

function InputField({ icon, placeholder, type, value, onChange }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
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