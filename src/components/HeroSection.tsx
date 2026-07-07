import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Lightfall from "./Lightfall";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 py-24 text-center overflow-hidden border-b border-white/10">
      {/* Lightfall dynamic background effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Lightfall
          colors={['#10b981', '#047857', '#3b82f6']}
          backgroundColor="#020617"
          speed={0.3}
          streakCount={3}
          streakWidth={1.2}
          streakLength={1.5}
          glow={1.0}
          density={0.5}
          twinkle={0.8}
          zoom={2.2}
          backgroundGlow={0.3}
          opacity={1.0}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={1.5}
        />
      </div>

      {/* Decorative High-End Ambient Lighting & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      
      {/* Metallic Blue Glow Spots matching design spec */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge / Selo Visual exactly matching spec */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full bg-white/[0.02] text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold mb-8 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
        >
          <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
          <span>100% Online</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span>Gratuito</span>
        </motion.div>

        {/* Headline Forte with geometric focus */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6.5xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          Como a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">IA</span> pode <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">capacitar</span> seus vendedores e liberar seus gestores para o que <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">realmente</span> importa.
        </motion.h1>

        {/* Subheadline Explicativa */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Nesta live fechada, você vai descobrir como a IA pode fazer seus vendedores <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">venderem</span> mais e <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">desafogar</span> seus gestores do <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 font-semibold">operacional</span>.
        </motion.p>

        {/* CTA Principal with solid Geometric aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={onCtaClick}
            id="hero-cta-btn"
            className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/30 uppercase tracking-widest text-xs flex items-center gap-3 cursor-pointer overflow-hidden active:scale-98"
          >
            <span>Confirmar presença</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>


      </div>
    </section>
  );
}
