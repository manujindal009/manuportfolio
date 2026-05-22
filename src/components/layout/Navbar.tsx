import { useState, useEffect } from 'react';
import { Menu, X, SlidersVertical } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../utils/utils';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Simple scroll spy logic
            const scrollPosition = window.scrollY + 150;
            for (const link of navLinks) {
                const element = document.querySelector(link.href);
                if (element) {
                    const top = (element as HTMLElement).offsetTop;
                    const height = (element as HTMLElement).offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(link.href.substring(1));
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                isScrolled
                    ? 'glassmorphism py-3 border-border-color shadow-sm'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center bg-transparent">
                    {/* Logo */}
                    <div 
                        className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" 
                        onClick={handleLogoClick}
                    >
                        <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary group-hover:rotate-180 transition-transform duration-500">
                            <SlidersVertical size={22} className="glow-effect" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-text-primary">
                            Manu <span className="text-accent-primary">Jindal</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => {
                                const isCurrent = activeSection === link.href.substring(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "transition-colors font-medium text-sm hover-trigger py-1 relative",
                                            isCurrent ? "text-accent-primary font-bold" : "text-text-secondary hover:text-accent-primary"
                                        )}
                                    >
                                        {link.name}
                                        {isCurrent && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary rounded-full shadow-[0_0_5px_var(--accent-primary)]" />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                        <div className="h-6 w-px bg-border-color mx-2"></div>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-text-secondary hover:text-text-primary p-2 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden glassmorphism border-t border-border-color absolute top-full left-0 w-full shadow-lg overflow-hidden">
                    <div className="px-4 pt-2 pb-6 space-y-1 bg-[#0a0a0a]/95 backdrop-blur-lg">
                        {navLinks.map((link) => {
                            const isCurrent = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "block px-4 py-3 text-base font-medium rounded-xl transition-all",
                                        isCurrent 
                                            ? "text-accent-primary bg-accent-primary/10 border-l-4 border-accent-primary font-bold" 
                                            : "text-text-secondary hover:text-accent-primary hover:bg-bg-accent"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
