/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Linkedin, 
  Menu,
  X,
  Instagram,
  Github
} from "lucide-react";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isPortfolioPage = location.pathname === "/portfolio";

  const navLinks = [
    { name: "Works", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Archive", href: "/portfolio" },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-white">
      {!isPortfolioPage && (
        <nav className="h-16 border-b border-brand-border bg-brand-bg flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-text flex items-center justify-center text-brand-bg font-bold text-xs uppercase text-white">RY</div>
            <span className="font-bold tracking-tight text-[10px] md:text-xs uppercase whitespace-nowrap">Ronnie Yeboah — Portfolio 2026</span>
          </Link>
          
          <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              link.href.startsWith("/#") ? (
                <a key={link.name} href={link.href} className="text-brand-muted hover:text-brand-text transition-colors">
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.href} className="text-brand-muted hover:text-brand-text transition-colors">
                  {link.name}
                </Link>
              )
            ))}
            <a href="#contact" className="text-brand-accent">Contact</a>
          </div>

          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-bg pt-24 px-6 md:hidden flex flex-col gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.href.startsWith("/#") ? (
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-bold italic tracking-tighter"
                  >
                    {link.name.toUpperCase()}
                  </a>
                ) : (
                  <Link 
                    to={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-bold italic tracking-tighter"
                  >
                    {link.name.toUpperCase()}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.a 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-brand-accent italic tracking-tighter"
            >
              CONTACT
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>

      {!isPortfolioPage && (
        <footer className="h-12 border-t border-brand-border bg-brand-bg flex items-center justify-between px-6 md:px-10 text-[9px] uppercase tracking-[0.25em] font-black text-brand-muted shrink-0 z-10 sticky bottom-0">
          <div className="flex gap-4 md:gap-8 items-center">
            <span className="hidden sm:inline">Based in Accra, GH — UTC + 0:00</span>
            <span className="text-brand-border">/</span>
            <span className="animate-pulse flex items-center gap-2 text-brand-text">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Live Availability
            </span>
          </div>
          <div className="flex gap-4 md:gap-8">
            <a href="https://www.linkedin.com/in/ronnie-yeboah-8a4958231" target="_blank" rel="noopener noreferrer" className="text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1"><Linkedin size={10}/> LinkedIn</a>
            <a href="#" className="hidden sm:flex text-brand-text hover:text-brand-accent transition-colors items-center gap-1"><Instagram size={10}/> Instagram</a>
            <a href="https://github.com/R-on12" target="_blank" rel="noopener noreferrer" className="text-brand-text hover:text-brand-accent transition-colors flex items-center gap-1"><Github size={10}/> Github</a>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
