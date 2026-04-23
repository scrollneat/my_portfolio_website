import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "r") as f:
    content = f.read()

# 1. STRICT Typing Effect
# Replace old typingContainer and typingChild
old_typing_vars = """const text = "WELCOME TO MY NODE";

const typingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const typingChild = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};"""

new_typing_vars = """const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const letter = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };"""

content = content.replace(old_typing_vars, new_typing_vars)

# Replace the text rendering
old_render = """                    <motion.div 
                        className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex whitespace-pre"
                        variants={typingContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {text.split("").map((char, index) => <motion.span key={index} variants={typingChild}>{char}</motion.span>)}
                    </motion.div>"""

new_render = """                    <motion.div className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex whitespace-pre" variants={sentence} initial="hidden" animate="visible">{"WELCOME TO MY NODE".split("").map((char, index) => (<motion.span key={index} variants={letter}>{char}</motion.span>))}</motion.div>"""

content = content.replace(old_render, new_render)

# 2. STRICT SVG Path Drawing
old_svg_lines = """                        <motion.line 
                            x1="50" y1="50" x2="85" y2="15"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 4.0 }}
                        />
                        <motion.line 
                            x1="50" y1="50" x2="15" y2="85"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 4.0 }}
                        />"""

new_svg_lines = """                        <motion.line 
                            x1="50" y1="50" x2="85" y2="15"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                        />
                        <motion.line 
                            x1="50" y1="50" x2="15" y2="85"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                        />"""

content = content.replace(old_svg_lines, new_svg_lines)

# 3. STRICT Button Glare
old_button = """                    <motion.button 
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        variants={{ hover: { scale: 1.05 } }}
                        className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                    >
                        <motion.div 
                            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent -skew-x-12"
                            variants={{
                                hidden: { left: "-100%" },
                                hover: { left: "100%" }
                            }}
                            initial="hidden"
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ top: 0, bottom: 0 }}
                        />
                        <span className="relative z-10">VIEW PROJECTS</span>
                    </motion.button>"""

new_button = """                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                    >
                        <motion.div className="absolute top-0 bottom-0 w-8 bg-white/30 blur-[4px] -skew-x-12" initial={{ left: "-100%" }} whileHover={{ left: "200%" }} transition={{ duration: 0.6, ease: "easeInOut" }} />
                        <span className="relative z-10">VIEW PROJECTS</span>
                    </motion.button>"""

content = content.replace(old_button, new_button)

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "w") as f:
    f.write(content)

