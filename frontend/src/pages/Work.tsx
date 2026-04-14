import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, X, Search } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { projectsApi, Project } from "@/api/client";

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    projectsApi.getAll()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const regions = ["All", ...new Set(projects.map((p) => p.region))];

  const filtered = projects.filter((p) => {
    const matchRegion = filter === "All" || p.region === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.technologies || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchRegion && matchSearch;
  });

  const active = projects.find((p) => p.id === selected);

  return (
    <div>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-max text-center">
          <FadeIn>
            <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Portfolio</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darker mb-4">Our Work</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Solutions we've engineered for clients worldwide.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-max">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <div className="relative flex-1 max-w-md w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {regions.map((r) => (
                  <button key={r} onClick={() => setFilter(r)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filter === r ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="h-44 bg-muted" />
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.08}>
                  <div className="glass-card overflow-hidden hover-lift group cursor-pointer" onClick={() => setSelected(project.id)}>
                    <div className="h-44 gradient-bg opacity-80 flex items-center justify-center">
                      <Code size={40} className="text-primary-foreground/40" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-brand-light bg-brand-lightest px-2.5 py-1 rounded-full">{project.region}</span>
                      <h3 className="font-heading font-semibold text-lg text-brand-dark mt-3 mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.technologies || []).map((t) => (
                          <span key={t} className="text-xs text-brand-light bg-brand-lightest px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/50 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"><X size={20} /></button>
              <span className="text-xs font-medium text-brand-light bg-brand-lightest px-2.5 py-1 rounded-full">{active.region}</span>
              <h3 className="font-heading font-bold text-2xl text-brand-dark mt-4 mb-3">{active.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{active.description}</p>
              <div className="flex flex-wrap gap-2">
                {(active.technologies || []).map((t) => (
                  <span key={t} className="text-sm text-brand-primary bg-brand-lightest px-3 py-1.5 rounded-lg font-medium">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Work;
