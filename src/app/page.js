'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Terminal, User } from 'lucide-react';
import projectsData from '@/content/projects-data.json';

export default function ZeroConfigPage() {
  const { name, avatar_url, aboutMeExpanded, projects } = projectsData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)]" />
        <div className="max-w-4xl mx-auto relative flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
            <img 
              src={avatar_url} 
              alt={name} 
              className="w-32 h-32 rounded-full border-2 border-white/10 relative z-10"
            />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
          >
            {name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 text-sm font-medium text-slate-400"
          >
            <span className="flex items-center gap-2"><Terminal size={14} /> Full Stack Aspirant</span>
            <span className="flex items-center gap-2"><Code size={14} /> BCA Student</span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <User size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white">Engineering Narrative</h2>
        </div>
        <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6">
          {aboutMeExpanded.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Code size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white">Strategic Deployments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:border-indigo-500/50"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <a href={project.url} className="text-slate-500 hover:text-white transition-colors">
                  <Github size={18} />
                </a>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md font-bold uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 {name} — Built Autonomously with Portfolio Builder</p>
      </footer>
    </div>
  );
}
