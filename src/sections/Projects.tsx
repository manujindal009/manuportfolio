import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X, ShoppingBag, Brain, BarChart3, Eye, ExternalLink } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface Project {
    id: string;
    title: string;
    shortDesc: string;
    fullDesc: string[];
    tech: string[];
    features: string[];
    category: string[];
    icon: React.ReactNode;
    github: string;
    live: string;
}

const projects: Project[] = [
    {
        id: "filoraluxe",
        title: "FILORA LUXE",
        shortDesc: "Scalable Full-Stack E-Commerce Website",
        fullDesc: [
            "A premium e-commerce website designed to provide a seamless, high-conversion retail journey for customers.",
            "Features robust customer role-based authentication, an intuitive catalog interface with responsive filters, interactive cart management, and safe, reliable Razorpay Payment Gateway integration.",
            "Backed by Supabase PostgreSQL for real-time inventory adjustments and secure login states, styled using vanilla CSS custom-scrollbar and responsive Tailwind interfaces, and deployed on Vercel for low latency."
        ],
        tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel", "Razorpay"],
        features: [
            "Role-based customer and manager authentication",
            "Safe checkout using Razorpay Payment integration",
            "Real-time database catalog and inventory synchronization"
        ],
        category: ["Full-Stack"],
        icon: <ShoppingBag size={32} className="text-[#00f3ff]" />,
        github: "https://github.com/manujindal009/Filora-Luxe",
        live: "https://www.filoraluxe.in/"
    },
    {
        id: "voice2career",
        title: "VOICE2CAREER",
        shortDesc: "AI Placement Preparation Platform",
        fullDesc: [
            "An innovative, recruiter-focused AI mock interview platform that helps candidates simulate real technical and behavioral interviews.",
            "Incorporates voice feedback algorithms to evaluate spoken answers, evaluate structure and communication styles, and present immediate analytical results.",
            "Engineered using modular React.js structures, type-safe TypeScript paradigms, and Firebase cloud services for fast analytics delivery and user score tracking."
        ],
        tech: ["React.js", "TypeScript", "Firebase", "Tailwind CSS", "Vercel"],
        features: [
            "Intelligent speech analysis and immediate feedback reports",
            "Highly responsive, Apple-level modular client UI",
            "Secure analytical dashboards for scores and tracking"
        ],
        category: ["Full-Stack", "Data & AI"],
        icon: <Brain size={32} className="text-[#9d00ff]" />,
        github: "https://github.com/manujindal009/voice2career",
        live: "https://www.voice2career.in/"
    },
    {
        id: "securesales",
        title: "SECURE SALES DASHBOARD",
        shortDesc: "Interactive Data Analytics Dashboard",
        fullDesc: [
            "A secure real-time data analytical dashboard designed to convert complex sales databases into clear, actionable executive insights.",
            "Processes and audits raw transaction spreadsheets using high-performance Python, Pandas, and NumPy pipelines.",
            "Integrates role-based authorization to protect financial records and includes rich responsive visualizations built using Streamlit and Plotly widgets, reducing manual auditing hours by 30%."
        ],
        tech: ["Python", "Streamlit", "Pandas", "NumPy", "Plotly", "Excel"],
        features: [
            "Aggregates and filters corporate spreadsheets instantly",
            "30% reduction in manual transaction auditing effort",
            "Role-based access levels securing proprietary financial dashboards"
        ],
        category: ["Data & AI"],
        icon: <BarChart3 size={32} className="text-emerald-400" />,
        github: "https://github.com/manujindal009",
        live: "https://github.com/manujindal009"
    },
    {
        id: "visualregression",
        title: "VISUAL TESTING SYSTEM",
        shortDesc: "Automated Regression Suite by Percy",
        fullDesc: [
            "A modern layout testing pipeline that enforces pixel-perfect UI consistency across multiple web page designs.",
            "Leverages Selenium WebDriver to automate complex browser actions and integrates Percy SDK to capture layouts and render high-resolution screenshots.",
            "Executes precise visual comparisons to flag colors, fonts, margins, or layout shift defects, serving results instantly on a cloud-based Percy Dashboard."
        ],
        tech: ["Selenium WebDriver", "Percy", "Java", "Maven", "Node.js"],
        features: [
            "Automated pixel-level visual comparison checking",
            "Cross-browser workflows verifying layouts and fonts",
            "Instant screenshot-based diff logging on Percy Dashboard"
        ],
        category: ["QA & Automation"],
        icon: <Eye size={32} className="text-[#ff007f]" />,
        github: "https://github.com/manujindal009",
        live: "https://github.com/manujindal009"
    }
];

const CATEGORIES = ["All", "Full-Stack", "Data & AI", "QA & Automation"];

export function Projects() {
    const { theme } = useTheme();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(p => p.category.includes(activeFilter))
            );
        }
    }, [activeFilter]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedProject]);

    return (
        <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background glowing particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        Featured <span className="text-accent-primary">Projects</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover-trigger cursor-pointer ${
                                activeFilter === cat
                                    ? `bg-accent-primary ${theme === 'light' ? 'text-black' : 'text-white'} font-semibold shadow-[0_0_15px_var(--accent-primary)]`
                                    : "bg-bg-accent/40 border border-border-color/80 text-text-secondary hover:text-text-primary hover:border-accent-primary/50"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedProject(project)}
                                className="group cursor-pointer rounded-3xl p-[1px] bg-gradient-to-br from-border-color via-transparent to-transparent hover:from-accent-primary hover:to-neon-purple transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.08)]"
                            >
                                <div className="glassmorphism h-full rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                                    {/* Decorative background glow */}
                                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-[50px] group-hover:bg-accent-primary/20 transition-all duration-500" />

                                    <div>
                                        <div className="flex items-start justify-between mb-6 relative z-10">
                                            <div className="p-3.5 rounded-2xl bg-bg-primary/80 border border-border-color shadow-md group-hover:scale-110 transition-transform duration-300">
                                                {project.icon}
                                            </div>
                                            <div className="flex gap-2">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-text-secondary hover:text-accent-primary transition-colors p-2.5 rounded-xl hover:bg-bg-accent/60 border border-transparent hover:border-border-color"
                                                    aria-label="Source code"
                                                >
                                                    <Github size={18} />
                                                </a>
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-text-secondary hover:text-accent-primary transition-colors p-2.5 rounded-xl hover:bg-bg-accent/60 border border-transparent hover:border-border-color"
                                                    aria-label="Live Demo"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-text-secondary mb-6 text-[14px] leading-relaxed">
                                                {project.shortDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-border-color/30">
                                        {project.tech.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-bg-accent text-text-secondary border border-border-color">
                                                +{project.tech.length - 4}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-[200] flex items-start justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`${
                                theme === 'light' ? 'bg-white' : 'bg-[#0c0f16]'
                            } w-full max-w-2xl rounded-3xl overflow-hidden border border-border-color shadow-[0_0_50px_rgba(0,0,0,0.35)] flex flex-col max-h-[85vh] my-auto`}
                        >
                            {/* Modal Header */}
                            <div className={`p-6 border-b border-border-color/50 flex justify-between items-center ${
                                theme === 'light' ? 'bg-slate-50' : 'bg-[#111622]/50'
                            } relative`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent pointer-events-none" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-2 bg-bg-primary border border-border-color rounded-xl">
                                        {selectedProject.icon}
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-text-primary">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors relative z-10"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
                                        Project Overview
                                    </h4>
                                    {selectedProject.fullDesc.map((desc, i) => (
                                        <p key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                                            {desc}
                                        </p>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-color/30">
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
                                            Key Capabilities
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedProject.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-text-secondary text-xs md:text-sm leading-relaxed">
                                                    <span className={`${
                                                        theme === 'light' ? 'text-accent-primary' : 'text-[#00f3ff]'
                                                    } mt-1 shrink-0`}>•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-primary">
                                            Technologies Deployed
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-bg-primary text-text-secondary border border-border-color"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className={`p-5 border-t border-border-color/50 ${
                                theme === 'light' ? 'bg-slate-50' : 'bg-[#111622]/50'
                            } flex justify-end gap-3`}>
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 bg-transparent border border-border-color text-text-primary hover:bg-bg-accent transition-colors"
                                >
                                    <Github size={16} />
                                    Source Code
                                </a>
                                <a
                                    href={selectedProject.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-accent-primary ${
                                        theme === 'light' ? 'text-black' : 'text-white'
                                    } hover:bg-accent-primary/95 transition-colors shadow-md shadow-accent-primary/10`}
                                >
                                    <ExternalLink size={16} />
                                    Live Demo
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
