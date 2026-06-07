'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Shared/Navbar';
import ProjectCard from '@/components/Shared/ProjectCard';

export default function CorporateExecutive({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif selection:bg-[#c5a059]/20">
      <Navbar name={data.name} theme="executive" />
      
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-80 h-screen sticky top-0 bg-[#f8f9fa] border-r border-slate-200 p-12">
          <div className="mb-20">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-navy-900">{data.name}</h2>
            <p className="text-sm text-slate-500 font-sans uppercase tracking-widest">{data.title}</p>
          </div>
          
          <nav className="flex flex-col space-y-6 text-sm font-sans font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-navy-900 transition-colors">Biography</a>
            <a href="#projects" className="hover:text-navy-900 transition-colors">Portfolio</a>
            <a href="#skills" className="hover:text-navy-900 transition-colors">Expertise</a>
            <a href="#contact" className="hover:text-navy-900 transition-colors">Consultation</a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 md:px-20 pt-40 pb-20">
          <section id="about" className="mb-32">
            <header className="mb-16">
              <motion.h1 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl font-bold text-navy-900 mb-8 leading-tight"
              >
                Executive Vision & <br/> Strategic Implementation.
              </motion.h1>
              <div className="h-1 w-20 bg-[#c5a059]" />
            </header>
            
            <div 
              className="prose prose-xl prose-slate max-w-none prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </section>

          <section id="projects" className="mb-32">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl font-bold text-navy-900 whitespace-nowrap">Case Studies</h2>
              <div className="h-px w-full bg-slate-200" />
            </div>
            
            <div className="space-y-12">
              {data.projects?.map((project) => (
                <div key={project.title} className="relative pl-12 border-l-2 border-slate-100 pb-12 last:pb-0">
                  <div className="absolute top-0 left-[-6px] w-[11px] h-[11px] bg-[#c5a059] rounded-full" />
                  <ProjectCard project={project} theme="executive" />
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="mb-32">
            <h2 className="text-4xl font-bold text-navy-900 mb-16">Core Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {data.skills?.map((skill) => (
                <div key={skill} className="group">
                  <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-hover:text-[#c5a059] transition-colors">{skill}</p>
                  <div className="h-px w-full bg-slate-100" />
                </div>
              ))}
            </div>
          </section>

          <footer id="contact" className="py-20 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start gap-12 font-sans">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Contact Inquiries</p>
              <a href={`mailto:${data.email}`} className="text-2xl font-bold hover:text-[#c5a059] transition-colors">{data.email}</a>
            </div>
            <div className="text-right md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Socials</p>
              <div className="flex gap-6">
                <a href={data.github} className="hover:text-[#c5a059] transition-colors">GitHub</a>
                <a href={data.linkedin} className="hover:text-[#c5a059] transition-colors">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
