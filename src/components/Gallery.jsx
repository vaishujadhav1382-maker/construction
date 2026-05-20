import { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=600',
];

const MOBILE_INITIAL_COUNT = 4;

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Visual Chronicles
          </motion.span>
          <h2 className="text-5xl font-black text-charcoal tracking-tighter">
            Architectural <span className="text-luxury-gold italic">Perspectives</span>
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {images.map((img, i) => {
            // On mobile (single column), hide items beyond MOBILE_INITIAL_COUNT unless expanded
            const isHiddenOnMobile = !showAll && i >= MOBILE_INITIAL_COUNT;

            return (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-[3rem] break-inside-avoid shadow-luxury border border-charcoal/5 ${
                  isHiddenOnMobile ? 'hidden sm:block' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 rounded-[3rem]"
                />

                {/* Luxury Hover Overlay */}
                <div className="absolute inset-0 bg-luxury-gold/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <div className="text-white text-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl font-black">+</span>
                    </div>
                    <p className="font-black uppercase tracking-[0.3em] text-[9px]">Enlarge Visual</p>
                  </div>
                </div>

                {/* Glass Tag */}
                <div className="absolute bottom-6 left-6 glass-luxury px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="text-[9px] font-black uppercase tracking-widest text-charcoal">Project Alpha</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More / View Less Button - only visible on mobile */}
        {images.length > MOBILE_INITIAL_COUNT && (
          <div className="flex justify-center mt-12 sm:hidden">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full glass-luxury border border-luxury-gold/20 hover:border-luxury-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-luxury-gold/10"
            >
              <span className="text-xs font-black uppercase tracking-[0.25em] text-charcoal group-hover:text-luxury-gold transition-colors">
                {showAll ? 'View Less' : 'View More'}
              </span>
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-luxury-gold text-lg"
              >
                ↓
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
