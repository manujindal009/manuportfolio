import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'neon';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
        if (savedTheme && ['dark', 'light', 'neon'].includes(savedTheme)) {
            return savedTheme;
        }
        // Default system preference, but default to dark if not set
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark'; // Default premium feel
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove all theme classes
        root.classList.remove('dark', 'light', 'neon');
        // Add active theme class
        root.classList.add(theme);
        // Save to local storage
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
