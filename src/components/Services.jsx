import { motion } from 'framer-motion';
import { 
  HiOfficeBuilding, HiHome, HiTruck, HiPencilAlt, 
  HiLightningBolt, HiColorSwatch, HiCog, HiCollection 
} from 'react-icons/hi';

const services = [
  { icon: HiOfficeBuilding, title: 'Commercial', desc: 'Elite office spaces and industrial structures.' },
  { icon: HiHome, title: 'Residential', desc: 'Luxury villas and modern housing communities.' },
  { icon: HiPencilAlt, title: 'Architecture', desc: 'Innovative blueprints and conceptual designs.' },
  { icon: HiTruck, title: 'Construction', desc: 'End-to-end premium construction services.' },
  { icon: HiLightningBolt, title: 'Civil Work', desc: 'Specialized foundational engineering systems.' },
  { icon: HiColorSwatch, title: 'Interior Design', desc: 'Sophisticated decor and functional layouts.' },
  { icon: HiCog, title: 'Management', desc: 'Expert supervision from concept to completion.' },
  { icon: HiCollection, title: 'Renovation', desc: 'Revitalizing structures with modern upgrades.' },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-luxury-beige relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-6 block"
          >
            Bespoke Services
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-charcoal tracking-tighter">
            Crafting Excellence <br /> In Every Detail
          </h2>
          <div className="w-20 h-[2px] bg-luxury-gold mx-auto opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-luxury p-10 rounded-[3rem] group relative overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-luxury-gold/5 ${
                i % 2 !== 0 ? 'lg:translate-y-12' : ''
              }`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700 shadow-sm transform group-hover:rotate-12">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-black mb-4 text-charcoal group-hover:text-luxury-gold transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 opacity-80">
                  {service.desc}
                </p>
                <div className="w-12 h-[1px] bg-luxury-gold/20 group-hover:w-full transition-all duration-700"></div>
              </div>

              {/* Decorative Number */}
              <span className="absolute -bottom-4 -right-2 text-6xl font-black text-charcoal/5 group-hover:text-luxury-gold/5 transition-colors">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
