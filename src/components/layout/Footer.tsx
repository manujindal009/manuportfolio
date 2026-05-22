import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function Footer() {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-bg-secondary border-t border-border-color py-12 relative z-10 glassmorphism">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center bg-transparent gap-8">

                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <span className="font-bold text-2xl tracking-tight text-text-primary">
                            Manu <span className="text-accent-primary">Jindal</span>
                        </span>
                        <p className="text-text-secondary mt-2 max-w-sm text-sm">
                            Software Engineer & Full Stack Developer. Focussed on building secure, scalable, and high-performance applications.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/manujindal009"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-all duration-300 p-2.5 rounded-full hover:-translate-y-1 animate-[pulse_3s_ease-in-out_infinite] ${
                                theme === 'light'
                                    ? "text-[#24292e] bg-[#24292e]/5 border border-[#24292e]/20 shadow-[0_0_15px_rgba(36,41,46,0.15)] hover:bg-[#24292e]/10 hover:shadow-[0_0_25px_rgba(36,41,46,0.35)]"
                                    : "text-white bg-white/5 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                            }`}
                            aria-label="GitHub"
                        >
                            <Github size={22} />
                        </a>
                        <a
                            href="https://linkedin.com/in/manu2107"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0a66c2] transition-all duration-300 p-2.5 rounded-full hover:-translate-y-1 bg-[#0a66c2]/5 border border-[#0a66c2]/20 shadow-[0_0_15px_rgba(10,102,194,0.4)] animate-[pulse_3s_ease-in-out_infinite_0.5s] hover:bg-[#0a66c2]/10 hover:shadow-[0_0_25px_rgba(10,102,194,0.8)]"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={22} />
                        </a>
                        <a
                            href="mailto:manu.jindal2107@gmail.com"
                            className="text-[#EA4335] transition-all duration-300 p-2.5 rounded-full hover:-translate-y-1 bg-[#EA4335]/5 border border-[#EA4335]/20 shadow-[0_0_15px_rgba(234,67,53,0.4)] animate-[pulse_3s_ease-in-out_infinite_1s] hover:bg-[#EA4335]/10 hover:shadow-[0_0_25px_rgba(234,67,53,0.8)]"
                            aria-label="Email"
                        >
                            <Mail size={22} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border-color text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-secondary text-sm">
                        &copy; {currentYear} Manu Jindal. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span>Mohali, Punjab, India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
