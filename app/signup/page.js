"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lamp, AuthCard, InputField, AmbientLayer } from "../../components/AuthComponents";
import { Mail, Lock, Smile, Sparkles, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nickname: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("penGu_user_name", formData.nickname);
        router.push("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <main className="h-screen w-full bg-[#030303] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- BLUE-GLOW LAMP --- */}
      <Lamp isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* --- SIGNUP INTERFACE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 60 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 60 }}
            className="z-10 w-full max-w-md px-8 ml-[20%]"
          >
            <AuthCard title="Register" submitText="Establish Identity">
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField icon={<Smile size={18}/>} placeholder="OPERATOR NICKNAME" type="text" value={formData.nickname} onChange={(val) => setFormData({...formData, nickname: val})} />
                <InputField icon={<Mail size={18}/>} placeholder="NEURAL EMAIL" type="email" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
                <InputField icon={<Lock size={18}/>} placeholder="CREATE PASSCODE" type="password" value={formData.password} onChange={(val) => setFormData({...formData, password: val})} />
                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-blue-600 hover:text-white active:scale-95 shadow-xl flex items-center justify-center gap-3">
                  Establish Identity <Sparkles size={16} />
                </button>
              </form>
              <Link href="/login" className="w-full block text-center text-blue-400/60 text-[9px] uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors">
                Existing Operator?
              </Link>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AmbientLayer isOpen={isOpen} />
    </main>
  );
}