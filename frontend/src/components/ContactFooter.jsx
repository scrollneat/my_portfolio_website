import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ResponsiveHeader } from './ResponsiveHeader';

// Robust SVG Icons to avoid dependency-related build failures
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export default function ContactFooter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const formData = new FormData(e.target);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz2pYcZwJRvfc0dinPmNITDksuktRmzTFP2zMuMVVCwxveNis0R9gfib6uOXx8nmrd_/exec';

    try {
      // Using no-cors mode as Apps Script often doesn't handle OPTIONS preflight well
      // but still allows the data to reach the spreadsheet.
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setFormStatus('sent');
      e.target.reset(); // Clear form after success
    } catch (error) {
      console.error('Submission Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <footer id="connect" className="relative bg-bg pt-24 pb-12 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Branding & Message */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary mb-2">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="font-mono text-xs tracking-[0.3em] font-bold uppercase">System_Entry</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono text-primary font-bold tracking-tight mb-2">
                <ResponsiveHeader title="GET_IN_TOUCH" />
              </h1>
              <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-md">
                Have a project in mind or just want to chat about data architecture? Drop a message and let's build something exceptional.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-primary/50 tracking-widest uppercase">Email</p>
                  <a href="mailto:barathiselvanofficial@gmail.com" className="font-body text-white font-semibold text-sm sm:text-base break-all hover:text-primary transition-colors cursor-pointer">
                    barathiselvanofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-primary/50 tracking-widest uppercase">Phone</p>
                  <a href="tel:+918838449971" className="font-body text-white font-semibold hover:text-primary transition-colors cursor-pointer">
                    +91 88384 49971
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Reverted Terminal Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative p-8 rounded-2xl border transition-all duration-500 ${
              formStatus === 'sent' 
                ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : formStatus === 'error'
                ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'border-white/10 bg-[#050505]/50 backdrop-blur-sm'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div className="group relative">
                  <label className="block font-mono text-sm md:text-base font-semibold text-primary tracking-[0.2em] uppercase mb-3 ml-1 opacity-70">
                    {">"} NAME
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    className="w-full bg-transparent border-b border-white/10 py-3 px-1 font-mono text-white focus:outline-none focus:border-primary focus:shadow-[0_4px_15px_-3px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 pb-2"
                    required
                  />
                </div>
 
                <div className="group relative">
                  <label className="block font-mono text-sm md:text-base font-semibold text-primary tracking-[0.2em] uppercase mb-3 ml-1 opacity-70">
                    {">"} EMAIL_ADDRESS
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full bg-transparent border-b border-white/10 py-3 px-1 font-mono text-white focus:outline-none focus:border-primary focus:shadow-[0_4px_15px_-3px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 pb-2"
                    required
                  />
                </div>
 
                <div className="group relative">
                  <label className="block font-mono text-sm md:text-base font-semibold text-primary tracking-[0.2em] uppercase mb-3 ml-1 opacity-70">
                    {">"} SUBJECT_LINE
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    className="w-full bg-transparent border-b border-white/10 py-3 px-1 font-mono text-white focus:outline-none focus:border-primary focus:shadow-[0_4px_15px_-3px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 pb-2"
                    required
                  />
                </div>
 
                <div className="group relative">
                  <label className="block font-mono text-sm md:text-base font-semibold text-primary tracking-[0.2em] uppercase mb-3 ml-1 opacity-70">
                    {">"} MESSAGE_PAYLOAD
                  </label>
                  <textarea 
                    rows="4"
                    name="message"
                    className="w-full bg-transparent border-b border-white/10 py-3 px-1 font-mono text-white focus:outline-none focus:border-primary focus:shadow-[0_4px_15px_-3px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 resize-none pb-2"
                    required
                  ></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus !== 'idle'}
                className={`w-full py-5 font-mono text-xs tracking-[0.3em] font-bold uppercase flex items-center justify-center gap-3 transition-all duration-300 ${
                  formStatus === 'sent' 
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                    : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary'
                }`}
              >
                {formStatus === 'idle' ? (
                  <>
                    <span className="whitespace-nowrap tracking-normal md:tracking-wider text-xs sm:text-sm">[ SEND_MESSAGE ]</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                ) : formStatus === 'sending' ? (
                  <span className="animate-pulse tracking-normal md:tracking-wider text-xs sm:text-sm">Processing_Payload...</span>
                ) : (
                  <>
                    <span className="whitespace-nowrap tracking-normal md:tracking-wider text-xs sm:text-sm">Message_Transmitted!</span>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Simulated Terminal Logs */}
            {formStatus === 'sent' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xs md:text-sm font-mono text-gray-400 whitespace-pre-wrap break-words border-t border-white/5 pt-4"
              >
                <div className="flex gap-2">
                  <span className="text-emerald-500">$</span>
                  <span>ping server.core_subsystem... OK</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-500">$</span>
                  <span>verifying end-to-end encryption... VERIFIED</span>
                </div>
                <div className="flex gap-2 text-emerald-400 font-bold mt-2">
                  <span>{">"} CONNECTION STABLE... MESSAGE RECEIVED BY CORE.</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 space-y-12 px-4 border-t border-white/5 pt-12">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/30"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">
              <ResponsiveHeader title="CONNECT_WITH_ME" />
            </h2>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Location</span>
              </div>
              <span className="font-body text-lg text-white font-semibold break-words w-full">
                40, Thiru vi ka street, M.G.R Nagar, Chennai - 600078, India.
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">share</span>
                <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Socials</span>
              </div>
              <div className="flex gap-4">
                {[
                  { 
                    icon: <LinkedinIcon />, 
                    href: "https://www.linkedin.com/in/barathi-selvan-16377022a",
                    color: "text-[#0077B5] border-[#0077B5]/50 shadow-[0_0_15px_rgba(0,119,181,0.5)]" 
                  },
                  { 
                    icon: <GithubIcon />, 
                    href: "https://github.com/scrollneat",
                    color: "text-white border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                  },
                  { 
                    icon: <InstagramIcon />, 
                    href: "https://www.instagram.com/barathi_selvan?igsh=MWd1aGxjbXF5OG0ybw==",
                    color: "text-[#E1306C] border-[#E1306C]/50 shadow-[0_0_15px_rgba(225,48,108,0.5)]" 
                  }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border hover:bg-white/10 hover:scale-110 transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Status</span>
              </div>
              <p className="font-mono text-xs text-white/40 leading-relaxed">
                © {new Date().getFullYear()} Barathiselvan T R.<br />
                Crafted with Framer Motion & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
