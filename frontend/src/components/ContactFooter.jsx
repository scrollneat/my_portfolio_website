import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSending(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycby2WAuOXvtWnor8VdNigtKbMNZz6TVrqIh35T9mlU5BTR-GJckd_4vhZ-agz0nAgBLt/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

  return (
    <>
      <motion.section
          ref={sectionRef}
          className="flex-grow pt-[120px] pb-24 px-6 md:px-12 flex items-center justify-center bg-bg"
          id="connect"
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
          <div className="w-full max-w-2xl">
              {/* Terminal Style Header */}
              <div className="mb-12 border-l-4 border-primary pl-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-primary font-bold tracking-tight mb-2 break-words">GET_IN_TOUCH</h1>
                  <p className="font-mono text-on-surface-variant opacity-80">&gt; Initialize communication protocol...</p>
              </div>

              {/* Contact Form */}
              <form className={`space-y-10 transition-all duration-700 ${success ? 'shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-emerald-500/50 rounded-xl p-8 bg-emerald-500/5' : 'border border-transparent p-8'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Name Input */}
                      <div className="relative group">
                          <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono pb-2 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="name" name="name" placeholder="NAME" type="text" value={formData.name} onChange={handleChange} />
                          <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="name">
                              &gt; NAME
                          </label>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group">
                          <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono pb-2 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="email" name="email" placeholder="EMAIL_ADDRESS" type="email" value={formData.email} onChange={handleChange} />
                          <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="email">
                              &gt; EMAIL_ADDRESS
                          </label>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                      </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                      <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono pb-2 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="subject" name="subject" placeholder="SUBJECT" type="text" value={formData.subject} onChange={handleChange} />
                      <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="subject">
                          &gt; SUBJECT_LINE
                      </label>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                      <textarea className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono pb-2 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent resize-none" id="message" name="message" placeholder="MESSAGE_PAYLOAD" rows="4" value={formData.message} onChange={handleChange}></textarea>
                      <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="message">
                          &gt; MESSAGE_PAYLOAD
                      </label>
                      <div className="absolute bottom-[4px] left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                  </div>

                  {/* Submit Action Area */}
                  <div className="pt-6 flex justify-end">
                      <button 
                          type="button"
                          onClick={handleSendMessage}
                          disabled={isSending}
                          className="group relative px-8 py-3 bg-surface-container-high border border-outline-variant hover:border-primary text-primary font-mono tracking-widest text-xs md:text-sm transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] disabled:opacity-50 disabled:hover:scale-100"
                      >
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"></div>
                          <span className="relative z-10 flex items-center gap-2">
                              {isSending ? (
                                  <>
                                      [ SENDING... ]
                                      <span className="animate-spin material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0"}}>sync</span>
                                  </>
                              ) : success ? (
                                  <>
                                      <span className="whitespace-nowrap">[ TRANSMISSION_SUCCESS ]</span>
                                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0"}}>check_circle</span>
                                  </>
                              ) : (
                                  <>
                                      <span className="whitespace-nowrap">[ SEND_MESSAGE ]</span>
                                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0"}}>arrow_forward</span>
                                  </>
                              )}
                          </span>
                      </button>
                  </div>
              </form>

              {/* Decorative terminal output block */}
              <div className="mt-16 p-6 bg-zinc-950/50 border border-white/5 font-mono text-sm leading-relaxed text-on-surface-variant/70 flex flex-col gap-2 rounded-2xl">
                  <span>$ ping server.core_subsystem... OK</span>
                  <span>$ verifying end-to-end encryption... VERIFIED</span>
                  {success ? (
                      <span className="text-primary font-bold shadow-[0_0_8px_rgba(var(--primary),0.5)]">
                          &gt; CONNECTION STABLE... MESSAGE RECEIVED BY CORE.
                      </span>
                  ) : (
                      <span className="animate-pulse">$ waiting for input_stream...</span>
                  )}
              </div>

              {/* Task: Detailed Contact Information */}
               {/* Finalized Contact Information: Sleek Strip Layout */}
              <div className="mt-24 space-y-12 px-4 border-t border-white/5 pt-12">
                  <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/30"></div>
                      <h2 className="font-mono text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-primary uppercase font-bold break-words">Connect_With_Me</h2>
                      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/30"></div>
                  </div>

                  <div className="space-y-6">
                      {/* BASED_IN Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-white/5 group">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">location_on</span>
                            <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Location</span>
                          </div>
                          <span className="font-body text-lg text-white font-semibold break-words w-full">
                              40, Thiru vi ka street, M.G.R Nagar, Chennai - 600078, India.
                          </span>
                      </div>

                      {/* PHONE Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-white/5 group">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">call</span>
                            <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Phone</span>
                          </div>
                          <a href="tel:+918838449971" className="font-body text-lg text-white hover:text-primary transition-all font-semibold tracking-tight">
                              +91 88384 49971
                          </a>
                      </div>

                      {/* EMAIL Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-white/5 group">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">mail</span>
                            <span className="font-mono text-[10px] text-primary/50 tracking-widest uppercase min-w-[80px]">Email</span>
                          </div>
<a href="mailto:barathiselvanofficial@gmail.com" className="font-body text-lg text-white hover:text-primary transition-all font-semibold tracking-tight break-all">
                              barathiselvanofficial@gmail.com
                          </a>
                      </div>
                  </div>

                  {/* Compact Social Row: Neon Glass Style */}
                  <div className="flex justify-center items-center gap-6 pt-8">
                      <a 
                        href="https://www.linkedin.com/in/barathi-selvan-16377022a?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                        target="_blank" rel="noopener noreferrer"
                        className="bg-white/5 border border-white/10 p-3 rounded-2xl bg-[#0077B5]/10 border-[#0077B5]/30 drop-shadow-[0_0_10px_rgba(0,119,181,0.5)] text-[#0077B5] transition-all transform hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,119,181,0.8)]"
                        title="LinkedIn"
                      >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                      </a>

                      <a 
                        href="https://github.com/scrollneat/" 
                        target="_blank" rel="noopener noreferrer"
                        className="bg-white/5 border border-white/10 p-3 rounded-2xl bg-white/5 border-white/20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                        title="GitHub"
                      >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                      </a>

                      <a 
                        href="https://www.instagram.com/barathi_selvan?igsh=MWd1aGxjbXF5OG0ybw==" 
                        target="_blank" rel="noopener noreferrer"
                        className="bg-white/5 border border-white/10 p-3 rounded-2xl bg-[#E4405F]/10 border-[#E4405F]/30 drop-shadow-[0_0_10px_rgba(228,64,95,0.5)] text-[#E4405F] transition-all transform hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(228,64,95,0.8)]"
                        title="Instagram"
                      >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                      </a>
                  </div>
              </div>
          </div>

      </motion.section>

      {/* Footer (Shared Component) */}
      <footer className="w-full border-t border-zinc-900 dark:border-white/5 bg-zinc-950 dark:bg-black text-primary font-mono text-[10px] tracking-widest uppercase flex flex-col md:flex-row justify-between items-center py-12 px-10 gap-6 duration-500 transition-all z-10 relative">
          <div className="text-xs font-bold text-zinc-400 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-500 cursor-default">
              © 2024 CORE_SUBSYSTEM // ALL RIGHTS RESERVED
          </div>
          <div className="flex flex-wrap justify-center gap-8">
              <a className="text-zinc-600 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-500" href="#">LinkedIn</a>
              <a className="text-zinc-600 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-500" href="#">GitHub</a>
              <a className="text-zinc-600 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-500" href="#">Privacy</a>
              <a className="text-zinc-600 hover:text-primary hover:drop-shadow-[0_0_12px_rgba(var(--primary),0.8)] transition-all duration-500" href="#">Terms</a>
          </div>
      </footer>
    </>
  );
}
