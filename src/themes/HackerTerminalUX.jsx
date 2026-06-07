'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function HackerTerminalUX({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white">
      <Navbar name={data.name} theme="hacker-terminal" />
      
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-20 border-2 border-green-900 p-8 relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-black px-2 text-xs text-green-700">SYSTEM_HEADER</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs mb-4 opacity-50"
          >
            [LOG]: INITIALIZING_BIOMETRIC_SCAN... SUCCESS
          </motion.div>
          <motion.h1 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="text-4xl md:text-6xl font-bold uppercase overflow-hidden whitespace-nowrap mb-4"
          >
            {'>'} {data.name}
          </motion.h1>
          <p className="text-xl opacity-80 mb-6 italic"># {data.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs opacity-60">
            <div>STATUS: ACTIVE</div>
            <div>LOCATION: REMOTE</div>
            <div>ENCRYPTION: AES-256</div>
            <div>UPLINK: STABLE</div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-10">
            <section className="border-2 border-green-900 p-6 relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-black px-2 text-xs text-green-700">CORE_MODULES</div>
              <div className="flex flex-wrap gap-2">
                {data.skills?.map((skill) => (
                  <span key={skill} className="text-xs border border-green-800 px-2 py-1 hover:bg-green-900/30 transition-colors">
                    {skill}.exe
                  </span>
                ))}
              </div>
            </section>

            <section className="border-2 border-green-900 p-6 relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-black px-2 text-xs text-green-700">NETWORK_NODES</div>
              <div className="space-y-2 text-sm">
                <a href={data.github} className="block hover:text-white transition-colors underline">~/github</a>
                <a href={data.linkedin} className="block hover:text-white transition-colors underline">~/linkedin</a>
                <a href={`mailto:${data.email}`} className="block hover:text-white transition-colors underline">~/email</a>
              </div>
            </section>
          </aside>

          <div className="lg:col-span-8 space-y-10">
            <section id="about" className="border-2 border-green-900 p-8 relative">
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-black px-2 text-xs text-green-700">DATA_DUMP</div>
              <div 
                className="prose prose-invert max-w-none prose-green prose-p:text-green-500/80 prose-headings:text-green-400"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
              />
            </section>

            <section id="projects" className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-green-900"></div>
                <h2 className="text-lg font-bold uppercase tracking-widest">Deployments</h2>
                <div className="h-px flex-1 bg-green-900"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects?.map((project) => (
                  <ProjectCard key={project.title} project={project} theme="hacker-terminal" />
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-20 py-10 border-t-2 border-green-900 text-center text-xs opacity-40">
          <p>TERMINAL v4.0.2 - CONNECTION_RETAINED</p>
          <p className="mt-2">UNAUTHORIZED ACCESS IS PROHIBITED</p>
        </footer>
      </main>
    </div>
  );
}
