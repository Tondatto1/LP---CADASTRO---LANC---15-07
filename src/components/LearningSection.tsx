import { motion } from "motion/react";
import { TrendingUp, Target, Repeat, Zap, Cpu, Check } from "lucide-react";

export default function LearningSection() {
  const topics = [
    {
      icon: TrendingUp,
      number: "01",
      title: "A mudança que já começou",
      description: "Por que a IA já está separando empresas que avançam das que vão ficar para trás."
    },
    {
      icon: Target,
      number: "02",
      title: "O gargalo comercial que o agro ainda não resolveu",
      description: "Enquanto o setor evoluiu em tecnologia, a ponta de capacitação continua presa a um modelo lento, caro e insuficiente."
    },
    {
      icon: Repeat,
      number: "03",
      title: "A dor que está travando resultado",
      description: "A nova geração é mais difícil de formar, e os gestores seguem perdendo tempo com dúvidas, correções e suporte operacional."
    },
    {
      icon: Zap,
      number: "04",
      title: "O que a prática nos mostrou",
      description: "Ao colocar o Ceruti Consultor em campo, ficou claro: o mercado não precisa de mais teoria, precisa de algo simples, rápido e aplicável."
    },
    {
      icon: Cpu,
      number: "05",
      title: "O lançamento exclusivo de um novo agente",
      description: "A resposta prática para transformar treinamento em presença contínua no campo, com apoio real para quem vende e para quem lidera."
    }
  ];

  return (
    <section id="modulos" className="relative py-24 px-6 bg-gradient-to-b from-[#040914] via-[#021812] to-[#020710] overflow-hidden border-b border-white/10">
      {/* High-End Tech Grid and Metallic Reflections */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none" />
      
      {/* Floating Metallic Glow Orbs */}
      <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-[5%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight"
          >
            Módulos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 font-sans mt-4 text-base sm:text-lg font-light max-w-2xl mx-auto"
          >
            Um cronograma estratégico para compreender o impacto real da Inteligência Artificial na capacitação comercial do agronegócio.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-16 pl-8 sm:pl-12">
          {/* Vertical Timeline Track with metallic emerald/teal gradient */}
          <div className="absolute left-[15px] sm:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-500/50 to-emerald-500/10 pointer-events-none" />

          <div className="space-y-12">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  {/* Timeline Node Point (glowing circle) */}
                  <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex items-center justify-center">
                    {/* Glowing outer aura */}
                    <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
                    
                    {/* Core node */}
                    <div className="relative w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)] group-hover:border-emerald-300 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300" />
                    </div>
                  </div>

                  {/* Card Content with elegant geometric border and dark glass design */}
                  <div className="relative p-6 sm:p-8 bg-white/[0.02] border border-white/5 rounded-lg hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.03)]">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center p-2 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-500/70 tracking-widest uppercase">
                          Módulo {topic.number}
                        </span>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400/80 font-mono">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Confirmado</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                      {topic.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                      {topic.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
