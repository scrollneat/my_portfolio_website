import { useState } from 'react';

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

  return (
    <>
      <section className="flex-grow pt-[120px] pb-24 px-6 md:px-12 flex items-center justify-center bg-bg" id="connect">
          <div className="w-full max-w-2xl">
              {/* Terminal Style Header */}
              <div className="mb-12 border-l-4 border-primary pl-6">
                  <h1 className="text-4xl md:text-5xl font-mono text-primary font-bold tracking-tight mb-2">CONTACT_INTERFACE</h1>
                  <p className="font-mono text-on-surface-variant opacity-80">&gt; Initialize communication protocol...</p>
              </div>

              {/* Contact Form */}
              <form className={`space-y-10 transition-all duration-700 ${success ? 'shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-emerald-500/50 rounded-xl p-8 bg-emerald-500/5' : 'border border-transparent p-8'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Name Input */}
                      <div className="relative group">
                          <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono py-3 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="name" name="name" placeholder="NAME" type="text" value={formData.name} onChange={handleChange} />
                          <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="name">
                              &gt; NAME
                          </label>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group">
                          <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono py-3 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="email" name="email" placeholder="EMAIL_ADDRESS" type="email" value={formData.email} onChange={handleChange} />
                          <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="email">
                              &gt; EMAIL_ADDRESS
                          </label>
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                      </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                      <input className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono py-3 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent" id="subject" name="subject" placeholder="SUBJECT" type="text" value={formData.subject} onChange={handleChange} />
                      <label className="absolute left-0 -top-4 text-xs font-mono text-primary transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary" htmlFor="subject">
                          &gt; SUBJECT_LINE
                      </label>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary shadow-[0_0_8px_theme('colors.primary')] transition-all duration-300 peer-focus:w-full"></div>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                      <textarea className="peer w-full bg-transparent border-0 border-b border-outline text-on-surface font-mono py-3 px-0 focus:ring-0 focus:border-primary transition-all duration-300 placeholder-transparent resize-none" id="message" name="message" placeholder="MESSAGE_PAYLOAD" rows="4" value={formData.message} onChange={handleChange}></textarea>
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
                          className="group relative px-8 py-3 bg-surface-container-high border border-outline-variant hover:border-primary text-primary font-mono tracking-widest text-sm transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] disabled:opacity-50 disabled:hover:scale-100"
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
                                      [ TRANSMISSION_SUCCESS ]
                                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0"}}>check_circle</span>
                                  </>
                              ) : (
                                  <>
                                      [ SEND_MESSAGE ]
                                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 0"}}>arrow_forward</span>
                                  </>
                              )}
                          </span>
                      </button>
                  </div>
              </form>

              {/* Decorative terminal output block */}
              <div className="mt-16 p-4 bg-surface-container-lowest border border-surface-variant font-mono text-xs text-on-surface-variant/50 flex flex-col gap-1">
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
          </div>
      </section>

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
