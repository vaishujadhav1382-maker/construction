import { motion } from 'framer-motion';

const WorkingProcess = () => {
  const steps = [
    { title: 'Planning', desc: 'Concept and strategy development.' },
    { title: 'Design', desc: 'Architectural blueprints and 3D.' },
    { title: 'Build', desc: 'Precision construction and assembly.' },
    { title: 'Inspect', desc: 'Rigorous quality check and testing.' },
    { title: 'Deliver', desc: 'Final handover and excellence.' },
  ];

  return (
    <section className="section-padding bg-luxury-beige relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Our Methodology
          </motion.span>
          <h2 className="text-5xl font-black text-charcoal tracking-tighter">
            The Luxury <span className="text-luxury-gold italic">Lifecycle</span>
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-4 px-10">
          {/* Animated Curved Line (CSS Based) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-luxury-gold/10 -z-10 hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full h-full bg-luxury-gold origin-left shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center max-w-[200px]"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-luxury-gold font-black text-xl shadow-xl border border-luxury-gold/10 mb-8 relative z-10 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-500">
                0{i + 1}
                {/* Floating Ring */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-luxury-gold/30 -m-2"
                />
              </div>
              <h4 className="font-black text-charcoal uppercase tracking-[0.2em] text-[11px] mb-2">{step.title}</h4>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
