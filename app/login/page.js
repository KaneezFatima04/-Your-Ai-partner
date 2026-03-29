"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lamp, AuthCard, InputField, AmbientLayer } from "../../components/AuthComponents";
import { Mail, Lock, Sparkles, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("penGu_user_name", data.nickname);
        router.push("/chatPage");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <main className="h-screen w-full bg-[#030303] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- BLUE-GLOW LAMP --- */}
      <Lamp isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* --- LOGIN INTERFACE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 60 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 60 }}
            className="z-10 w-full max-w-md px-8 ml-[20%]"
          >
            <AuthCard title="Access" submitText="Authorize Link">
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField icon={<Mail size={18}/>} placeholder="NEURAL EMAIL" type="email" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
                <InputField icon={<Lock size={18}/>} placeholder="SECURE PASSCODE" type="password" value={formData.password} onChange={(val) => setFormData({...formData, password: val})} />
                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-blue-600 hover:text-white active:scale-95 shadow-xl flex items-center justify-center gap-3">
                  Authorize Link <Sparkles size={16} />
                </button>
              </form>
              <Link href="/signup" className="w-full block text-center text-blue-400/60 text-[9px] uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors">
                New Neural Profile?
              </Link>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AmbientLayer isOpen={isOpen} />
    </main>
  );
}