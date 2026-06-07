'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function DarkSaaS({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Navbar name={data.name} theme="dark-saas" />
      
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-6xl mx-auto px-6 pt-40 pb-20">
        <header className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-indigo-400"
          >
            Available for New Projects
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-8"
          >
            {data.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            {data.title}. Focused on building high-performance web applications with modern technologies.
          </motion.p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all">Get in touch</button>
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 transition-all">View Projects</button>
          </div>
        </header>

        <section id="projects" className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Projects</h2>
              <p className="text-slate-400">A showcase of my latest work and contributions.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects?.map((project) => (
              <ProjectCard key={project.title} project={project} theme="dark-saas" />
            ))}
          </div>
        </section>

        <section id="about" className="mb-32 p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-8">Engineering Philosophy</h2>
          <div 
            className="prose prose-invert max-w-none prose-indigo prose-p:text-slate-400"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </section>

        <footer id="contact" className="text-center py-20 border-t border-white/5">
          <p className="text-slate-500 mb-2">Developed by {data.name}</p>
          <p className="text-slate-600 text-sm">Powered by Portfolio Builder © 2026</p>
        </footer>
      </main>
    </div>
  );
}
