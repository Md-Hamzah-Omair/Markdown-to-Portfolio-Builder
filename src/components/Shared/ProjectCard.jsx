'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ProjectCard({ project, theme = 'minimal' }) {
  const isDark = ['dark-saas', 'hacker-terminal', 'cyberpunk'].includes(theme);

  const cardStyles = {
    minimal: "bg-white border border-slate-200 rounded-none",
    'dark-saas': "bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.05)]",
    'hacker-terminal': "bg-black border-2 border-green-900 rounded-sm font-mono relative overflow-hidden",
    executive: "bg-white border-l-4 border-navy-900 shadow-sm",
    creative: "bg-white border-2 border-black rounded-3xl overflow-hidden",
    cyberpunk: "bg-black border-r-4 border-b-4 border-magenta-500 rounded-none relative skew-x-[-2deg]",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "p-6 transition-all duration-300",
        cardStyles[theme] || cardStyles.minimal
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={cn(
          "text-xl font-bold",
          theme === 'hacker-terminal' && "text-green-400 uppercase",
          theme === 'cyberpunk' && "text-magenta-500 italic"
        )}>
          {project.title}
        </h3>
        <div className="flex gap-2">
          {project.github && <a href={project.github} className="opacity-60 hover:opacity-100 transition-opacity"><Code size={18} /></a>}
          {project.link && <a href={project.link} className="opacity-60 hover:opacity-100 transition-opacity"><ExternalLink size={18} /></a>}
        </div>
      </div>
      
      <p className={cn(
        "text-sm mb-6 leading-relaxed",
        isDark ? "text-slate-400" : "text-slate-600"
      )}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech?.map((t) => (
          <span 
            key={t}
            className={cn(
              "text-[10px] px-2 py-0.5 font-semibold tracking-wider uppercase",
              theme === 'hacker-terminal' ? "bg-green-900/30 text-green-500 border border-green-800" :
              theme === 'cyberpunk' ? "bg-magenta-900/30 text-magenta-400 border border-magenta-800" :
              isDark ? "bg-white/5 text-slate-300 border border-white/10" : "bg-slate-100 text-slate-600 border border-slate-200"
            )}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
