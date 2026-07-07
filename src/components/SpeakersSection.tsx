import { motion } from "motion/react";
import { User, Sparkles, Award } from "lucide-react";

export default function SpeakersSection() {
  const speakers = [
    {
      name: "Marcelo Cerutti",
      role: "Treinador de vendas",
      description: "Especialista em capacitação de equipes de alta performance e metodologias ágeis de fechamento.",
      image: "/PALESTRANTE%201%20-%20CERUTTI%20-%20PALESTRANTE.png",
      badge: "Vendas"
    },
    {
      name: "Guilherme Tondatto",
      role: "Diretor de desenvolvimento",
      description: "Pioneiro na integração de IA Generativa e ferramentas de automação inteligente para processos comerciais.",
      image: "/PALESTRANTE%202%20-%20TONDATTO%20-%20PALESTRANTE.png",
      badge: "Inovação & IA"
    }
  ];

  return (
    <section id="palestrantes" className="relative py-24 px-6 bg-gradient-to-b from-[#040914] via-[#02050b] to-[#050505] overflow-hidden border-b border-white/10">
      {/* Premium background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:32px_32px] opacity-5 pointer-events-none" />
      
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight"
          >
            Palestrantes
          </motion.h2>
        </div>

        {/* Clean, high-contrast grid for the 2 speakers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative flex flex-col sm:flex-row items-center sm:items-center gap-8 p-8 sm:p-10 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.02] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Image Frame Container */}
              <div className="relative shrink-0 w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-md">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Visual gradient overlay on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                  {speaker.badge}
                </div>
              </div>

              {/* Speaker metadata */}
              <div className="flex-1 text-center sm:text-left py-2">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3.5xl font-bold text-white tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-300 transition-all duration-300">
                    {speaker.name}
                  </h3>
                  <p className="text-sm sm:text-base font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                    {speaker.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
