import React from 'react';

export default function TerminalTheme({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 sm:p-10 selection:bg-green-900 selection:text-white">
      <div className="max-w-4xl mx-auto border-2 border-green-900 p-6 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
        <header className="mb-10 border-b-2 border-green-900 pb-6">
          <div className="text-xs mb-2 opacity-50 underline">System.Identity.Root:</div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter mb-1">
            {'>'} {data.name} <span className="animate-pulse">_</span>
          </h1>
          <p className="text-lg opacity-80 mb-6 italic"># {data.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm opacity-70">
            <div>[EMAIL] : {data.email}</div>
            <div>[GITHUB]: {data.github?.split('/').pop()}</div>
            <div>[LINKEDIN]: {data.linkedin?.split('/').pop()}</div>
          </div>
        </header>

        <section className="mb-10">
          <div className="text-xs mb-4 opacity-50">[CONTENT_DUMP]:</div>
          <div 
            className="prose prose-invert max-w-none prose-green
              prose-headings:text-green-400 prose-headings:font-bold prose-headings:uppercase 
              prose-p:text-green-500 prose-li:text-green-500 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </section>

        <section className="mb-10">
          <div className="text-xs mb-4 opacity-50">[MODULES_LOADED]:</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 uppercase text-sm font-bold">
            {data.skills?.map((skill) => (
              <span key={skill} className="before:content-['*'] before:mr-2">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t-2 border-green-900 text-xs opacity-40 text-center">
          (C) 2026 {data.name} - ACCESS GRANTED
        </footer>
      </div>
    </div>
  );
}
