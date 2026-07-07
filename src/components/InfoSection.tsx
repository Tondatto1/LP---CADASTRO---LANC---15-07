import { motion } from "motion/react";
import { Calendar, Clock, Globe, Video } from "lucide-react";

export default function InfoSection() {
  const items = [
    {
      icon: Calendar,
      label: "Data",
      value: "15 de Julho de 2026",
      subtext: "Quarta-feira",
      highlight: true,
    },
    {
      icon: Clock,
      label: "Horário",
      value: "08h às 09h30",
      subtext: "Horário de Brasília",
      highlight: false,
    },
    {
      icon: Globe,
      label: "Formato",
      value: "100% Online",
      subtext: "Transmissão ao Vivo",
      highlight: false,
    },
    {
      icon: Video,
      label: "Plataforma",
      value: "Google Meet",
      subtext: "Link direto pós-cadastro",
      highlight: false,
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#020a16] via-[#011c13] to-[#040914] overflow-hidden border-b border-white/10">
      {/* High-End Tech Grid and Metallic Reflections */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none" />
      
      {/* Glowing Sophisticated Metallic Orbs */}
      <div className="absolute -top-[10%] left-[5%] w-[450px] h-[450px] bg-emerald-500/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-[10%] right-[5%] w-[450px] h-[450px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Decorative Diagonal Metallic Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-blue-500/30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-[48px] font-display font-semibold text-white tracking-tight"
          >
            Programação
          </motion.h2>
        </div>

        {/* 4-Column Responsive Grid with Sophisticated Metallic Card Styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                id={`info-card-${index}`}
                className={`relative p-6 rounded-lg border transition-all duration-300 backdrop-blur-md ${
                  item.label === "Formato"
                    ? "bg-[#091510]/40 border-emerald-500/30 shadow-[0_4px_30px_rgba(16,185,129,0.08)] hover:border-emerald-400/50"
                    : item.highlight
                      ? "bg-[#080f1a]/40 border-blue-500/30 shadow-[0_4px_30px_rgba(59,130,246,0.1)] hover:border-blue-400/50"
                      : "bg-[#06070a]/80 border-white/5 hover:border-white/15 hover:bg-white/[0.02]"
                }`}
              >
                {/* Metallic Glow Corner Decor */}
                <div className={`absolute top-0 right-0 w-8 h-8 rounded-tr-lg pointer-events-none bg-gradient-to-br ${
                  item.label === "Formato" ? "from-emerald-400/10 to-transparent" : "from-blue-400/10 to-transparent"
                }`} />

                {/* Card Icon Header */}
                <div className={`mb-5 inline-flex items-center justify-center p-2.5 rounded-lg border ${
                  item.label === "Formato"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Card Content with Geometric Typography */}
                <span className={`block text-[10px] uppercase tracking-widest mb-1.5 font-mono font-semibold ${
                  item.label === "Formato" ? "text-emerald-400" : "text-blue-400"
                }`}>
                  {item.label}
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-light flex items-center gap-1.5">
                  {item.label === "Formato" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  )}
                  {item.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
