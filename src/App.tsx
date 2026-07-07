import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowUpRight, Cpu, ShieldAlert, BadgeInfo } from "lucide-react";
import HeroSection from "./components/HeroSection";
import InfoSection from "./components/InfoSection";
import LearningSection from "./components/LearningSection";
import SignupForm from "./components/SignupForm";
import { Participant } from "./types";

export default function App() {
  const [participant, setParticipant] = useState<Participant | null>(null);

  const handleCtaClick = () => {
    const el = document.getElementById("cadastro-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRegistrationSuccess = (newParticipant: Participant) => {
    setParticipant(newParticipant);
    // Smooth scroll to the form success card so the participant immediately notices it
    setTimeout(() => {
      const el = document.getElementById("cadastro-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Premium Header conforming to Geometric Balance */}
      <header className="relative z-50 w-full border-b border-white/10 bg-[#050505]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* The signature rotating geometric logo of the theme */}
            <div className="w-8 h-8 border-2 border-blue-500 rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500"></div>
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white uppercase ml-1">
              Capacitação<span className="text-blue-500">.</span>IA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400">
            <a href="#info-card-0" className="hover:text-blue-400 transition-colors">Detalhes</a>
            <a href="#learn-topic-0" className="hover:text-blue-400 transition-colors">Cronograma</a>
            <a href="#cadastro-section" className="hover:text-blue-400 transition-colors">Inscrição</a>
          </nav>

          <div>
            <button
              onClick={handleCtaClick}
              id="header-cta-btn"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-blue-500/50 rounded-full bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 font-mono text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 cursor-pointer"
            >
              <span>Vagas Abertas</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10">
        {/* Dobra 1: Hero */}
        <HeroSection onCtaClick={handleCtaClick} />

        {/* Dobra 2: Info Cards */}
        <InfoSection />

        {/* Dobra 3: Learning Tópicos */}
        <LearningSection />

        {/* Dobra 4: Formulário de Cadastro */}
        <SignupForm onSuccess={handleRegistrationSuccess} />
      </main>

      {/* Footer Area with Geometric Balance styling details */}
      <footer className="relative bg-[#050505] border-t border-white/5 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-5 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border border-blue-500 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500"></div>
              </div>
              <span className="font-display font-bold text-sm tracking-wider text-white uppercase ml-1">
                Capacitação<span className="text-blue-500">.</span>IA
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Inovando o desenvolvimento de equipes comerciais com inteligência artificial generativa aplicada de forma prática e escalável.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
            <span>© 2026 Capacitação.IA. Todos os direitos reservados.</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            <span>Workshop ao Vivo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
