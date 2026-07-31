import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Linkedin, 
  Mail, 
  Palette, 
  Briefcase, 
  GraduationCap, 
  Menu,
  X,
  Instagram,
  Github
} from "lucide-react";
import { PROJECTS, EXPERIENCES, EDUCATION, SKILLS } from "../constants";

export default function Home({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }) {
  const navLinks = [
    { name: "Works", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <div className="flex flex-col lg:flex-row flex-1">
      {/* Sidebar: Profile & Hero */}
      <aside className="w-full lg:w-[450px] lg:border-r border-brand-border flex flex-col p-8 md:p-12 lg:justify-between bg-brand-bg lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto">
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter italic uppercase mb-6">
                ARTISAN DIRECTOR /<br />
                <span className="text-brand-accent">AI ANNOTATOR</span>
              </h1>
              <p className="text-brand-muted text-[13px] leading-relaxed max-w-[320px]">
                Ronnie Yeboah. A fusion of <strong>traditional painting mastery</strong> and <strong>animation precision</strong>. Bridging the gap between classical artistry and modern AI-driven visual solutions.
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Technical Strategy</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.core.map(skill => (
                <span key={skill} className="px-3 py-1 border border-brand-border text-[9px] font-bold uppercase tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6" id="about">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Background</h3>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="border-l border-brand-border pl-4 py-1">
                  <p className="text-xs font-bold uppercase tracking-tight">{edu.degree}</p>
                  <p className="text-[10px] text-brand-muted font-medium uppercase">{edu.school} — {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-brand-border flex items-end justify-between">
          <div>
            <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-1">Available for</p>
            <p className="text-sm font-bold uppercase tracking-tight">New Ventures & Projects</p>
          </div>
          <a href="#contact" className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
            <ArrowRight size={20} />
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-zinc-100">
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 flex-1" id="projects">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`group relative bg-brand-bg border-b border-brand-border p-8 md:p-12 flex flex-col justify-between overflow-hidden transition-colors hover:bg-zinc-50 ${index % 2 === 0 ? "md:border-r" : ""}`}
            >
              <div className="z-10">
                <p className="text-[10px] font-black text-brand-accent uppercase mb-3 tracking-[0.2em]">0{index + 1} / {project.role}</p>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">{project.title}</h2>
                <p className="text-brand-muted text-xs mt-4 max-w-[280px] leading-relaxed uppercase font-medium">{project.description}</p>
              </div>
              
              <div className="mt-12 z-10">
                 <div className="flex flex-wrap gap-2 mb-6 text-brand-muted/40">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest">#{tag.replace(/\s+/g, "")}</span>
                  ))}
                </div>
                <a href={`/portfolio`} className="text-[10px] font-black border-b border-brand-text pb-1 cursor-pointer hover:text-brand-accent hover:border-brand-accent transition-all uppercase tracking-widest">
                  VIEW ALL WORKS
                </a>
              </div>

              {/* Decorative Geometric Shapes */}
              {index === 0 && (
                 <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-zinc-100 rounded-full group-hover:scale-125 duration-700 transition-transform flex items-center justify-center">
                   <div className="w-32 h-32 border border-brand-border rounded-full" />
                 </div>
              )}
              {index === 1 && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 aspect-square border border-brand-border/40 rotate-45 pointer-events-none group-hover:rotate-90 duration-1000 transition-transform" />
              )}
              {index === 2 && (
                 <div className="absolute bottom-0 right-0 flex opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-12 h-64 bg-zinc-200 translate-x-4 rotate-12 group-hover:rotate-0 duration-700"></div>
                    <div className="w-12 h-64 bg-zinc-300 translate-x-2 rotate-12 group-hover:rotate-6 duration-700"></div>
                    <div className="w-12 h-64 bg-zinc-400 rotate-12 group-hover:rotate-12 duration-700"></div>
                 </div>
              )}
            </motion.div>
          ))}

          {/* Archive / More Works Block */}
          <div className="group relative bg-[#F4F4F5] p-8 md:p-12 flex flex-col justify-between overflow-hidden border-b border-brand-border">
             <div className="z-10">
               <p className="text-[10px] font-black text-brand-accent uppercase mb-3 tracking-[0.2em]">04 / ARCHIVE</p>
               <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Discovery<br />Journal</h2>
               <p className="text-brand-muted text-xs mt-4 max-w-[280px] leading-relaxed uppercase font-medium">A deep dive into the creative process, experiments and unreleased concepts.</p>
             </div>
             <div className="mt-12 z-10">
               <a href="/portfolio" className="text-[10px] font-black border-b border-brand-text pb-1 cursor-pointer hover:text-brand-accent hover:border-brand-accent transition-all uppercase tracking-widest">
                 ENTER ARCHIVE
               </a>
             </div>
          </div>

          {/* Final Contact/CTA block in the grid */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-brand-text text-brand-bg relative overflow-hidden h-[400px]" id="contact">
             <div className="z-10 space-y-6">
               <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
                 Start a<br />Conversation
               </h2>
               <p className="text-brand-bg/50 text-[11px] font-bold uppercase tracking-widest max-w-[280px]">Currently open for strategic creative roles and global remote opportunities.</p>
               <div className="pt-4 space-y-3">
                  <a href="mailto:coopedill@gmail.com" className="block text-2xl font-black hover:text-brand-accent transition-colors">COOPEDILL@GMAIL.COM</a>
                  <p className="text-xs font-black text-brand-accent tracking-[0.2em] uppercase">+233 54 959 8055</p>
                  <a 
                    href="https://www.linkedin.com/in/ronnie-yeboah-8a4958231" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-black tracking-[0.15em] uppercase text-brand-bg/80 hover:text-brand-accent transition-colors pt-1"
                  >
                    <Linkedin size={14} /> linkedin.com/in/ronnie-yeboah-8a4958231
                  </a>
               </div>
             </div>
             <div className="absolute -top-12 -right-12 w-64 h-64 border border-brand-bg/10 rounded-full" />
             <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-brand-accent/30 rotate-12" />
          </div>
        </div>

        {/* Detailed Experience section */}
        <section className="p-8 md:p-12 border-t border-brand-border bg-brand-bg" id="experience">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-muted mb-16">Professional Experience</h3>
          <div className="space-y-16">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 group">
                <span className="text-[11px] font-black text-brand-accent uppercase tracking-widest w-40 shrink-0">{exp.period}</span>
                <div className="flex-1 space-y-2 text-brand-text">
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-brand-accent transition-colors">{exp.role}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">{exp.company}</p>
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 pt-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-[10px] text-brand-muted leading-relaxed uppercase font-black border-l border-brand-border pl-4">{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
