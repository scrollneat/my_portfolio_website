import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "r") as f:
    content = f.read()

# 1. Add blurVariants and eyebrowText
variants_addition = """const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const blurVariants = {
  hidden: { filter: 'blur(12px)', opacity: 0, y: 30 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const eyebrowText = "WELCOME TO MY NODE".split("");"""

content = content.replace("""const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};""", variants_addition)

# 2. Update Eyebrow and Name
old_eyebrow = """                    <motion.p variants={itemVariants} className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400">WELCOME TO MY NODE</motion.p>
                    <motion.h1 variants={itemVariants} className="font-display font-black text-on-surface tracking-tighter leading-[1.1]">
                        <span className="text-4xl md:text-5xl lg:text-6xl text-on-surface">Hi, I'm</span><br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500" style={{ whiteSpace: "nowrap", fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>Barathiselvan.</span>
                    </motion.h1>"""

new_eyebrow = """                    <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex">
                        {eyebrowText.map((char, index) => (
                            <motion.span 
                                key={index} 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.1, delay: 0.5 + index * 0.05 }}
                            >
                                {char === " " ? "\\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>
                    <motion.h1 variants={blurVariants} className="font-display font-black text-on-surface tracking-tighter leading-[1.1]">
                        <span className="text-4xl md:text-5xl lg:text-6xl text-on-surface">Hi, I'm</span><br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500" style={{ whiteSpace: "nowrap", fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>Barathiselvan.</span>
                    </motion.h1>"""

content = content.replace(old_eyebrow, new_eyebrow)

# 3. Update 3D cluster animation
old_cluster = """            <motion.div 
                className="col-span-1 lg:col-span-5 flex items-center justify-center relative [perspective:2000px]"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            >"""

new_cluster = """            <motion.div 
                className="col-span-1 lg:col-span-5 flex items-center justify-center relative [perspective:2000px]"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 1.2 }}
            >"""

content = content.replace(old_cluster, new_cluster)

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "w") as f:
    f.write(content)
