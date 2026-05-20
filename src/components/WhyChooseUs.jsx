import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    { title: 'Quality Materials', icon: '💎', desc: 'Sourced from the finest global suppliers.' },
    { title: 'Expert Team', icon: '🎓', desc: 'Award-winning architects and engineers.' },
    { title: 'Modern Tech', icon: '⚡', desc: 'Using 3D modeling and smart building tools.' },
    { title: 'On-Time', icon: '⏱️', desc: 'Precision scheduling and timely delivery.' },
    { title: 'Trusted', icon: '🤝', desc: 'Building relationships since 2010.' },
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">
              Our Value Proposition
            </span>
            <h2 className="text-5xl font-black text-charcoal mb-8 tracking-tighter">
              Why Discerning <br /> Clients <span className="text-luxury-gold italic">Choose Us</span>
            </h2>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed">
              We specialize in the extraordinary. Our commitment to architectural purity and structural integrity makes us the preferred choice for premium builds.
            </p>
            
            <div className="flex gap-12">
              <div>
                <h3 className="text-4xl font-black text-charcoal tracking-tighter">150+</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Luxury Projects</p>
              </div>
              <div className="w-[1px] h-12 bg-slate-100"></div>
              <div>
                <h3 className="text-4xl font-black text-charcoal tracking-tighter">15+</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Awards</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass-luxury rounded-[2.5rem] border-white hover:border-luxury-gold/20 transition-all group"
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="font-black text-charcoal uppercase tracking-widest text-[11px] mb-2">{f.title}</h4>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
