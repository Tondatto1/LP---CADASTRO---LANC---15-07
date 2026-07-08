import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react";
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

  // Elegant feedback modal states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"loading" | "success" | "error">("loading");
  const [modalMessage, setModalMessage] = useState("");

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
    setShowStatusModal(true);
    setModalStatus("loading");
    setModalMessage("Garantindo seu acesso exclusivo...");

    const calendarUrl = "https://calendar.app.google/UYp6Y9TtoW5Xd2L36";

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
        setShowStatusModal(false);
        handleFirestoreError(error, OperationType.CREATE, "registrations");
        throw error;
      }

      // Save to localStorage
      localStorage.setItem("commercial_ai_workshop_registration", JSON.stringify(newParticipant));

      setModalStatus("success");
      setModalMessage("Inscrição confirmada com sucesso! Abrindo calendário...");

      // Elegant delay to appreciate the success visual transition, then direct redirect in same tab
      setTimeout(() => {
        window.location.href = calendarUrl;
      }, 1800);
      
      setIsSubmitting(false);
      onSuccess(newParticipant);
    } catch (error) {
      console.error("Error adding document: ", error);
      setModalStatus("error");
      setModalMessage("Ocorreu um erro ao salvar sua inscrição. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cadastro-section" className="relative py-28 px-6 bg-gradient-to-b from-[#020710] via-[#021812] to-[#050505] overflow-hidden">
      {/* High-End Tech Grid with mask to fade at top and bottom */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] opacity-25 pointer-events-none" />
      
      {/* Seamless top and bottom color transitions */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020710] via-[#020710]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-10" />

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
                SEU MELHOR EMAIL
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

      {/* Elegant Premium Feedback Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-sm w-full p-8 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden text-center flex flex-col items-center gap-6"
            >
              {/* Premium Top Glow Light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Status Icon with custom gradient ring */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.02] border border-white/10">
                {modalStatus === "loading" && (
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                )}
                {modalStatus === "success" && (
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                )}
                {modalStatus === "error" && (
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <XCircle className="w-8 h-8 text-red-400" />
                  </motion.div>
                )}
              </div>

              {/* Text Information */}
              <div className="space-y-2">
                <h3 className="text-lg font-display font-medium text-white tracking-tight">
                  {modalStatus === "loading" && "Processando..."}
                  {modalStatus === "success" && "Sucesso!"}
                  {modalStatus === "error" && "Ops!"}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  {modalMessage}
                </p>
              </div>

              {/* Fallback button if error */}
              {modalStatus === "error" && (
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Fechar
                </button>
              )}

              {/* Progress Bar / Redirect indicator */}
              {modalStatus === "success" && (
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
