'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Code } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import aiTheme from '@/content/ai-theme.json';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function DynamicAITheme({ data, htmlContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const t = aiTheme;

  return (
    <div className={cn("min-h-screen transition-colors duration-500", t.bgClass, t.textClass, t.fontFamily)}>
      {/* Dynamic Navbar */}
      <nav className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? cn(t.navClass, 'py-3 shadow-lg border-b') : 'bg-transparent py-5'
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tighter">{data.name}</a>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:opacity-70 transition-opacity">
                {link.name}
              </a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={cn('md:hidden border-b overflow-hidden', t.navClass)}
            >
              <div className="px-6 py-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium">
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-40 pb-20">
        <header className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl opacity-70 max-w-2xl"
          >
            {data.tagline}
          </motion.p>
        </header>

        <section id="about" className="mb-32">
          <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-8 border-l-4 pl-4", t.accentClass)}>Biography</h2>
          <div 
            className="prose prose-xl prose-invert max-w-none prose-p:opacity-80"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </section>

        <section id="projects" className="mb-32">
          <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-12 border-l-4 pl-4", t.accentClass)}>Deployments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects?.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -5 }}
                className={cn("p-8 transition-all border shadow-xl", t.cardClass, t.borderRadius)}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="flex gap-3">
                    {project.github && <a href={project.github} className="opacity-50 hover:opacity-100"><Code size={20} /></a>}
                    {project.link && <a href={project.link} className="opacity-50 hover:opacity-100"><ExternalLink size={20} /></a>}
                  </div>
                </div>
                <p className="opacity-70 mb-8 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech) => (
                    <span key={tech} className={cn("text-[10px] px-3 py-1 font-bold uppercase tracking-wider border opacity-80", t.borderRadius, t.accentClass)}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-32">
          <h2 className={cn("text-sm font-bold uppercase tracking-widest mb-12 border-l-4 pl-4", t.accentClass)}>Technical Skills</h2>
          <div className="flex flex-wrap gap-4">
            {data.skills?.map((skill) => (
              <span key={skill} className={cn("px-6 py-2 border font-bold uppercase tracking-tighter", t.borderRadius, t.accentClass)}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <footer id="contact" className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50">
          <p>© 2026 {data.name}</p>
          <div className="flex gap-8">
            <a href={data.github} className="hover:opacity-100">GitHub</a>
            <a href={data.linkedin} className="hover:opacity-100">LinkedIn</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
