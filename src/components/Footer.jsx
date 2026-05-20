import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-charcoal pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 overflow-hidden rounded-2xl shadow-xl border border-white/10">
                <img src="/logo.jpeg" alt="OAK Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-outfit font-black tracking-tighter uppercase text-white">
                OAK<span className="text-luxury-gold text-sm ml-2">Constructions</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              Designing Aesthetics & Ergonomics since 2010. Led by Er. Ovez Arif Kapshikar, delivering elite construction solutions.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-luxury-gold hover:text-white transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black mb-6 border-l-4 border-luxury-gold pl-4 uppercase tracking-[0.2em] text-white">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#home" className="hover:text-luxury-gold transition-colors">Home Studio</a></li>
              <li><a href="#about" className="hover:text-luxury-gold transition-colors">Our Legacy</a></li>
              <li><a href="#projects" className="hover:text-luxury-gold transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-luxury-gold transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-luxury-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-black mb-6 border-l-4 border-luxury-gold pl-4 uppercase tracking-[0.2em] text-white">Our Expertise</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Commercial</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Residential</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Architecture</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Interior Design</a></li>
              <li><a href="#services" className="hover:text-luxury-gold transition-colors">Renovation</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] font-black mb-6 border-l-4 border-luxury-gold pl-4 uppercase tracking-[0.2em] text-white">Consultation</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-luxury-gold text-xl mt-1 shrink-0" />
                <span>OAK Constructions,<br />Design & Execution Studio</span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-luxury-gold text-xl shrink-0" />
                <span>+91 7020624800</span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-luxury-gold text-xl shrink-0" />
                <span>oves15141@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-[9px] uppercase tracking-[0.4em] font-black">
          <p>© {new Date().getFullYear()} OAK Constructions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
