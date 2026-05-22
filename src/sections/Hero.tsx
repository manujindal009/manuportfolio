import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../utils/utils';

const TITLES = [
    "Software Engineer",
    "Full Stack Developer",
    "Problem Solver"
];

export function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!titleRef.current) return;
            const rect = titleRef.current.getBoundingClientRect();
            // Calculate mouse position relative to the center of the text
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Invert coordinates for a light-source shadow effect
            const shadowX = -x * 0.05;
            const shadowY = -y * 0.05;

            titleRef.current.style.setProperty('--shadow-x', `${shadowX}px`);
            titleRef.current.style.setProperty('--shadow-y', `${shadowY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % TITLES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleDownloadResume = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/Resume.pdf');
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Manu_Jindal_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download resume:', error);
            // Fallback: open directly in a new tab
            const fallbackLink = document.createElement('a');
            fallbackLink.href = '/Resume.pdf';
            fallbackLink.target = '_blank';
            fallbackLink.click();
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">

            {/* Animated Background Gradients & Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] mix-blend-screen" />
                {/* Micro-grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center md:text-left flex flex-col lg:flex-row items-center justify-between gap-16 py-12">

                <div className="flex-1 w-full flex flex-col items-center md:items-start space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                            Welcome to my Portfolio
                        </span>
                    </motion.div>

                    <div className="space-y-4 max-w-2xl text-center md:text-left">
                        <motion.h1
                            ref={titleRef as any}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text-primary"
                            style={{
                                textShadow: 'var(--shadow-x, 0px) var(--shadow-y, 0px) 30px var(--accent-primary)',
                                transition: 'text-shadow 0.1s ease-out'
                            }}
                        >
                            Hi, I'm <span className="text-accent-primary relative inline-block">Manu Jindal</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="h-14 sm:h-20 flex items-center justify-center md:justify-start"
                        >
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={titleIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary"
                                >
                                    {TITLES[titleIndex]}
                                </motion.h2>
                            </AnimatePresence>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto md:mx-0 leading-relaxed"
                        >
                            Computer Science Engineering student focused on building scalable and high-performance applications.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col w-full items-center md:items-start space-y-6"
                    >
                        {/* Primary Buttons Row */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                            <button
                                onClick={() => scrollToSection('projects')}
                                className={cn(
                                    "px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3",
                                    "bg-[#00f3ff] text-black transition-all duration-300",
                                    "shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.7)]",
                                    "hover:scale-105 active:scale-95 hover-trigger uppercase text-xs tracking-widest font-mono"
                                )}
                            >
                                View Projects
                                <ChevronRight size={18} className="stroke-[3]" />
                            </button>

                            <button
                                onClick={() => scrollToSection('contact')}
                                className={cn(
                                    "px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3",
                                    "bg-transparent border border-border-color text-text-primary transition-all duration-300",
                                    "hover:border-accent-primary hover:bg-accent-primary/5",
                                    "hover:scale-105 active:scale-95 hover-trigger uppercase text-xs tracking-widest font-mono"
                                )}
                            >
                                Contact Me
                            </button>
                        </div>

                        {/* Professional Resume buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
                            <a
                                href="/Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2.5",
                                    "bg-[#0d1620] border border-[#153448] text-white transition-all duration-300",
                                    "hover:border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.25)]",
                                    "hover:scale-[1.03] active:scale-95 hover-trigger"
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                View Resume
                            </a>
                            <a
                                href="/Resume.pdf"
                                onClick={handleDownloadResume}
                                className={cn(
                                    "px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2.5",
                                    "bg-[#0d1620] border border-[#2c2041] text-white transition-all duration-300",
                                    "hover:border-[#9d00ff] hover:shadow-[0_0_15px_rgba(157,0,255,0.25)]",
                                    "hover:scale-[1.03] active:scale-95 hover-trigger"
                                )}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                Download Resume
                            </a>
                        </div>

                        {/* Social Link Quick Row */}
                        <div className="flex gap-4 pt-4 relative z-20">
                            {[
                                { icon: <Github size={20} />, href: "https://github.com/manujindal009" },
                                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/manu2107" },
                                { icon: <Mail size={20} />, href: "mailto:manu.jindal2107@gmail.com" }
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full border border-border-color/60 text-text-secondary hover:text-accent-primary hover:border-accent-primary bg-bg-accent/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Interactive Code Terminal */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden lg:flex flex-1 justify-end w-full"
                >
                    <div className="w-full max-w-lg bg-[#0d1117]/90 rounded-2xl border border-border-color shadow-2xl overflow-hidden font-mono text-sm relative glassmorphism">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border-color/50 bg-[#161b22]/50">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="text-text-secondary text-xs">manu@jindal-portfolio:~$</div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 space-y-5 text-text-secondary text-left">
                            <div>
                                <span className="text-accent-primary font-bold">$</span> <span className="text-[#00f3ff]">cat developer.json</span>
                            </div>

                            <div className="space-y-2 text-text-primary pl-4 border-l border-border-color/30 mt-2">
                                <div><span className="text-[#9d00ff] font-bold">"name":</span> "Manu Jindal",</div>
                                <div><span className="text-[#9d00ff] font-bold">"role":</span> "Full Stack Developer",</div>
                                <div><span className="text-[#9d00ff] font-bold">"education":</span> "B.E. CSE @ Chandigarh University",</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#9d00ff] font-bold">"status":</span> 
                                    <span className="text-[#00f3ff] flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                                        "Building secure, scalable systems"
                                    </span>
                                </div>
                            </div>

                            {/* Projects Progress */}
                            <div className="pt-2">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-text-secondary uppercase tracking-wider">Project System Build</span>
                                    <span className="text-text-secondary">4 / 4 Complete</span>
                                </div>
                                <div className="w-full h-1.5 bg-bg-accent rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, delay: 0.8 }}
                                        className="h-full bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Recent Activity list */}
                            <div className="bg-[#010409]/60 rounded-xl p-4 border border-border-color/50 mt-4">
                                <div className="text-accent-primary mb-3 text-xs tracking-widest uppercase font-bold">Recent Activities:</div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex gap-2.5">
                                        <span className="text-emerald-400">-&gt;</span>
                                        <span className="text-text-secondary">Built E-Commerce Web Platform FILORA LUXE</span>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <span className="text-emerald-400">-&gt;</span>
                                        <span className="text-text-secondary">Developed Voice2Career Placement Assistant</span>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <span className="text-emerald-400">-&gt;</span>
                                        <span className="text-text-secondary">Authored research paper on Fake Image Detection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto"
                onClick={() => scrollToSection('about')}
            >
                <span className="text-sm text-text-secondary mb-2 uppercase tracking-widest text-[9px] font-bold">Explore</span>
                <div className="w-[1px] h-12 bg-border-color relative overflow-hidden">
                    <motion.div
                        animate={{
                            y: ["0%", "100%"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear"
                        }}
                        className="w-full h-1/2 bg-accent-primary absolute top-0 left-0"
                    />
                </div>
            </motion.div>

        </section>
    );
}
