import { motion } from 'framer-motion';
import aboutImg from '../assets/projects-img/WhatsApp Image 2026-05-18 at 10.44.03 AM (2).jpeg';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-luxury-beige/50 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Asymmetrical Image Layout */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 rounded-[5rem] overflow-hidden shadow-2xl border-[12px] border-luxury-beige"
            >
              <img 
                src={aboutImg} 
                alt="OAK Constructions" 
                className="w-full h-[650px] object-cover hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
            
            {/* Overlay Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 glass-luxury p-10 rounded-[3rem] z-20 max-w-xs shadow-2xl"
            >
              <div className="text-4xl font-black text-luxury-gold mb-2 tracking-tighter">98%</div>
              <p className="text-sm font-bold text-charcoal leading-relaxed">
                Client satisfaction rate over a decade of luxury projects.
              </p>
            </motion.div>

            {/* Decorative Grid Pattern */}
            <div className="absolute top-10 -left-10 w-40 h-40 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(circle, #D4AF37 2px, transparent 2px)', 
              backgroundSize: '20px 20px' 
            }}></div>
          </div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-luxury-gold"></div>
              <span className="text-luxury-gold font-black tracking-[0.3em] uppercase text-[10px]">
                About Our Legacy
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-10 leading-tight text-luxury-navy">
              Designing <br />
              <span className="text-luxury-gold italic">Aesthetics &</span> <br />
              Ergonomics
            </h2>

            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
              Led by <span className="text-luxury-navy font-black">Er. Ovez Arif Kapshikar</span>, OAK Constructions is a premier Civil Contracting and Engineering firm. Since 2010, we have been delivering exceptional architectural solutions that blend visual beauty with ergonomic functionality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 glass-luxury rounded-4xl hover:border-luxury-gold/30 transition-all group">
                <h4 className="font-black text-charcoal uppercase tracking-widest text-xs mb-4">Our Vision</h4>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                  To set new benchmarks in sustainable luxury and innovative structural design.
                </p>
              </div>
              <div className="p-8 glass-luxury rounded-4xl hover:border-luxury-gold/30 transition-all group">
                <h4 className="font-black text-charcoal uppercase tracking-widest text-xs mb-4">Our Commitment</h4>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                  Uncompromising quality, transparency, and timely delivery of complex projects.
                </p>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
