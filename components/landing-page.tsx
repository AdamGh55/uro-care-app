"use client"

import Image from "next/image"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroOrbit } from "@/components/hero-orbit"
import { DnaSwirl } from "@/components/dna-swirl"
import { ArrowRight, Activity, MessageSquare, ShieldCheck, UserCheck, Calendar, Plus } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"

import { motion } from "framer-motion"

import * as React from "react"

export function LandingPage() {
  const [activeValue, setActiveValue] = React.useState('Collaboration')

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
      {/* Background Layer - Positioned absolutely/fixed at z-0 */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.03]" />

        {/* Animated Blobs - Refined for Deep Blue Theme */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/20 blur-[120px] dark:bg-indigo-500/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-blue-600/20 blur-[120px] dark:bg-blue-500/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-500/20 blur-[120px] dark:bg-teal-400/10"
        />
      </div>

      {/* Content Layer - Positioned relative at z-10 to stay above background */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/10 backdrop-blur-md fixed w-full top-0 z-50 bg-background/50">
          <Link className="flex items-center justify-center gap-2" href="#">
            <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="size-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">UroCare</span>
          </Link>
          <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
            <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#">
              Clinicians
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#">
                Contact
              </Link>
            </div>
          </nav>
          <div className="ml-6 flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <ModeToggle />

            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log In</Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />

            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-8 z-20">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-primary/30 dark:border-primary/40 bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary dark:text-primary-foreground backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-primary dark:bg-white mr-2 animate-pulse"></span>
                    Trusted by 10,000+ Patients
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary">
                    Your Trusted Partner in Modern Healthcare.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                    We connect patients and specialists effortlessly. From pre-op preparation to full recovery, experience a smarter, safer journey.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row w-full min-[400px]:w-auto">
                  <Link href="/onboarding" className="w-full min-[400px]:w-auto">
                    <Button size="lg" className="w-full min-[400px]:w-auto h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-primary-foreground text-lg transition-transform hover:scale-105">
                      Start Here <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="#" className="w-full min-[400px]:w-auto">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto h-14 px-8 rounded-full border-primary/20 hover:bg-primary/5 text-lg">
                      Watch Demo
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 flex items-center gap-8 text-muted-foreground dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary/60 dark:text-primary" />
                    <span className="text-sm font-medium">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary/60 dark:text-primary" />
                    <span className="text-sm font-medium">Verified Specialists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary/60 dark:text-primary" />
                    <span className="text-sm font-medium">24/7 Monitoring</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Orbit Animation */}
              <div className="relative flex justify-center lg:justify-end w-full max-w-[380px] sm:max-w-none mx-auto aspect-square md:aspect-auto overflow-visible">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/25 rounded-full blur-[120px] -z-10" />
                <HeroOrbit />
              </div>
            </div>
          </section>

          {/* Section 2: Impact & About (Ref: DNA/Abstract Strand) */}
          <section className="w-full py-24 relative overflow-hidden">
            {/* DNA Swirl Background Overlay */}
            <DnaSwirl />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                {/* Left Column: Stats & Navigation (35-40%) */}
                <div className="lg:col-span-5 flex flex-col gap-12 relative">
                  <div className="space-y-6">
                    <span className="text-sm font-semibold tracking-widest text-primary uppercase">About Us</span>

                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 text-sm font-medium text-primary-foreground">
                        Our Impact
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="rounded-full border-primary/20 bg-background/50 hover:bg-primary/10"><ArrowRight className="h-4 w-4 rotate-180" /></Button>
                        <Button size="icon" variant="outline" className="rounded-full border-primary/20 bg-background/50 hover:bg-primary/10"><ArrowRight className="h-4 w-4" /></Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground">
                        50+
                      </h2>
                      <p className="text-xl font-medium text-muted-foreground leading-snug">
                        Healthcare Professionals <br />
                        Supporting Lives Worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Content & Cards (60-65%) */}
                <div className="lg:col-span-7 space-y-12">
                  {/* Top Row: Avatar + Text */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden flex-shrink-0 border border-white/10 shadow-2xl relative bg-muted">
                      <Image src="/images/medical-team.png" alt="Doctor" fill className="object-cover" />
                    </div>
                    <p className="text-xl md:text-2xl leading-relaxed font-light text-slate-200">
                      <span className="font-semibold text-white">UroCare Clinic</span> connects doctors and patients effortlessly, providing smarter, safer, and compassionate healthcare from diagnosis to full recovery.
                    </p>
                  </div>

                  {/* Bottom Row: Feature Cards */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Card 1: Connected Care */}
                    <div className="p-6 rounded-3xl bg-[#0B1229]/60 backdrop-blur-sm border border-white/5 shadow-xl group cursor-pointer hover:border-primary/40 hover:bg-[#0B1229]/80 hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                          <Activity className="h-6 w-6" />
                        </div>
                        <div className="bg-white/5 text-[10px] font-medium px-3 py-1 rounded-full border border-white/10 uppercase tracking-wide group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                          Connected Care
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-primary transition-colors">Smart Care</h3>
                      <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                        Smart digital health tracking ensures accurate insights and better outcomes.
                      </p>
                    </div>

                    {/* Card 2: Data Privacy */}
                    <div className="p-6 rounded-3xl bg-[#0B1229]/60 backdrop-blur-sm border border-white/5 shadow-xl group cursor-pointer hover:border-emerald-500/40 hover:bg-[#0B1229]/80 hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="bg-white/5 text-[10px] font-medium px-3 py-1 rounded-full border border-white/10 uppercase tracking-wide group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-colors">
                          Data Privacy
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">Secure Data</h3>
                      <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                        Protecting patient data through secure, HIPAA-compliant digital health systems.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* Section 3: Values & Path (Ref: Simplified Path - Interactive & Glass) */}
          {/* Section 3: Values & Path (Ref: Simplified Path - Interactive & Glass) */}
          <section className="w-full py-24 relative overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-muted/10">
            {/* Gradient Backgrounds */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/40 dark:bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl text-foreground transition-colors">
                  A Simplified Path to <br /> Comprehensive Medical Care
                </h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-12">
                {/* Interactive List */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-2 order-2 lg:order-1">
                  {['Compassion', 'Collaboration', 'Transparency', 'Flexibility', 'Excellence'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveValue(item)}
                      className={`text-left px-6 py-4 text-xl font-medium transition-all duration-300 rounded-2xl border-l-4 ${activeValue === item
                        ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-primary-foreground shadow-sm'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-primary/5'
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Display Area */}
                <div className="lg:col-span-8 grid md:grid-cols-2 gap-6 h-auto md:h-[450px] order-1 lg:order-2">
                  {/* Image Card */}
                  <motion.div
                    key={`${activeValue}-img`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-3xl overflow-hidden h-64 md:h-full shadow-2xl"
                  >
                    <Image
                      src="/images/medical-team.png"
                      alt={activeValue}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>

                  {/* Text Card - Adaptive Glass */}
                  <motion.div
                    key={`${activeValue}-text`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-full md:min-h-0 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-3xl bg-white/80 dark:bg-[#03254c]/40 border border-white/40 dark:border-primary/20 shadow-xl relative overflow-hidden transition-colors"
                  >
                    {/* Glass Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors">
                        {activeValue === 'Compassion' && "We treat every patient with the same care we'd give our own family."}
                        {activeValue === 'Collaboration' && "Your entire care team works together in realtime sync."}
                        {activeValue === 'Transparency' && "Clear pricing, clear steps. No hidden surprises, ever."}
                        {activeValue === 'Flexibility' && "Care that adapts to your schedule, not the other way around."}
                        {activeValue === 'Excellence' && "World-class specialists committed to the best possible outcomes."}
                      </h3>
                      <p className="text-slate-600 dark:text-blue-100 text-lg transition-colors">
                        We believe {activeValue.toLowerCase()} is the foundation of modern healing.
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap relative z-10 mt-6 md:mt-0">
                      <div className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/30 backdrop-blur-md text-primary dark:text-white text-sm font-medium border border-primary/10 dark:border-primary/20">
                        {activeValue}
                      </div>
                      <div className="px-4 py-2 rounded-full bg-muted/50 dark:bg-primary/10 backdrop-blur-md text-muted-foreground dark:text-slate-200 text-sm font-medium border border-border/50 dark:border-primary/10">
                        UroCare Standard
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Model (Ref: Total Care Model) */}
          <section className="w-full py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12">
                <span className="text-primary font-medium tracking-wider uppercase text-sm">Approach</span>
                <h2 className="text-3xl font-bold mt-2">The UroCare Total Care™ Model</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Providing patient-centered care through expert guidance, innovative solutions, and personalized support every step of the way.</p>
              </div>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] bg-muted group cursor-pointer">
                <Image src="/images/medical-team.png" alt="Total Care Model" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                  <div className="text-white">
                    <p className="font-medium text-lg mb-2">Our UroCare™ model unites doctors, specialists, and wellness experts.</p>
                    <p className="text-sm opacity-80">From diagnostics to recovery, we ensure holistic healing.</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="size-16 bg-white text-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="ml-1">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >

          {/* Section 5: Testimonials (Ref: Real Stories) */}
          < section className="w-full py-24 bg-card/50" >
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <span className="text-primary font-medium tracking-wider uppercase text-sm">Testimonials</span>
                <h2 className="text-3xl font-bold mt-2">Real Stories, Real Healing — From Our Community</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Small Left */}
                <div className="p-8 rounded-3xl bg-background border border-border/50 h-fit">
                  <h4 className="font-bold text-primary mb-2">Friendly staff review</h4>
                  <p className="text-sm text-muted-foreground mb-6">"The team made every step stress-free and supportive. I finally feel confident about my treatment."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-muted rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Robert Fox</p>
                      <p className="text-xs text-muted-foreground">Regular Patient</p>
                    </div>
                  </div>
                </div>

                {/* Large Center */}
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] group">
                  <Image src="/images/medical-team.png" alt="Featured Patient" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                    <p className="text-lg font-medium italic mb-4">"UroCare didn't just treat my condition; they treated me as a person. The continuous monitoring gave me my life back."</p>
                    <p className="font-bold text-xl">Cody Fisher</p>
                    <p className="text-sm opacity-80">Kidney Surgery • 2024</p>
                  </div>
                </div>

                {/* Small Right */}
                <div className="p-8 rounded-3xl bg-background border border-border/50 h-fit">
                  <h4 className="font-bold text-primary mb-2">Seamless experience</h4>
                  <p className="text-sm text-muted-foreground mb-6">"User friendly, clear instructions, and I felt connected to my care team the whole time."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-muted rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Albert Flores</p>
                      <p className="text-xs text-muted-foreground">Regular Patient</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >

          {/* Section 6: Blog (Ref: Expert Insights) */}
          < section className="w-full py-24" >
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <span className="text-primary font-medium tracking-wider uppercase text-sm">Blog</span>
                  <h2 className="text-3xl font-bold mt-2">Explore Expert Insights for a Healthier, Happier Life</h2>
                </div>
                <p className="text-muted-foreground text-sm max-w-md text-right hidden md:block">
                  Discover expert health insights, wellness advice, and medical updates to help you make informed decisions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group cursor-pointer space-y-4">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                      <Image src="/images/medical-team.png" alt="Blog" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 right-4 bg-white/90 text-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Health
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">A Daily Habit for a Healthier Heart you create.</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">Using corporate services is a fluctuating degree cause of world is the best brighter but ...</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">Read More</span>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section >

        </main >

        {/* Newsletter Section */}
        <section className="w-full py-16 px-4 md:px-6 bg-gradient-to-br from-primary/95 to-primary dark:from-[#0a1a3a] dark:to-primary relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Newsletter Signup - Left Side */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    Stay ahead of your recovery journey
                  </h2>
                  <p className="text-blue-100 dark:text-slate-300 text-base">
                    Get expert insights, wellness guides, and urological health news — delivered monthly.
                  </p>
                </div>

                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 h-12 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Link Columns - Right Side */}
              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
                  <ul className="space-y-2.5">
                    <li><Link href="/" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Home</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">About</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Features</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Blog</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Contact</Link></li>
                  </ul>
                </div>

                {/* Our Platform */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Our Platform</h3>
                  <ul className="space-y-2.5">
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Patient Journey</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Alert System</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Secure Messaging</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Health Library</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Virtual Tour</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Check-in Tools</Link></li>
                  </ul>
                </div>

                {/* For Healthcare Professionals */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Professionals</h3>
                  <ul className="space-y-2.5">
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Our Specialists</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Join as Specialist</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">Pro Dashboard</Link></li>
                    <li><Link href="#" className="text-blue-100 dark:text-slate-300 hover:text-white transition-colors text-sm">How It Works</Link></li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Footer Content (Merged for seamless gradient) */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Activity className="size-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">UroCare</span>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-xs text-blue-200/60 dark:text-slate-400">© 2026 UroCare. All rights reserved.</p>
              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  )
}
