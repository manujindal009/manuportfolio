import { useTheme } from '../../hooks/useTheme';
import { Moon, Sun, Zap } from 'lucide-react';
import { cn } from '../../utils/utils';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex bg-bg-accent rounded-full p-1 border border-border-color glassmorphism">
            <button
                onClick={() => setTheme('light')}
                className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    theme === 'light' ? "bg-bg-secondary shadow-sm" : "hover:bg-bg-secondary/50 text-text-secondary"
                )}
                aria-label="Light mode"
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    theme === 'dark' ? "bg-bg-secondary shadow-sm" : "hover:bg-bg-secondary/50 text-text-secondary"
                )}
                aria-label="Dark mode"
            >
                <Moon size={18} />
            </button>
            <button
                onClick={() => setTheme('neon')}
                className={cn(
                    "p-2 rounded-full transition-all duration-300",
                    theme === 'neon' ? "bg-bg-secondary shadow-sm shadow-accent-primary text-accent-primary" : "hover:bg-bg-secondary/50 text-text-secondary"
                )}
                aria-label="Neon mode"
            >
                <Zap size={18} className={theme === 'neon' ? "drop-shadow-[0_0_8px_var(--color-neon-blue)]" : ""} />
            </button>
        </div>
    );
}
