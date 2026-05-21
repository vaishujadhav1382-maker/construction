import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const reviewsRef = ref(database, 'reviews');
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTestimonials(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
      } else {
        setTestimonials([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section-padding bg-luxury-beige relative overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Client Narratives
          </motion.span>
          <h2 className="text-5xl font-black text-charcoal tracking-tighter">
            Trusted by <br /> <span className="text-luxury-gold italic">Global Visionaries</span>
          </h2>
          <div className="mt-12 text-gray-400 font-bold tracking-widest uppercase">No reviews yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-luxury-beige relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="blob blob-gold w-96 h-96 top-1/2 left-0 -translate-y-1/2 opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Client Narratives
          </motion.span>
          <h2 className="text-5xl font-black text-charcoal tracking-tighter">
            Trusted by <br /> <span className="text-luxury-gold italic">Global Visionaries</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="glass-luxury p-12 md:p-20 rounded-[4rem] text-center relative border-white/60 shadow-2xl w-full">
                <FaQuoteLeft className="absolute top-12 left-12 text-luxury-gold/10 text-8xl" />
                
                <div className="flex justify-center gap-2 mb-10">
                  {[...Array(testimonials[index]?.rating || 5)].map((_, i) => (
                    <FaStar key={i} className="text-luxury-gold" />
                  ))}
                </div>

                <p className="text-2xl md:text-3xl text-charcoal font-medium italic mb-12 leading-relaxed tracking-tight">
                  "{testimonials[index]?.message}"
                </p>

                <div className="flex items-center justify-center gap-6">
                  {testimonials[index]?.image && (
                    <div className="relative">
                      <img 
                        src={testimonials[index]?.image} 
                        alt={testimonials[index]?.name} 
                        className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-luxury-gold/30 -m-2 animate-pulse"></div>
                    </div>
                  )}
                  <div className="text-left">
                    <h4 className="font-black text-charcoal text-xl tracking-tight">{testimonials[index]?.name}</h4>
                    <p className="text-luxury-gold text-[10px] font-black uppercase tracking-[0.3em]">{testimonials[index]?.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === i ? 'bg-luxury-gold w-16' : 'bg-charcoal/5 w-4 hover:bg-charcoal/10'
                  }`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
