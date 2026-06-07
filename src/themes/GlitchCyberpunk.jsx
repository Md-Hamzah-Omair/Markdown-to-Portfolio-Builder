'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function GlitchCyberpunk({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ff00ff] font-mono selection:bg-[#00ffff] selection:text-black overflow-x-hidden">
      <Navbar name={data.name} theme="cyberpunk" />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative">
        <header className="mb-40 relative">
          <div className="absolute -left-20 top-0 text-[20rem] font-black opacity-5 select-none pointer-events-none">2077</div>
          <motion.h1 
            initial={{ skewX: 20, opacity: 0 }}
            animate={{ skewX: -10, opacity: 1 }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 relative inline-block group"
          >
            <span className="relative z-10">{data.name}</span>
            <span className="absolute top-0 left-0 -z-10 text-[#00ffff] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform">
              {data.name}
            </span>
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-8 items-start mt-10">
            <div className="bg-[#ff00ff] text-black px-4 py-2 font-black uppercase skew-x-[-15deg]">
              {data.title}
            </div>
            <p className="text-xl max-w-lg text-[#00ffff] font-bold uppercase tracking-widest leading-none">
              // NO_FUTURE_BUT_CODE <br/>
              // DATA_HEIST_IN_PROGRESS
            </p>
          </div>
        </header>

        <section id="projects" className="mb-40">
          <h2 className="text-4xl font-black uppercase mb-20 flex items-center gap-4">
            <span className="h-8 w-8 bg-[#00ffff] animate-pulse"></span>
            PROJECT_DATABASE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.projects?.map((project) => (
              <ProjectCard key={project.title} project={project} theme="cyberpunk" />
            ))}
          </div>
        </section>

        <section id="about" className="mb-40 relative">
          <div className="absolute right-0 top-0 h-full w-1 bg-[#00ffff]/20"></div>
          <div className="bg-black border-2 border-[#ff00ff] p-10 md:p-20 relative shadow-[10px_10px_0px_#00ffff]">
             <div className="absolute top-0 right-10 bg-[#ff00ff] text-black px-2 text-xs font-black">LOG_V.01</div>
             <h2 className="text-3xl font-black uppercase mb-10 text-[#00ffff]">Biometric_Data</h2>
             <div 
              className="prose prose-invert max-w-none prose-pink prose-p:text-[#ff00ff]/80 prose-strong:text-[#00ffff]"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </div>
        </section>

        <footer id="contact" className="py-20 border-t-4 border-[#00ffff] relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
               <h3 className="text-2xl font-black uppercase mb-8 underline">Establish_Link</h3>
               <a href={`mailto:${data.email}`} className="text-3xl font-black hover:text-white transition-colors">{data.email}</a>
            </div>
            <div className="flex flex-col gap-4 text-right">
              <a href={data.github} className="text-xl hover:bg-[#ff00ff] hover:text-black px-4 transition-all">LINK_GITHUB</a>
              <a href={data.linkedin} className="text-xl hover:bg-[#00ffff] hover:text-black px-4 transition-all">LINK_LINKEDIN</a>
            </div>
          </div>
          <div className="mt-20 text-center text-[10px] tracking-[1em] opacity-30">
             SYSTEM_OVERRIDE_ACTIVE // PORTFOLIO_BUILDER_V1
          </div>
        </footer>
      </main>
    </div>
  );
}
