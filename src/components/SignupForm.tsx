import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Participant } from "../types";

interface SignupFormProps {
  onSuccess: (participant: Participant) => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

    const calendarUrl = "https://calendar.app.google/UYp6Y9TtoW5Xd2L36";
    // Abre uma nova aba de forma síncrona para evitar que o bloqueador de popups impeça a abertura
    const calendarWindow = window.open("", "_blank");
    if (calendarWindow) {
      calendarWindow.document.write(`
        <html>
          <head>
            <title>Redirecionando para a Agenda...</title>
            <style>
              body {
                background-color: #050505;
                color: #f1f5f9;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
              }
              .spinner {
                border: 3px solid rgba(255, 255, 255, 0.1);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border-left-color: #3b82f6;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              p {
                font-size: 14px;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                color: #94a3b8;
              }
            </style>
          </head>
          <body>
            <div class="spinner"></div>
            <p>Confirmando sua inscrição e abrindo a agenda...</p>
          </body>
        </html>
      `);
    }

    try {
      const newParticipant: Participant = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp,
        registeredAt: new Date().toISOString(),
      };

      // Import Firestore dynamically or at the top level
      const { collection, addDoc } = await import("firebase/firestore");
      const { db, handleFirestoreError, OperationType } = await import("../lib/firebase");

      try {
        await addDoc(collection(db, "registrations"), newParticipant);
      } catch (error) {
        if (calendarWindow) calendarWindow.close();
        handleFirestoreError(error, OperationType.CREATE, "registrations");
      }

      // Save to localStorage
      localStorage.setItem("commercial_ai_workshop_registration", JSON.stringify(newParticipant));

      // Direct redirect in the new window, or fallback to current window if blocked
      if (calendarWindow) {
        calendarWindow.location.href = calendarUrl;
      } else {
        window.location.href = calendarUrl;
      }
      
      setIsSubmitting(false);
      onSuccess(newParticipant);
    } catch (error) {
      if (calendarWindow) calendarWindow.close();
      console.error("Error adding document: ", error);
      setErrorMsg("Ocorreu um erro ao salvar sua inscrição. Tente novamente.");
      setIsSubmitting(false);
    }
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

            {/* Submit Button - Green and Metallic Blue Gradient Style */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="confirmar-presenca-btn"
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:via-teal-400 hover:to-blue-500 text-white font-bold py-4 rounded-lg mt-4 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.3)] border border-emerald-400/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
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
        </div>
      </div>
    </section>
  );
}
