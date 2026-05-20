import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

import imgHospital1 from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.02 AM.jpeg';
import imgVillaDaylight from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.03 AM (1).jpeg';
import imgVillaNight from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.03 AM (2).jpeg';
import imgVillaBW from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.03 AM.jpeg';
import imgDuplexPeople from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.04 AM.jpeg';
import imgVillaDusk1 from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.04 AM (1).jpeg';
import imgVillaDusk2 from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.04 AM (2).jpeg';
import imgVillaWood from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.04 AM (3).jpeg';
import imgVillaNadaf from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.04 AM (4).jpeg';
import imgVillaDusk3 from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.05 AM.jpeg';
import imgVillaGray from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.05 AM (1).jpeg';

const projects = [
  {
    title: 'Sai Seva Super Speciality Hospital',
    category: 'Commercial',
    image: imgHospital1
  },
  {
    title: 'Oak Signature Dusk Villa',
    category: 'Residential',
    image: imgVillaDusk3
  },
  {
    title: 'Oak Aesthetics Night Villa',
    category: 'Architecture',
    image: imgVillaNight
  },
  {
    title: 'Luxury Villa for Mr. Rasul Nadaf',
    category: 'Residential',
    image: imgVillaNadaf
  },
  {
    title: 'The Oak Duplex Residency',
    category: 'Residential',
    image: imgDuplexPeople
  },
  {
    title: 'Modernist Architectural Villa',
    category: 'Architecture',
    image: imgVillaDusk1
  },
  {
    title: 'Contemporary Gray Villa',
    category: 'Residential',
    image: imgVillaGray
  },
  {
    title: 'The Grand Daylight Villa',
    category: 'Residential',
    image: imgVillaDaylight
  },
  {
    title: 'Monochromatic Duplex',
    category: 'Residential',
    image: imgVillaBW
  },
  {
    title: 'Dusk Front Facing Villa',
    category: 'Residential',
    image: imgVillaDusk2
  },
  {
    title: 'Daylight Timber Villa',
    category: 'Architecture',
    image: imgVillaWood
  }
];

const duplicatedProjects = [...projects, ...projects];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="projects" className="section-padding bg-white overflow-hidden relative">
      {/* Custom Styles for Infinite Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .marquee-wrapper {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .marquee-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true }}
              className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
            >
              Curated Portfolio
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-black text-charcoal tracking-tighter">
              Architecture <br /> <span className="text-luxury-gold italic">Masterpieces</span>
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="px-12 py-5 bg-charcoal text-white font-black text-[10px] uppercase tracking-widest rounded-full cursor-pointer"
          >
            Explore All Projects
          </motion.button>
        </div>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="marquee-wrapper gap-8">
          {duplicatedProjects.map((project, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[3rem] shadow-xl w-[280px] md:w-[380px] h-[420px] md:h-[480px] flex-shrink-0 cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Luxury Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-luxury-gold font-black uppercase tracking-[0.3em] text-[8px] md:text-[9px] mb-3 transform opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-luxury-gold transition-colors duration-500 leading-tight">
                  {project.title}
                </h3>
                <div className="w-12 h-[2px] bg-luxury-gold opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></div>
              </div>

              {/* Action Button */}
              <div className="absolute top-8 right-8 md:top-10 md:right-10 w-12 h-12 md:w-14 md:h-14 glass-luxury rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                <span className="text-xl md:text-2xl">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Full-Screen Grid Modal of All Projects */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-[100] flex justify-center items-center p-4 md:p-10"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-luxury-beige rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-12 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-charcoal/5 flex items-center justify-center font-bold text-charcoal hover:bg-charcoal hover:text-white transition-colors cursor-pointer text-xl z-50"
              >
                <HiX />
              </button>

              {/* Title Block */}
              <div className="mb-10 text-center">
                <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[9px] mb-2 block">
                  Complete Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-charcoal tracking-tighter">
                  All Architecture <span className="text-luxury-gold italic">Masterpieces</span>
                </h2>
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-[2.5rem] shadow-lg h-[350px] cursor-default"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700"></div>

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-luxury-gold font-black uppercase tracking-[0.3em] text-[8px] mb-2 transform opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-luxury-gold transition-colors duration-500 leading-tight">
                        {project.title}
                      </h3>
                      <div className="w-10 h-[2px] bg-luxury-gold opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
