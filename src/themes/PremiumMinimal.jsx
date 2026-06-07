'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function PremiumMinimal({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar name={data.name} theme="minimal" />
      
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl font-black tracking-tighter leading-tight mb-8"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-slate-500 max-w-2xl"
          >
            {data.tagline || "Building digital experiences with precision and minimalist aesthetics."}
          </motion.p>
        </header>

        <section id="about" className="mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-2">About</h2>
          </div>
          <div className="md:col-span-8">
            <div 
              className="prose prose-xl prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </div>
        </section>

        <section id="projects" className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-2 mb-12">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {data.projects?.map((project) => (
              <ProjectCard key={project.title} project={project} theme="minimal" />
            ))}
          </div>
        </section>

        <footer id="contact" className="pt-20 border-t border-black flex justify-between items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-4">Let's Connect</p>
            <a href={`mailto:${data.email}`} className="text-4xl font-bold hover:underline">{data.email}</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 {data.name}</p>
        </footer>
      </main>
    </div>
  );
}
