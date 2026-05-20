import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WorkingProcess from './components/WorkingProcess';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-luxury-beige flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <div className="w-32 h-32 overflow-hidden rounded-[2.5rem] shadow-2xl border-2 border-luxury-gold/30">
        <img src="/logo.jpeg" alt="OAK Logo" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-7xl font-outfit font-black tracking-tighter uppercase text-luxury-navy">
          OAK
        </span>
        <span className="text-sm font-black tracking-[0.4em] uppercase text-luxury-gold mt-2">
          Constructions
        </span>
      </div>
    </motion.div>

    <div className="w-64 h-[1px] bg-charcoal/5 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full bg-luxury-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]"
      />
    </div>
    <p className="mt-6 text-luxury-gold font-black tracking-[0.4em] uppercase text-[9px]">Architecting Your Future</p>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative selection:bg-luxury-gold selection:text-white">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <WorkingProcess />
            <Projects />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </div>
  );
}

export default App;
