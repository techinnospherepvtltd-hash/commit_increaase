import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Users, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/FadeIn";
import { jobsApi, Job } from "@/api/client";

const Careers = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    jobsApi.getAll()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const active = jobs.find((j) => j.id === selected);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setSelected(null);
      toast({ title: "Application submitted!", description: "Our team will review your application and get back to you." });
    }, 1500);
  };

  return (
    <div>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-max text-center">
          <FadeIn>
            <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Careers</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darker mb-4">Join the Future of Tech Innovation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Build your career at a company that's shaping the digital landscape across continents.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-max max-w-4xl">
          <FadeIn><h2 className="font-heading text-2xl font-bold text-brand-dark mb-8">Open Positions</h2></FadeIn>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                  <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <FadeIn key={job.id} delay={i * 0.1}>
                  <div className="glass-card p-6 hover-lift cursor-pointer group" onClick={() => setSelected(job.id)}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-brand-dark group-hover:text-primary transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                          <span className="flex items-center gap-1"><Users size={14} /> {job.department}</span>
                        </div>
                      </div>
                      <button className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap hover:shadow-lg transition-all">
                        Apply Now
                      </button>
                    </div>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{job.description}</p>
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
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"><X size={20} /></button>
              <h3 className="font-heading font-bold text-2xl text-brand-dark mb-2">{active.title}</h3>
              <p className="text-brand-light text-sm mb-6">{active.location} · {active.type} · {active.department}</p>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Resume / Portfolio URL</label>
                  <input type="url" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Cover Note</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Why you'd be a great fit..." />
                </div>
                <button type="submit" disabled={applying} className="w-full gradient-bg text-primary-foreground py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60">
                  {applying ? "Submitting..." : <><Send size={16} /> Submit Application</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
