import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import heroImg from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.03 AM (1).jpeg';

const Hero = () => {
  const stats = [
    { number: '250+', label: 'Projects Done' },
    { number: '150+', label: 'Clients' },
    { number: '15+', label: 'Years' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden bg-texture">
      {/* Background Blobs */}
      <div className="blob blob-gold w-[300px] h-[300px] -top-10 -right-10 opacity-20"></div>
      <div className="blob blob-accent w-[250px] h-[250px] bottom-0 -left-10 opacity-10"></div>

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 lg:w-12 h-[1px] bg-luxury-gold"></div>
              <span className="text-luxury-gold font-black tracking-[0.3em] uppercase text-[9px] lg:text-[10px]">
                Excellence in Architecture
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-black mb-4 lg:mb-6 leading-[1] text-charcoal">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-luxury-accent italic">Dreams</span> <br />
              Into Reality
            </h1>

            <p className="text-slate-500 text-sm md:text-base max-w-lg mb-6 lg:mb-8 leading-relaxed font-medium">
              Creating modern spaces with quality construction, innovation and trust. We don't just build structures; we craft environments for life.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 lg:mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 lg:px-8 lg:py-4 bg-charcoal text-white font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-charcoal/20 flex items-center gap-3"
              >
                Explore Projects <HiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 lg:px-8 lg:py-4 glass-luxury text-charcoal font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em] rounded-full border border-charcoal/5"
              >
                Contact Us
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:gap-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <h3 className="text-xl lg:text-2xl xl:text-3xl font-black text-charcoal mb-0.5 tracking-tighter">{stat.number}</h3>
                  <p className="text-slate-400 text-[8px] lg:text-[9px] uppercase tracking-widest font-black">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visuals (Layered) */}
          <div className="relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border-[8px] lg:border-[12px] border-white shadow-5xl relative group">
                <img 
                  src={heroImg} 
                  alt="Modern Architecture" 
                  className="w-full h-[300px] lg:h-[400px] xl:h-[450px] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 glass-luxury p-3 lg:p-5 rounded-2xl z-20 w-36 lg:w-44 shadow-2xl border-white/80"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold mb-2 lg:mb-3">
                  <span className="font-black text-sm lg:text-base">🏆</span>
                </div>
                <h4 className="font-black text-[9px] lg:text-[10px] text-charcoal uppercase tracking-widest mb-0.5">Top Rated</h4>
                <p className="text-[7px] lg:text-[8px] text-slate-500 font-bold">2025 Excellence Award</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 -right-4 lg:bottom-10 lg:-right-6 glass-luxury p-3 lg:p-5 rounded-2xl z-20 w-40 lg:w-48 shadow-2xl border-white/80"
              >
                <div className="flex -space-x-2 lg:-space-x-3 mb-2 lg:mb-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border-[2px] lg:border-3 border-white" />
                  ))}
                </div>
                <h4 className="font-black text-[9px] lg:text-[10px] text-charcoal uppercase tracking-widest mb-0.5">150+ Clients</h4>
                <p className="text-[7px] lg:text-[8px] text-slate-500 font-bold">Trusted by global leaders</p>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-4 left-6 lg:-bottom-6 lg:left-10 glass-gold p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] z-20 shadow-2xl border-luxury-gold/20"
              >
                <h2 className="text-4xl lg:text-6xl font-black text-luxury-gold tracking-tighter leading-none">15</h2>
                <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-luxury-gold mt-2">Years of Legacy</p>
                <p className="text-[8px] lg:text-[10px] font-bold text-luxury-gold/80 mt-1 uppercase">EST. 2010</p>
              </motion.div>
            </motion.div>

            {/* Decorative Geometric Shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-luxury-gold/10 rounded-[2.5rem] lg:rounded-[4rem] -z-10 rotate-6"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-charcoal/5 rounded-[2.5rem] lg:rounded-[4rem] -z-10 -rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
