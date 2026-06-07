'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function CreativePortfolio({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-[#fff0f3] text-[#ff0054] font-sans selection:bg-[#ff0054] selection:text-white">
      <Navbar name={data.name} theme="creative" />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-40">
          <motion.div
            initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            className="inline-block bg-[#ff0054] text-white px-6 py-2 rounded-full font-bold text-lg mb-10 shadow-[8px_8px_0px_#ffccd5]"
          >
            Creative Technologist
          </motion.div>
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-12"
          >
            Creating <br/> With <br/> Purpose.
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-10 items-end">
            <p className="text-2xl font-bold max-w-md leading-tight text-[#ff0054]/80">
              {data.tagline || "Blending experimental design with robust engineering to build unforgettable digital landscapes."}
            </p>
            <div className="h-40 w-40 bg-[#ff0054] rounded-full flex items-center justify-center text-white font-black text-center animate-bounce">
              HIRE <br/> ME
            </div>
          </div>
        </header>

        <section id="projects" className="mb-40">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-20 italic">The Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-6 h-64 bg-gradient-to-br from-[#ff0054] to-[#ff8fa3] rounded-3xl shadow-[12px_12px_0px_#ffccd5] flex items-center justify-center overflow-hidden group">
                   <span className="text-white font-black text-6xl opacity-20 group-hover:scale-150 transition-transform duration-500">{project.title[0]}</span>
                </div>
                <ProjectCard project={project} theme="creative" />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="mb-40 bg-white border-4 border-[#ff0054] rounded-[3rem] p-10 md:p-20 shadow-[15px_15px_0px_#ffccd5]">
           <h2 className="text-4xl font-black uppercase mb-10 underline decoration-8 decoration-[#ffccd5]">Biography</h2>
           <div 
              className="prose prose-2xl max-w-none prose-p:text-[#ff0054] prose-strong:text-[#ff0054] prose-headings:text-[#ff0054]"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
        </section>

        <footer id="contact" className="py-20 text-center">
          <h2 className="text-[10vw] font-black uppercase mb-10">Say Hello</h2>
          <a href={`mailto:${data.email}`} className="text-4xl font-black hover:bg-[#ff0054] hover:text-white px-6 py-2 transition-colors border-4 border-[#ff0054]">
            {data.email}
          </a>
          <div className="flex justify-center gap-10 mt-20 font-bold uppercase tracking-widest">
            <a href={data.github}>GitHub</a>
            <a href={data.linkedin}>LinkedIn</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
