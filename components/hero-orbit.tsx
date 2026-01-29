"use client"

import React from "react"
import { motion } from "framer-motion"

export const HeroOrbit = () => {
  return (
    <div className="relative flex size-full max-w-2xl items-center justify-center scale-100 sm:scale-100">
      {/* Center content - Text Only (No container) */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none">
        <h3 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tighter drop-shadow-2xl">
          12k+
        </h3>
        <p className="text-xs md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
          Active Users
        </p>
      </div>

      {/* Orbit 1 - Inner Ring (Avatars & Chat) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute flex size-[140px] sm:size-[240px] md:size-[320px] border border-slate-400/40 dark:border-white/15 rounded-full"
      >
        {/* Item 1: Avatar (Doctor) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center size-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-[0_0_20px_-5px_rgba(59,130,246,0.6)] ring-2 ring-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
        </div>
        {/* Item 2: App Icon (Chat) */}
        <div className="absolute bottom-1/4 right-[10%] backdrop-blur-md">
          <div className="relative flex items-center justify-center size-12 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 dark:text-purple-400"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
          </div>
        </div>
      </motion.div>

      {/* Orbit 2 - Middle Ring (Health Icons) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute flex size-[210px] sm:size-[360px] md:size-[500px] border border-slate-400/30 dark:border-white/10 rounded-full"
      >
        {/* Item 1: App Icon (Heart) - Floating nicely */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center size-14 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-[0_0_25px_-5px_rgba(244,63,94,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
          </div>
        </div>
        {/* Item 2: Avatar (Patient) */}
        <div className="absolute bottom-[10%] right-[15%]">
          <div className="relative flex items-center justify-center size-12 rounded-full bg-gradient-to-bl from-emerald-400 to-teal-600 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] ring-2 ring-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
          </div>
        </div>
      </motion.div>

      {/* Orbit 3 - Outer Ring (Activity/Stats) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute flex size-[280px] sm:size-[480px] md:size-[680px] border border-slate-400/25 dark:border-white/[0.07] rounded-full"
      >
        {/* Item 1: App Icon (Activity) */}
        <div className="absolute top-[15%] right-[15%]">
          <div className="relative flex items-center justify-center size-16 rounded-2xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </div>
        </div>
        {/* Item 2: App Icon (Pill) */}
        <div className="absolute bottom-1/2 left-[5%] -translate-x-1/2">
          <div className="relative flex items-center justify-center size-12 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 dark:text-yellow-400"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>
          </div>
        </div>
      </motion.div>

      {/* Glow Effect - Central focus */}
      <div className="absolute inset-0 -z-10 bg-primary/20 blur-[100px] rounded-full opacity-50" />
    </div>
  )
}
