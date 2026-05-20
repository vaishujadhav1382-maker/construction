import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const contactItems = [
  { icon: HiPhone, title: 'Direct Line', val: '+91 7020624800' },
  { icon: HiPhone, title: 'Secondary', val: '+91 7770007313' },
  { icon: HiMail, title: 'Email', val: 'oves15141@gmail.com' },
  { icon: HiLocationMarker, title: 'Studio', val: 'OAK Constructions, Design & Execution Studio' },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const house = String.fromCodePoint(0x1F3E0);
    const sparkles = String.fromCodePoint(0x2728);
    const person = String.fromCodePoint(0x1F64B);
    const envelope = String.fromCodePoint(0x1F4E9);
    const memo = String.fromCodePoint(0x1F4DD);
    const globe = String.fromCodePoint(0x1F310);
    const phone = String.fromCodePoint(0x1F4DE);

    const whatsappMessage = `${house} *OAK Constructions*
${sparkles} *New Inquiry Received!*
----------------------------------------

${person} *Name:* ${name}
${envelope} *Email:* ${email}

${memo} *Message:*
${message}

----------------------------------------
${globe} _Sent via OAK Constructions Website_
${phone} _We will get back to you shortly!_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917020181674?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Clear form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="bg-white relative overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Subtle background blob */}
      <div className="blob blob-gold w-80 h-80 -top-16 -right-16 opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-luxury-gold font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-charcoal tracking-tighter leading-tight">
            Let's Build Your <br className="sm:hidden" /><span className="text-luxury-gold italic">Next Legacy</span>
          </h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto mt-4 opacity-30"></div>
        </div>

        {/* Contact Cards — 2x2 grid on mobile, 4-col on large */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-8">
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-luxury px-3 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 group hover:border-luxury-gold/30 transition-all"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-luxury-gold/10 rounded-lg sm:rounded-xl flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-all duration-400">
                <item.icon size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.title}</h4>
                <p className="text-charcoal font-bold text-[11px] sm:text-sm leading-tight break-words">{item.val}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-luxury p-5 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border-white/80 shadow-2xl max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-charcoal/5 border-none rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none transition-all placeholder:text-slate-300 font-bold text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-charcoal/5 border-none rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none transition-all placeholder:text-slate-300 font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Your Vision</label>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your architectural dream..."
                required
                className="w-full bg-charcoal/5 border-none rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none transition-all placeholder:text-slate-300 font-bold text-sm resize-none"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-charcoal text-white font-black py-3.5 sm:py-4 rounded-xl sm:rounded-2xl uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl shadow-charcoal/20 cursor-pointer"
            >
              Initiate Conversation
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
