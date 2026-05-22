import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Background3D } from './components/ui/Background3D';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Achievements } from './sections/Achievements';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial portfolio asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-transparent text-text-primary transition-colors duration-300 relative selection:bg-accent-primary/30">
        <Helmet>
          <title>Manu Jindal | Software Engineer & Full Stack Developer</title>
          <meta name="description" content="Personal portfolio of Manu Jindal, a premium Software Engineer & Full Stack Developer focused on building scalable, high-performance web applications." />
          <meta name="keywords" content="Manu Jindal, Software Engineer, Full Stack Developer, Portfolio, React, Next.js, TypeScript, Tailwind CSS, Supabase, Firebase, Selenium, Automation Testing, Percy" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Manu Jindal | Software Engineer Portfolio" />
          <meta property="og:description" content="Portfolio highlighting expertise in Full Stack Development, Scalable System Design, and UI Automation Testing." />
          <meta property="og:site_name" content="Manu Jindal Portfolio" />

          {/* Recruiter-focused SEO enhancements */}
          <meta name="author" content="Manu Jindal" />
          <meta name="robots" content="index, follow" />
        </Helmet>

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Loading Screen Preloader */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                y: -100,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
              }}
              className="fixed inset-0 bg-[#0a0a0a] z-[300] flex flex-col items-center justify-center font-mono text-sm px-6"
            >
              <div className="max-w-md w-full space-y-6 relative">
                {/* Glowing Core Orbit */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-primary/10 rounded-full blur-[60px] animate-pulse" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center relative z-10 space-y-2"
                >
                  <h1 className="text-2xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] via-[#9d00ff] to-[#ff007f] uppercase">
                    MANU JINDAL
                  </h1>
                  <p className="text-zinc-400 text-xs uppercase tracking-wider">
                    SOFTWARE PORTFOLIO SYSTEM
                  </p>
                </motion.div>

                {/* Simulated Console Loaders */}
                <div className="bg-[#121212]/90 border border-white/10 p-4 rounded-xl space-y-2 text-xs text-zinc-400 relative z-10 shadow-2xl">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between"
                  >
                    <span>&gt; INITIALIZING MODULES</span>
                    <span className="text-[#00f3ff] font-bold">READY</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-between"
                  >
                    <span>&gt; LOADING DESIGN SYSTEM</span>
                    <span className="text-[#9d00ff] font-bold">OPTIMIZED</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex justify-between"
                  >
                    <span>&gt; SECURING ACCESS GATEWAYS</span>
                    <span className="text-emerald-400 font-bold">100% SECURE</span>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-[#1e1e1e] rounded-full overflow-hidden relative z-10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-[#00f3ff] via-[#9d00ff] to-[#ff007f] shadow-[0_0_10px_#00f3ff]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global UI Elements */}
        <Background3D />
        <ScrollProgress />
        <Navbar />

        {/* Main Layout Content */}
        <main className="flex-grow relative pointer-events-none *:pointer-events-auto">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
