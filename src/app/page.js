'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitHub, Code, Terminal, User, Briefcase, GraduationCap, Mail, MessageSquare } from 'lucide-react';
import projectsData from '@/content/projects-data.json';
import config from '@/content/config.json';
import aiThemeData from '@/content/ai-theme.json';

// Safe utility for Tailwind class merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function ZeroConfigPage() {
  const { 
    name, 
    avatar_url, 
    title,
    aboutMeExpanded, 
    featuredProjects = [], 
    standardProjects = [],
    experience = [],
    education = [],
    customSections = [],
    socials = {},
    aiTheme = null
  } = projectsData || {};

  // Unified display variables
  const displayName = name || config.name;
  const displayTitle = title || config.title;
  const displayExperience = experience.length > 0 ? experience : config.experience;
  const displayEducation = education.length > 0 ? education : config.education;
  const displaySocials = { ...config.socials, ...socials };

  // Theme configuration with immediate update support
  const t = aiTheme || aiThemeData || {
    bgClass: "bg-slate-950",
    textClass: "text-slate-200",
    accentClass: "text-indigo-400 border-indigo-500",
    cardClass: "bg-white/5 border-white/10",
    navClass: "bg-slate-950/80 backdrop-blur-md",
    fontFamily: "font-sans",
    borderRadius: "rounded-2xl"
  };

  // Helper to extract colors from Tailwind classes
  const getTextColor = () => t.accentClass.split(' ')[0];
  const getBorderColor = () => t.accentClass.split(' ')[1] || 'border-indigo-500';
  const getBgColor = () => getTextColor().replace('text', 'bg');

  return (
    <div className={cn("min-h-screen transition-colors duration-500", t.bgClass, t.textClass, t.fontFamily)}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,70,229,0.15),transparent)]" />
        <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-10 relative"
          >
            <div className={cn("absolute inset-0 blur-3xl opacity-20 animate-pulse", getBgColor())} />
            {avatar_url ? (
              <img 
                src={avatar_url} 
                alt={displayName} 
                className={cn("w-40 h-40 border-4 border-white/5 relative z-10 shadow-2xl", t.borderRadius)}
              />
            ) : (
              <div className={cn("w-40 h-40 border-4 border-white/5 relative z-10 bg-slate-900 flex items-center justify-center text-slate-500 shadow-2xl", t.borderRadius)}>
                <User size={64} />
              </div>
            )}
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500"
          >
            {displayName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl"
          >
            {displayTitle}
          </motion.p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-40">
        
        {/* About Section */}
        <section id="about">
          <div className="flex items-center gap-4 mb-12">
            <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
              <User size={24} className={getTextColor()} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Engineering Narrative</h2>
          </div>
          <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8">
            {(aboutMeExpanded || "Building the future of web development.").split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section id="featured">
            <div className="flex items-center gap-4 mb-12">
              <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
                <Code size={24} className={getTextColor()} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Featured Contributions</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  whileHover={{ scale: 1.02 }}
                  className={cn("group p-8 transition-all border relative overflow-hidden", t.cardClass, t.borderRadius)}
                >
                  <h3 className={cn("text-2xl font-bold text-white mb-4 transition-colors group-hover:text-opacity-80", getTextColor())}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                    {project.summary}
                  </p>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className={cn("px-3 py-1 bg-opacity-10 border rounded-lg text-xs font-bold uppercase tracking-wider", getBgColor(), getTextColor(), getBorderColor())}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a href={project.url} className={cn("p-3 bg-white/5 rounded-full transition-all hover:text-black", `hover:${getBgColor()}`)}>
                      <Code size={20} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <section id="experience">
            <div className="flex items-center gap-4 mb-12">
              <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
                <Briefcase size={24} className={getTextColor()} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Experience</h2>
            </div>
            <div className="space-y-10">
              {displayExperience.map((exp, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10">
                  <div className={cn("absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full shadow-lg", getBgColor())} />
                  <h4 className="text-xl font-bold text-white mb-1">{exp.role}</h4>
                  <p className={cn("font-medium mb-4", getTextColor())}>{exp.company} — {exp.duration}</p>
                  <p className="text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="flex items-center gap-4 mb-12">
              <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
                <GraduationCap size={24} className={getTextColor()} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Education</h2>
            </div>
            <div className="space-y-10">
              {displayEducation.map((edu, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10">
                  <div className={cn("absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full shadow-lg", getBgColor())} />
                  <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                  <p className={cn("font-medium mb-4", getTextColor())}>{edu.institution} — {edu.duration}</p>
                  <p className="text-slate-400 leading-relaxed">{edu.details}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Dynamic Custom Sections */}
        {customSections.map((section, idx) => (
          <section key={idx} id={section.sectionTitle.toLowerCase().replace(/\s/g, '-')}>
            <div className="flex items-center gap-4 mb-12">
              <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
                <Terminal size={24} className={getTextColor()} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">{section.sectionTitle}</h2>
            </div>
            <div className="text-slate-400 text-lg leading-relaxed">
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-5 space-y-2">
                  {section.content.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          </section>
        ))}

        {/* Repository Archive */}
        <section id="archive">
          <div className="flex items-center gap-4 mb-12">
            <div className={cn("p-3 bg-opacity-10 rounded-xl border", getBgColor(), getBorderColor())}>
              <Code size={24} className={getTextColor()} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Repository Archive</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standardProjects.map((project, i) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -5 }}
                className={cn("group p-6 transition-all border", t.cardClass, t.borderRadius)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-opacity-80 transition-colors">
                    {project.title}
                  </h3>
                  <a href={project.url} className="text-slate-500 hover:text-white transition-colors">
                    <Code size={18} />
                  </a>
                </div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t_tech) => (
                    <span key={t_tech} className={cn("text-[10px] px-2 py-0.5 bg-opacity-10 border rounded-md font-bold uppercase tracking-wider", getBgColor(), getTextColor(), getBorderColor())}>
                      {t_tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Let's connect and build.</h2>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {displaySocials.email && (
                <a href={`mailto:${displaySocials.email}`} className={cn("flex items-center gap-3 px-8 py-4 text-white font-bold transition-all shadow-xl", getBgColor(), t.borderRadius)}>
                  <Mail size={20} /> Email Me
                </a>
              )}
              <a href={config.linkedin_url} target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold transition-all", t.borderRadius)}>
                <MessageSquare size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm mb-4">© 2026 {displayName} — Developed Autonomously</p>
      </footer>
    </div>
  );
}
