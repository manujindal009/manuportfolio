import { useState, useEffect, useRef } from 'react';
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

import { useTheme } from './hooks/useTheme';

// Web Audio API Procedural Synthesizer for Immersive Cyberpunk Sounds
class CyberSynth {
  ctx: AudioContext | null = null;
  humNode1: OscillatorNode | null = null;
  humNode2: OscillatorNode | null = null;
  humGain: GainNode | null = null;
  masterGain: GainNode | null = null;
  muted: boolean = false;

  constructor(isMuted: boolean) {
    this.muted = isMuted;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low ambient sci-fi background hum (50Hz and 100Hz oscillators)
      this.humGain = this.ctx.createGain();
      this.humGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      this.humNode1 = this.ctx.createOscillator();
      this.humNode1.type = 'sine';
      this.humNode1.frequency.setValueAtTime(50, this.ctx.currentTime);

      this.humNode2 = this.ctx.createOscillator();
      this.humNode2.type = 'sine';
      this.humNode2.frequency.setValueAtTime(100, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, this.ctx.currentTime);

      this.humNode1.connect(this.humGain);
      this.humNode2.connect(this.humGain);
      this.humGain.connect(filter);
      filter.connect(this.masterGain);

      this.humNode1.start();
      this.humNode2.start();
    } catch (e) {
      console.warn("Failed to initialize cyber sound synth:", e);
    }
  }

  setMute(muted: boolean) {
    this.muted = muted;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.6, this.ctx.currentTime, 0.05);
    }
  }

  playClick() {
    if (this.muted || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  playConfirm() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(600, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(300, now);
      osc2.frequency.exponentialRampToValueAtTime(600, now + 0.15);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain!);

      osc1.start(now);
      osc1.stop(now + 0.2);
      osc2.start(now);
      osc2.stop(now + 0.2);
    } catch (e) {}
  }

  stop() {
    try {
      if (this.humNode1) this.humNode1.stop();
      if (this.humNode2) this.humNode2.stop();
      if (this.ctx) this.ctx.close();
    } catch (e) {}
  }
}

interface Spark {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

function App() {
  const { theme } = useTheme();

  // Session guard: Preloader runs only once per browser session
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return !sessionStorage.getItem('portfolio_loaded');
      } catch (e) {
        return true;
      }
    }
    return true;
  });

  const [percent, setPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBloomActive, setIsBloomActive] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cyber_mute') === 'true';
    }
    return true;
  });

  const [isLowPerf, setIsLowPerf] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const synthRef = useRef<CyberSynth | null>(null);
  const prevCharRef = useRef(0);
  const transitionStartedRef = useRef(false);

  // Initialize Synth & Prefetch Assets & Motion Detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prefers Reduced Motion & Reduced Transparency detection
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Initialize Procedural Audio Synthesizer
    synthRef.current = new CyberSynth(isMuted);
    
    // Automatically trigger bloom fade-in window
    const bloomTimer = setTimeout(() => setIsBloomActive(false), 600);

    // Background prefetching optimization
    const imagesToPreload = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000'
    ];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      clearTimeout(bloomTimer);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Sync mute state changes
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.setMute(isMuted);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('cyber_mute', String(isMuted));
    }
  }, [isMuted]);

  // Organic Non-Linear Progress Counter
  useEffect(() => {
    if (!loading) return;

    let animFrame: number;
    let lastTime = performance.now();
    let accumulatedProgress = 0;

    // Hard Safety Timeout Fallback: force complete after 4 seconds
    const safetyTimeout = setTimeout(() => {
      setPercent(100);
    }, 4000);

    const updateProgress = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Custom non-linear time step mapping
      // Starts fast -> slows down at 70%-88% -> rapid finish
      let increment = 0;
      if (accumulatedProgress < 70) {
        increment = delta * 0.085; // fast start
      } else if (accumulatedProgress >= 70 && accumulatedProgress < 88) {
        increment = delta * 0.015; // slow down for deep security scans
      } else {
        increment = delta * 0.12; // final rapid burst
      }

      accumulatedProgress += increment;
      if (accumulatedProgress >= 100) {
        accumulatedProgress = 100;
        setPercent(100);
      } else {
        setPercent(Math.floor(accumulatedProgress));
        animFrame = requestAnimationFrame(updateProgress);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(safetyTimeout);
    };
  }, [loading]);

  // Randomized Glitch Trigger Engine
  useEffect(() => {
    if (!loading || prefersReducedMotion) return;

    let glitchTimeout: number;

    const triggerGlitch = () => {
      setIsGlitching(true);
      const activeDuration = 180 + Math.random() * 120; // 180ms - 300ms active glitch

      setTimeout(() => {
        setIsGlitching(false);
        // Queue next glitch at unpredictable 2s - 7s intervals
        const nextDelay = 2000 + Math.random() * 5000;
        glitchTimeout = setTimeout(triggerGlitch, nextDelay) as unknown as number;
      }, activeDuration);
    };

    // Queue initial glitch
    glitchTimeout = setTimeout(triggerGlitch, 2500) as unknown as number;

    return () => clearTimeout(glitchTimeout);
  }, [loading, prefersReducedMotion]);

  // Floating Particle Sparks Simulation (Canvas Engine)
  useEffect(() => {
    if (!loading || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sparks: Spark[] = [];
    const isMobile = window.innerWidth < 768;
    const maxSparks = prefersReducedMotion ? 0 : isMobile ? 8 : 22;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize Sparks
    for (let i = 0; i < maxSparks; i++) {
      sparks.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: 0.8 + Math.random() * 1.5,
        speedY: -(0.3 + Math.random() * 0.9),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: theme === 'light' ? 0.05 + Math.random() * 0.35 : 0.1 + Math.random() * 0.5,
        color: theme === 'light'
          ? (i % 3 === 0 ? '#0066ff' : i % 3 === 1 ? '#7000ff' : '#ff0066')
          : (i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#9d00ff' : '#ff007f')
      });
    }

    // FPS optimization monitor: Drop canvas loop if FPS < 45 for 1 second
    let lastFpsTime = performance.now();
    let frameCount = 0;
    let slowFrames = 0;

    const renderSparks = () => {
      const now = performance.now();
      frameCount++;

      // Realtime frame delta check
      const delta = now - lastFpsTime;
      if (delta >= 1000) {
        const fps = (frameCount * 1000) / delta;
        frameCount = 0;
        lastFpsTime = now;

        if (fps < 45) {
          slowFrames++;
          if (slowFrames >= 1) { // FPS drop detected for >1 second
            setIsLowPerf(true);
            return; // stop execution
          }
        } else {
          slowFrames = 0;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isLowPerf) {
        sparks.forEach((spark) => {
          spark.y += spark.speedY;
          spark.x += spark.speedX;
          spark.opacity -= 0.001; // extremely subtle fade-out

          // Recycle sparks
          if (spark.y < -10 || spark.opacity <= 0) {
            spark.y = canvas.height + Math.random() * 20;
            spark.x = Math.random() * canvas.width;
            spark.opacity = 0.2 + Math.random() * 0.5;
          }

          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
          ctx.fillStyle = spark.color;
          ctx.globalAlpha = spark.opacity;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(renderSparks);
    };

    if (maxSparks > 0 && !isLowPerf) {
      animationId = requestAnimationFrame(renderSparks);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loading, isLowPerf, prefersReducedMotion, theme]);

  // Multi-stage Transition Flash & Chromatic Exit Lock
  useEffect(() => {
    if (percent === 100 && loading && !transitionStartedRef.current) {
      transitionStartedRef.current = true;
      setIsTransitioning(true);

      // Play final boot confirmation chime
      if (synthRef.current) {
        synthRef.current.playConfirm();
      }

      // Smooth slide-up transition delay
      const transitionTimer = setTimeout(() => {
        setLoading(false);
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.setItem('portfolio_loaded', 'true');
          } catch (e) {}
        }
      }, 700);

      return () => clearTimeout(transitionTimer);
    }
  }, [percent, loading]);

  // Initialize synth on user gesture fallback
  const handleToggleMute = () => {
    if (synthRef.current) {
      synthRef.current.init();
    }
    setIsMuted(!isMuted);
  };

  // Safe gesture sound initialization
  const handleInteraction = () => {
    if (synthRef.current) {
      synthRef.current.init();
    }
  };

  // Compile sequential text visible slices based on exact percent timeline
  const line1Text = "> INITIALIZING MODULES";
  const line2Text = "> LOADING DESIGN SYSTEM";
  const line3Text = "> SECURING ACCESS GATEWAYS";
  const line4Text = "[ ACCESS GRANTED ]";
  const line5Text = "[ SYSTEM ONLINE ]";

  let line1Visible = "";
  let line2Visible = "";
  let line3Visible = "";
  let line4Visible = "";
  let line5Visible = "";

  let showLine1Ready = false;
  let showLine2Opt = false;
  let showLine3Secure = false;

  let activeLine = 0; // Tracks which line should display the typing cursor

  if (percent >= 4) {
    if (percent < 30) {
      activeLine = 1;
      const progressRatio = (percent - 4) / 26;
      const len = Math.floor(progressRatio * line1Text.length);
      line1Visible = line1Text.substring(0, len);
    } else {
      line1Visible = line1Text;
      showLine1Ready = true;
    }
  }

  if (percent >= 30) {
    if (percent < 65) {
      activeLine = 2;
      const progressRatio = (percent - 30) / 35;
      const len = Math.floor(progressRatio * line2Text.length);
      line2Visible = line2Text.substring(0, len);
    } else {
      line2Visible = line2Text;
      showLine2Opt = true;
    }
  }

  if (percent >= 65) {
    if (percent < 86) {
      activeLine = 3;
      const progressRatio = (percent - 65) / 21;
      const len = Math.floor(progressRatio * line3Text.length);
      line3Visible = line3Text.substring(0, len);
    } else {
      line3Visible = line3Text;
      showLine3Secure = true;
    }
  }

  if (percent >= 86) {
    if (percent < 93) {
      activeLine = 4;
      const progressRatio = (percent - 86) / 7;
      const len = Math.floor(progressRatio * line4Text.length);
      line4Visible = line4Text.substring(0, len);
    } else {
      line4Visible = line4Text;
      if (percent < 100) {
        activeLine = 5;
        const progressRatio = (percent - 93) / 7;
        const len = Math.floor(progressRatio * line5Text.length);
        line5Visible = line5Text.substring(0, len);
      } else {
        line5Visible = line5Text;
        activeLine = 0;
      }
    }
  }

  // Audio typewriter sync: play click on new characters
  useEffect(() => {
    const totalChars =
      line1Visible.length +
      line2Visible.length +
      line3Visible.length +
      line4Visible.length +
      line5Visible.length;

    if (totalChars > prevCharRef.current) {
      if (synthRef.current) {
        synthRef.current.playClick();
      }
      prevCharRef.current = totalChars;
    }
  }, [line1Visible, line2Visible, line3Visible, line4Visible, line5Visible]);

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
                y: "-100%",
                scale: 1.04,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
              }}
              onPointerDown={handleInteraction}
              className={`fixed inset-0 z-[300] flex flex-col items-center justify-center font-mono text-sm px-6 overflow-hidden select-none transition-colors duration-300 ${
                theme === 'light' 
                  ? 'bg-[#f8fafc] text-slate-800 preloader-light' 
                  : 'bg-[#0a0a0a] text-zinc-400'
              } ${
                isTransitioning ? "chromatic-exit-active" : ""
              } ${isBloomActive ? "cyber-bloom-active" : ""}`}
            >
              {/* Z-0: Sparks canvas background */}
              {!isLowPerf && !prefersReducedMotion && (
                <canvas 
                  ref={canvasRef} 
                  className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${
                    theme === 'light' ? 'opacity-85' : 'opacity-60'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Z-1: Cyberpunk scanline CRT filter */}
              <div className="cyberpunk-scanlines z-[1]" aria-hidden="true" />
              <div className="cyberpunk-scanline-light z-[2]" aria-hidden="true" />
              <div className="cyberpunk-grain z-[2]" aria-hidden="true" />

              {/* Z-10: Corners Authenticity Indicators */}
              <div className={`absolute top-6 left-6 z-10 text-[9px] font-mono tracking-widest pointer-events-none select-none opacity-40 md:opacity-60 ${
                theme === 'light' ? 'text-slate-400' : 'text-zinc-600'
              }`}>
                SYS://AETHER.v1.0.9
              </div>
              <div className={`absolute bottom-6 left-6 z-10 text-[9px] font-mono tracking-widest pointer-events-none select-none opacity-40 md:opacity-60 ${
                theme === 'light' ? 'text-slate-400' : 'text-zinc-600'
              }`}>
                STATION: PORT-7F3A
              </div>
              <div className={`absolute bottom-6 right-6 z-10 text-[9px] font-mono tracking-widest pointer-events-none select-none opacity-40 md:opacity-60 text-right ${
                theme === 'light' ? 'text-slate-400' : 'text-zinc-600'
              }`}>
                LATENCY: 12ms // SECURE
              </div>

              {/* Z-20: Audio Toggle Mute Controls */}
              <button
                onClick={handleToggleMute}
                className={`absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:border-accent-primary transition-all text-[9px] md:text-[10px] uppercase font-mono tracking-widest cursor-pointer shadow-lg active:scale-95 ${
                  theme === 'light' 
                    ? 'bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800' 
                    : 'bg-[#121212]/80 border-white/10 text-zinc-400 hover:text-white'
                }`}
                aria-label={isMuted ? "Unmute intro sounds" : "Mute intro sounds"}
              >
                {isMuted ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span>SOUND: OFF</span>
                  </>
                ) : (
                  <>
                    <div className="flex gap-0.5 items-end h-3 w-3">
                      <span className={`w-0.5 animate-pulse h-full ${theme === 'light' ? 'bg-[#0066ff]' : 'bg-[#00f3ff]'}`} />
                      <span className={`w-0.5 animate-pulse h-1/2 ${theme === 'light' ? 'bg-[#0066ff]' : 'bg-[#00f3ff]'}`} style={{ animationDelay: '0.2s' }} />
                      <span className={`w-0.5 animate-pulse h-3/4 ${theme === 'light' ? 'bg-[#0066ff]' : 'bg-[#00f3ff]'}`} style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span>SOUND: ON</span>
                  </>
                )}
              </button>

              {/* Z-15: Main loading console layout container */}
              <div className="max-w-md w-full space-y-6 relative z-10 px-4 md:px-0">
                {/* Glowing Core Orbit */}
                <div 
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] animate-pulse pointer-events-none ${
                    theme === 'light' ? 'bg-[#0066ff]/5' : 'bg-[#3b82f6]/10'
                  }`}
                  aria-hidden="true"
                />

                {/* Glitching Title Block */}
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center relative z-10 space-y-2 pointer-events-none"
                >
                  <h1 
                    className={`text-xl sm:text-2xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r uppercase select-none ${
                      theme === 'light' 
                        ? 'from-[#0066ff] via-[#7000ff] to-[#ff0066]' 
                        : 'from-[#00f3ff] via-[#9d00ff] to-[#ff007f]'
                    } ${
                      isGlitching ? "glitch-text-active" : ""
                    }`}
                  >
                    MANU JINDAL
                  </h1>
                  <p className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] select-none opacity-80 ${
                    theme === 'light' ? 'text-slate-400' : 'text-zinc-500'
                  }`}>
                    SOFTWARE PORTFOLIO SYSTEM
                  </p>
                </motion.div>

                {/* Cyber Console Display Box */}
                <div className={`p-5 rounded-xl space-y-3 text-[11px] relative z-10 shadow-2xl font-mono ${
                  theme === 'light' 
                    ? 'bg-white/90 border border-slate-200/80 text-slate-600 shadow-slate-100/50' 
                    : 'bg-[#121212]/90 border border-white/10 text-zinc-400 shadow-black/80'
                }`}>
                  {/* Console Line 1 */}
                  {percent >= 4 && (
                    <div className="flex justify-between items-center h-4">
                      <span className={activeLine === 1 ? "cyber-cursor" : ""}>
                        {line1Visible}
                      </span>
                      {showLine1Ready && (
                        <span className={`font-extrabold tracking-wider text-[10px] animate-pulse ${
                          theme === 'light' ? 'text-[#0066ff]' : 'text-[#00f3ff]'
                        }`}>
                          READY
                        </span>
                      )}
                    </div>
                  )}

                  {/* Console Line 2 */}
                  {percent >= 30 && (
                    <div className="flex justify-between items-center h-4">
                      <span className={activeLine === 2 ? "cyber-cursor" : ""}>
                        {line2Visible}
                      </span>
                      {showLine2Opt && (
                        <span className={`font-extrabold tracking-wider text-[10px] animate-pulse ${
                          theme === 'light' ? 'text-[#7000ff]' : 'text-[#9d00ff]'
                        }`}>
                          OPTIMIZED
                        </span>
                      )}
                    </div>
                  )}

                  {/* Console Line 3 */}
                  {percent >= 65 && (
                    <div className="flex justify-between items-center h-4">
                      <span className={activeLine === 3 ? "cyber-cursor" : ""}>
                        {line3Visible}
                      </span>
                      {showLine3Secure && (
                        <span className={`font-extrabold tracking-wider text-[10px] animate-pulse ${
                          theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                        }`}>
                          100% SECURE
                        </span>
                      )}
                    </div>
                  )}

                  {/* Console Line 4 - SYSTEM BOOT GRANTED & ONLINE */}
                  {percent >= 86 && (
                    <div className={`border-t pt-2 mt-2 space-y-1 ${
                      theme === 'light' ? 'border-slate-100' : 'border-white/5'
                    }`}>
                      <div className={`flex justify-center text-center h-4 font-bold text-[10px] tracking-widest ${
                        theme === 'light' ? 'text-[#0066ff]' : 'text-[#00f3ff]'
                      }`}>
                        <span className={activeLine === 4 ? "cyber-cursor" : ""}>
                          {line4Visible}
                        </span>
                      </div>
                      {percent >= 93 && (
                        <div className={`flex justify-center text-center h-4 font-bold text-[10px] tracking-widest ${
                          theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                        }`}>
                          <span className={activeLine === 5 ? "cyber-cursor" : ""}>
                            {line5Visible}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Progress Bar & Percentage display */}
                <div className="space-y-2 relative z-10">
                  <div className={`flex justify-between text-[10px] font-mono tracking-widest ${
                    theme === 'light' ? 'text-slate-400' : 'text-zinc-500'
                  }`}>
                    <span>BOOTING STATE</span>
                    <span className={`font-extrabold tracking-wider ${
                      theme === 'light' ? 'text-[#0066ff]' : 'text-[#00f3ff]'
                    }`}>
                      [ {percent}% ]
                    </span>
                  </div>
                  
                  <div className={`w-full h-1.5 rounded-full overflow-hidden relative z-10 border ${
                    theme === 'light' ? 'bg-slate-100 border-slate-200/50' : 'bg-zinc-900 border-white/5'
                  }`}>
                    <motion.div
                      style={{ width: `${percent}%` }}
                      className={`h-full cyber-glow-pulse ${
                        theme === 'light' 
                          ? 'bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#ff0066]' 
                          : 'bg-gradient-to-r from-[#00f3ff] via-[#9d00ff] to-[#ff007f]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Seamless Full-Screen transition flash */}
              {isTransitioning && (
                <div 
                  className="absolute inset-0 z-30 bg-white/10 pointer-events-none mix-blend-overlay animate-pulse" 
                  aria-hidden="true"
                />
              )}
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
