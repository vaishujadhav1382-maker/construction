import { motion } from 'framer-motion';

const team = [
  { name: 'Alex Sterling', role: 'Chief Architect', image: 'https://i.pravatar.cc/300?u=alex' },
  { name: 'Marcus Vane', role: 'Lead Engineer', image: 'https://i.pravatar.cc/300?u=marcus' },
  { name: 'Elena Rossi', role: 'Design Director', image: 'https://i.pravatar.cc/300?u=elena' },
];

const TeamPreview = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Our Visionaries
          </motion.span>
          <h2 className="text-5xl font-black text-charcoal tracking-tighter">
            The Minds Behind <br /> <span className="text-luxury-gold italic">The Masterpieces</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((m, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative mb-10">
                <img src={m.image} alt={m.name} className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Profile Card */}
              <motion.div
                whileHover={{ y: -10 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-luxury p-8 rounded-4xl w-[80%] text-center shadow-2xl border-white/80"
              >
                <h4 className="font-black text-charcoal uppercase tracking-widest text-sm mb-1">{m.name}</h4>
                <p className="text-[10px] text-luxury-gold font-black uppercase tracking-[0.2em]">{m.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
