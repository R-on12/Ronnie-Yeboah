import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS as DEFAULT_PROJECTS, Project } from "../constants";
import { ArrowLeft, ExternalLink, Plus, X, Upload, Image as ImageIcon, Trash2, LogIn } from "lucide-react";
import { db, auth, handleFirestoreError, OperationType } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: "",
    role: "",
    tags: ""
  });

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => setUser(u));
    
    // Subscribe to projects in Firestore
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubProjects = onSnapshot(q, (snapshot) => {
      const fbProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      // Merge with default projects to ensure there's always content
      const merged = [...fbProjects, ...DEFAULT_PROJECTS.filter(dp => !fbProjects.find(fp => fp.id === dp.id))];
      setProjects(merged);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "projects");
    });

    return () => {
      unsubAuth();
      unsubProjects();
    };
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "projects"), {
        ...newProject,
        tags: newProject.tags.split(",").map(t => t.trim()),
        createdAt: serverTimestamp()
      });
      setShowUploadModal(false);
      setNewProject({ title: "", description: "", imageUrl: "", role: "", tags: "" });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "projects");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!user || !window.confirm("Delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  const handleAIGenerate = async () => {
    if (!newProject.title) return;
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProject.title,
          description: newProject.description,
          prompt: "Artisan style, traditional painting"
        }),
      });
      const data = await response.json();
      if (data.imageUrl) {
        setNewProject({ ...newProject, imageUrl: data.imageUrl });
      } else {
        throw new Error(data.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("AI generation failed. Please try again or check your console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isAdmin = user?.email === "coopedill@gmail.com";

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col selection:bg-brand-accent selection:text-white">
      <nav className="h-16 border-b border-brand-border flex items-center justify-between px-6 md:px-10 sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md">
        <a href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-full border border-brand-border group-hover:bg-brand-text group-hover:text-brand-bg transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Back to Overview</span>
        </a>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:block font-black text-[10px] uppercase tracking-widest text-brand-muted">Ronnie Yeboah / Archive / 2026</div>
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 bg-brand-accent text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                >
                  <Plus size={14} /> Add Work
                </button>
              )}
              <button onClick={() => signOut(auth)} className="text-[10px] font-black uppercase text-brand-muted hover:text-brand-text">Sign Out</button>
            </div>
          ) : (
            <button onClick={handleLogin} className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-muted hover:text-brand-text">
              <LogIn size={14} /> Admin
            </button>
          )}
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]"
            >
              Project<br /><span className="text-brand-accent">Archive</span>
            </motion.h1>
            <p className="text-brand-muted text-[13px] font-black uppercase tracking-widest mt-8 max-w-lg leading-relaxed border-l-2 border-brand-accent pl-6">
              A responsive visual journal of experiments, commissioned works, and creative breakthroughs.
            </p>
          </header>

          {loading ? (
            <div className="h-64 flex items-center justify-center font-black animate-pulse uppercase tracking-[0.3em] text-brand-muted italic">Loading Archive...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-brand-bg group hover:bg-zinc-50 transition-all flex flex-col relative"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 relative">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted/20">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    
                    {/* Admin Actions */}
                    {isAdmin && project.id.length > 5 && ( // Simplistic way to identify non-static projects
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    
                    <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-colors pointer-events-none" />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-between flex-1 border-t border-brand-border">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em]">{index < 9 ? `0${index + 1}` : index + 1} / {project.role}</span>
                        <ExternalLink size={16} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                      <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-4 group-hover:text-brand-accent transition-colors">{project.title}</h3>
                      <p className="text-[11px] font-bold text-brand-muted uppercase leading-relaxed tracking-wider mb-8">{project.description}</p>
                    </div>

                    <div className="space-y-4 mt-auto pt-6 border-t border-brand-border/50">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase text-brand-text/30 tracking-widest bg-zinc-100 px-2 py-1">#{tag.replace(/\s+/g, "")}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-text/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-bg w-full max-w-xl p-10 rounded-none border border-brand-border"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Add New Work</h2>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Project Title</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-zinc-50 border border-brand-border p-3 text-sm focus:outline-none focus:border-brand-accent font-bold uppercase transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Role</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.role}
                      onChange={e => setNewProject({...newProject, role: e.target.value})}
                      className="w-full bg-zinc-50 border border-brand-border p-3 text-sm focus:outline-none focus:border-brand-accent font-bold uppercase transition-colors" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Project Cover Image</label>
                    <div className="border-2 border-dashed border-brand-border p-8 text-center bg-zinc-50 flex flex-col items-center justify-center gap-4 group/drop transition-all hover:bg-zinc-100 min-h-[200px]">
                      {newProject.imageUrl ? (
                        <div className="relative w-full group">
                          <img 
                            src={newProject.imageUrl} 
                            alt="Preview" 
                            className="w-full aspect-video object-cover border border-brand-border"
                          />
                          <button 
                            type="button"
                            onClick={() => setNewProject({...newProject, imageUrl: ""})}
                            className="absolute top-2 right-2 bg-brand-text text-brand-bg p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-brand-border/30 flex items-center justify-center text-brand-muted">
                            <ImageIcon size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-text mb-1">No Image Selected</p>
                            <p className="text-[9px] font-bold text-brand-muted uppercase">Generate a unique cover using AI</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-sm">
                            <button
                              type="button"
                              disabled={!newProject.title || isGenerating}
                              onClick={handleAIGenerate}
                              className="flex-1 bg-brand-text text-brand-bg px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                              {isGenerating ? (
                                <span className="animate-spin text-brand-accent">✸</span>
                              ) : (
                                <span className="text-brand-accent">✸</span>
                              )}
                              {isGenerating ? "Synthesizing..." : "AI Generate"}
                            </button>
                            
                            <label className="flex-1 cursor-pointer">
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setNewProject({...newProject, imageUrl: reader.result as string});
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              <div className="bg-zinc-200 text-brand-text px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-zinc-300 flex items-center justify-center gap-2 text-center h-full">
                                <Upload size={14} /> Upload from PC
                              </div>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                    {!newProject.title && !newProject.imageUrl && (
                      <p className="text-[9px] text-brand-accent font-black uppercase tracking-widest text-center">Add a title to enable AI generation</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Tags (comma separated)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="UI, Motion, Art"
                      value={newProject.tags}
                      onChange={e => setNewProject({...newProject, tags: e.target.value})}
                      className="w-full bg-zinc-50 border border-brand-border p-3 text-xs focus:outline-none focus:border-brand-accent transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Brief Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={newProject.description}
                      onChange={e => setNewProject({...newProject, description: e.target.value})}
                      className="w-full bg-zinc-50 border border-brand-border p-3 text-sm focus:outline-none focus:border-brand-accent transition-colors" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-brand-accent text-white py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={16} /> Finalize Archive Entry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="h-16 border-t border-brand-border flex items-center justify-center px-10 text-[9px] uppercase tracking-[0.3em] font-black text-brand-muted shrink-0 mt-20">
        Archival Registry — 2026 Creative Records
      </footer>
    </div>
  );
}
