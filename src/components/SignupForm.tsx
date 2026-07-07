import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Phone, Calendar, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Participant } from "../types";

interface SignupFormProps {
  onSuccess: (participant: Participant) => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [savedUser, setSavedUser] = useState<Participant | null>(null);

  // Check if user is already registered in this browser session
  useEffect(() => {
    const saved = localStorage.getItem("commercial_ai_workshop_registration");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Participant;
        setSavedUser(parsed);
        setIsSuccess(true);
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  // Format phone number as Brazilian WhatsApp template: (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (input.length > 11) {
      input = input.substring(0, 11); // Limit to 11 digits
    }

    let formatted = "";
    if (input.length > 0) {
      formatted = `(${input.substring(0, 2)}`;
    }
    if (input.length > 2) {
      formatted += `) ${input.substring(2, 7)}`;
    }
    if (input.length > 7) {
      formatted += `-${input.substring(7, 11)}`;
    }

    setWhatsapp(formatted || input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple robust validation
    if (!name.trim()) {
      setErrorMsg("Por favor, informe seu nome completo.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Por favor, insira um e-mail válido.");
      return;
    }
    const cleanPhone = whatsapp.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Por favor, insira um WhatsApp com DDD válido.");
      return;
    }

    setIsSubmitting(true);

    // Simulate high-end backend network registration
    setTimeout(() => {
      const newParticipant: Participant = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp,
        registeredAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem("commercial_ai_workshop_registration", JSON.stringify(newParticipant));
      
      // Save to a cumulative list in localStorage just to simulate the database
      const existingListRaw = localStorage.getItem("all_registrations");
      let allRegs: Participant[] = [];
      if (existingListRaw) {
        try {
          allRegs = JSON.parse(existingListRaw);
        } catch (e) {
          allRegs = [];
        }
      }
      allRegs.push(newParticipant);
      localStorage.setItem("all_registrations", JSON.stringify(allRegs));

      setSavedUser(newParticipant);
      setIsSuccess(true);
      setIsSubmitting(false);
      onSuccess(newParticipant);
    }, 1500);
  };

  const handleRegisterAnother = () => {
    localStorage.removeItem("commercial_ai_workshop_registration");
    setName("");
    setEmail("");
    setWhatsapp("");
    setIsSuccess(false);
    setSavedUser(null);
  };

  return (
    <section id="cadastro-section" className="relative py-28 px-6 bg-gradient-to-b from-[#020710] via-[#021812] to-[#010408] overflow-hidden border-b border-white/10">
      {/* High-End Tech Grid and Metallic Reflections */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none" />
      
      {/* Glowing Sophisticated Metallic Orbs */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 mb-4 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.05)]"
          >
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            Inscrições Abertas
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Garanta sua Vaga
          </h2>
          <p className="text-gray-400 font-sans mt-2 text-sm sm:text-base font-light">
            Acesso exclusivo para profissionais do setor comercial e desenvolvimento humano.
          </p>
        </div>

        {/* Card Form Wrapper with premium Geometric styling */}
        <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Error Banner */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3.5 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-lg font-mono flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {errorMsg}
                  </motion.div>
                )}

                {/* Nome Completo */}
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="block text-[10px] uppercase tracking-widest text-gray-400 ml-1 font-mono">
                    Nome Completo
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-slate-600 font-sans"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="whatsapp-input" className="block text-[10px] uppercase tracking-widest text-gray-400 ml-1 font-mono">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp-input"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-slate-600 font-sans"
                  />
                </div>

                {/* E-mail */}
                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="block text-[10px] uppercase tracking-widest text-gray-400 ml-1 font-mono">
                    E-mail Corporativo
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="nome@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-slate-600 font-sans"
                  />
                </div>

                {/* Submit Button - Solid Geometric Blue Style */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="confirmar-presenca-btn"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg mt-4 transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmar presença</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed uppercase tracking-tighter">
                  Ao se inscrever você concorda em receber comunicações exclusivas sobre o evento.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-4 flex flex-col items-center"
              >
                {/* Glowing check circle matching design spec */}
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-pulse">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-white">
                  Sua inscrição foi confirmada com sucesso
                </h3>
                
                <p className="text-gray-400 mb-8 font-light text-sm leading-relaxed max-w-sm">
                  Sua inscrição foi confirmada e o evento está pronto para ser adicionado à sua agenda. Seu workshop foi confirmado e você poderá adicionar o evento à sua agenda.
                  <br />
                  <span className="inline-block mt-3 text-xs text-emerald-400 font-mono border border-emerald-500/20 bg-emerald-950/10 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                    Confirmado para: {savedUser?.email}
                  </span>
                </p>

                {/* Email Confirmation Hint */}
                <p className="text-xs text-slate-500 font-sans mb-8">
                  Você também receberá uma confirmação em seu e-mail corporativo.
                </p>

                {/* Calendar Button & Actions in white high contrast style of the design */}
                <div className="w-full space-y-4">
                  <a
                    href="https://calendar.app.google/g32sMwr19zvpShNV8"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    id="add-to-calendar-btn"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-blue-600 hover:text-white text-black font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Adicionar à minha agenda</span>
                  </a>

                  <button
                    onClick={handleRegisterAnother}
                    id="register-another-btn"
                    className="w-full text-xs text-slate-500 hover:text-slate-300 font-mono tracking-wider hover:underline transition-all duration-200 py-2 cursor-pointer"
                  >
                    Inscrever outro participante
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
