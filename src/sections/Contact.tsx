import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils/utils';

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });
            const result = await response.json();
            if (result.success) {
                setSubmitStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5s
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        Get In <span className="text-accent-primary">Touch</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">

                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-text-primary">Let's talk about everything!</h3>
                            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                                Feel free to reach out to me for collaborations, technical inquiries, recruitment, or just a friendly chat about full stack systems, automation testing, and algorithms.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { 
                                    icon: <Mail size={22} />, 
                                    title: "Email Address", 
                                    info: "manu.jindal2107@gmail.com", 
                                    href: "mailto:manu.jindal2107@gmail.com" 
                                },
                                { 
                                    icon: <Phone size={22} />, 
                                    title: "Telephone", 
                                    info: "+91-9888812872", 
                                    href: "tel:+919888812872" 
                                },
                                { 
                                    icon: <MapPin size={22} />, 
                                    title: "Location", 
                                    info: "Mohali, Punjab, India", 
                                    href: null 
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5 p-4 glassmorphism rounded-2xl border border-border-color/80 hover:border-accent-primary/45 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center border border-accent-primary/20 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-text-secondary uppercase tracking-wider mb-0.5">{item.title}</h4>
                                        {item.href ? (
                                            <a href={item.href} className="text-base sm:text-lg font-bold text-text-primary hover:text-accent-primary transition-colors hover-trigger">
                                                {item.info}
                                            </a>
                                        ) : (
                                            <span className="text-base sm:text-lg font-bold text-text-primary">{item.info}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-3xl border border-border-color space-y-6 shadow-xl relative overflow-hidden">
                            {/* Inner gradient glow */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />

                            <input type="hidden" name="access_key" value="80e1afac-32a2-4a61-912f-6c10cc1dd192" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-semibold text-text-primary uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-bg-accent/40 border border-border-color/80 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400/80"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-semibold text-text-primary uppercase tracking-wider">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-bg-accent/40 border border-border-color/80 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400/80"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 relative z-10">
                                <label htmlFor="subject" className="text-xs font-semibold text-text-primary uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full bg-bg-accent/40 border border-border-color/80 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all outline-none placeholder:text-gray-400/80"
                                    placeholder="Discussion topic..."
                                />
                            </div>

                            <div className="space-y-1.5 relative z-10">
                                <label htmlFor="message" className="text-xs font-semibold text-text-primary uppercase tracking-wider">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-bg-accent/40 border border-border-color/80 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all outline-none resize-none custom-scrollbar placeholder:text-gray-400/80"
                                    placeholder="Your message details here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 relative z-10 text-base cursor-pointer",
                                    isSubmitting 
                                        ? "bg-bg-accent text-text-secondary border border-border-color cursor-not-allowed" 
                                        : "bg-black text-white border border-[#0066ff] shadow-[0_0_20px_rgba(0,102,255,0.65)] hover:shadow-[0_0_30px_rgba(0,102,255,0.85)] hover:scale-[1.01] active:scale-[0.99]"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin text-white" size={18} />
                                        <span className="text-white">Sending...</span>
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <CheckCircle2 size={18} className="text-emerald-400" />
                                        <span className="text-white">Message Sent!</span>
                                    </>
                                ) : submitStatus === 'error' ? (
                                    <>
                                        <AlertCircle size={18} className="text-red-400" />
                                        <span className="text-white">Failed to Send</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} className="text-white" />
                                        <span className="text-white font-medium text-[17px]">Send Message</span>
                                    </>
                                )}
                            </button>

                            {/* Status Messages below button */}
                            {submitStatus === 'success' && (
                                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-xs text-center font-semibold">
                                    Thanks for reaching out! I will get back to you soon.
                                </motion.p>
                            )}
                            {submitStatus === 'error' && (
                                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs text-center font-semibold">
                                    Something went wrong. Please try again later.
                                </motion.p>
                            )}

                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
