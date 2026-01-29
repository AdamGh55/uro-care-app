"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Activity, ShieldCheck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutUsSection() {
    return (
        <section className="w-full py-24 relative overflow-hidden bg-[#050A1F] text-white">
            {/* Background with animated DNA Strand */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* DNA Strand Approximation using SVG/Shapes if image unseen, or placeholder */}
                {/* We will use a repeating pattern or large SVG for the DNA strand effect */}
                <motion.div
                    animate={{ x: [-20, 0, -20], y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[10%] w-[80%] h-[120%] opacity-20"
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
                        {/* Abstract DNA-like spiral path */}
                        <path d="M20,10 Q50,50 20,90 T20,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M80,10 Q50,50 80,90 T80,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        {/* Creating a dot matrix effect to mimic the particle DNA look */}
                        <pattern id="dots" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="0.5" fill="currentColor" />
                        </pattern>
                        <path d="M30,0 Q60,50 30,100" stroke="url(#dots)" strokeWidth="10" filter="blur(2px)" opacity="0.5" />
                        <path d="M70,0 Q40,50 70,100" stroke="url(#dots)" strokeWidth="10" filter="blur(2px)" opacity="0.5" />
                    </svg>
                    {/* Actual DNA Image Placement if user provided one later, for now mimicking the blue particle flow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-3xl transform -skew-x-12" />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Stats & Navigation */}
                    <div className="flex flex-col gap-12 order-2 lg:order-1 relative">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
                                    Our Impact
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white border-none">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h2 className="text-7xl font-bold tracking-tighter text-blue-500">
                                    50+
                                </h2>
                                <p className="text-xl font-medium text-slate-300 max-w-[200px]">
                                    Healthcare Professionals Supporting Lives Worldwide
                                </p>
                            </motion.div>
                        </div>

                        {/* DNA Strand Visual Placeholder for the left side curve */}
                        <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-30 pointer-events-none hidden lg:block">
                            {/* This would be the DNA image */}
                        </div>
                    </div>

                    {/* Right Column: Content & Cards */}
                    <div className="space-y-12 order-1 lg:order-2">
                        <div className="flex items-start gap-8">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10 shadow-2xl">
                                <img src="/placeholder-doctor.jpg" alt="Doctor" className="w-full h-full object-cover bg-slate-800" />
                            </div>
                            <p className="text-xl md:text-2xl leading-relaxed font-light text-slate-200">
                                <span className="font-semibold text-white">UroCare Clinic</span> connects doctors and patients effortlessly, providing smarter, safer, and compassionate healthcare from diagnosis to full recovery.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Card 1: Connected Care */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-[#0B1229] border border-white/5 shadow-xl relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <div className="bg-white/5 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                                        Connected Care
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-500">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-white">Smart Care</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Smart digital health tracking ensures accurate insights and better outcomes.
                                </p>
                            </motion.div>

                            {/* Card 2: Data Privacy */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-[#0B1229] border border-white/5 shadow-xl relative group overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <div className="bg-white/5 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                                        Data Privacy
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-white">Secure Data</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Protecting patient data through secure, HIPAA-compliant digital health systems.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
