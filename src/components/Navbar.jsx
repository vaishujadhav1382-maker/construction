import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Services', to: 'services' },
    { name: 'Projects', to: 'projects' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Contact', to: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className={`container mx-auto px-6 md:px-12`}>
        <div className={`flex justify-between items-center transition-all duration-500 rounded-full px-8 ${
          scrolled ? 'glass-luxury py-4' : 'bg-transparent py-0'
        }`}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-16 h-16 overflow-hidden rounded-2xl shadow-xl border border-luxury-gold/20">
              <img src="/logo.jpeg" alt="OAK Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-outfit font-black tracking-tighter uppercase text-luxury-navy">
                OAK
              </span>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-luxury-gold mt-1">
                Constructions
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer text-charcoal/60 hover:text-luxury-gold transition-colors relative group"
                  activeClass="text-luxury-gold"
                >
                  {link.name}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-[2px] bg-luxury-gold"
                    whileHover={{ width: '100%' }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-charcoal text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-charcoal/10"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-3xl text-luxury-gold"
            >
              {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-luxury-cream z-40 flex flex-col lg:hidden"
          >
            {/* Close Button */}
            <div className="flex justify-end px-6 pt-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full glass-luxury flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all duration-300"
              >
                <HiX size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.06 }}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 py-3 group cursor-pointer"
                    activeClass="mobile-nav-active"
                  >
                    <span className="text-[10px] font-black text-luxury-gold/40 group-hover:text-luxury-gold transition-colors tracking-wider">
                      0{index + 1}
                    </span>
                    <span className="text-lg font-outfit font-black uppercase tracking-wide text-charcoal group-hover:text-luxury-gold transition-colors">
                      {link.name}
                    </span>
                    <div className="flex-1 h-[1px] bg-luxury-gold/10 group-hover:bg-luxury-gold/30 transition-colors"></div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="px-8 pb-10">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full bg-charcoal text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-charcoal/20 hover:bg-luxury-gold transition-colors duration-500 cursor-pointer"
                >
                  Get In Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
