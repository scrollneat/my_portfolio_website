import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "r") as f:
    content = f.read()

# 1. Delete sentence and letter variants
content = content.replace("const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };\nconst letter = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };\n", "")

# Replace the eyebrow text
old_eyebrow = """                    <motion.div className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex whitespace-pre" variants={sentence} initial="hidden" animate="visible">{"WELCOME TO MY NODE".split("").map((char, index) => (<motion.span key={index} variants={letter}>{char}</motion.span>))}</motion.div>"""

new_eyebrow = """                    <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex whitespace-pre">
                        {"WELCOME TO MY NODE".split("").map((char, i) => <motion.span key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i * 0.05}}>{char}</motion.span>)}
                    </div>"""

content = content.replace(old_eyebrow, new_eyebrow)

# 2. Replace the button glare
old_button = """                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                    >
                        <motion.div className="absolute top-0 bottom-0 w-8 bg-white/30 blur-[4px] -skew-x-12" initial={{ left: "-100%" }} whileHover={{ left: "200%" }} transition={{ duration: 0.6, ease: "easeInOut" }} />
                        <span className="relative z-10">VIEW PROJECTS</span>
                    </motion.button>"""

new_button = """                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                    >
                        <motion.div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" initial={{ left: "-100%" }} whileHover={{ left: "200%" }} transition={{ duration: 0.7 }} />
                        <span className="relative z-10">VIEW PROJECTS</span>
                    </motion.button>"""

content = content.replace(old_button, new_button)

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "w") as f:
    f.write(content)
