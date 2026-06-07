import React from 'react';

export default function MinimalTheme({ data, htmlContent }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-16 border-b pb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{data.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{data.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {data.email && <a href={`mailto:${data.email}`} className="hover:text-blue-600 transition-colors">Email</a>}
            {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>}
            {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>}
          </div>
        </header>

        <section className="mb-16">
          <div 
            className="prose prose-slate max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </section>

        <section className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t text-center text-gray-400 text-xs">
          Built with Markdown Portfolio Builder
        </footer>
      </div>
    </div>
  );
}
