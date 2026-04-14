import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, Brain, Building2, BarChart3, Palette, Shield, TrendingUp, Wrench, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { servicesApi, Service } from "@/api/client";

const iconComponents: Record<string, React.ReactNode> = {
  Code: <Code size={28} />, Database: <Database size={28} />, Brain: <Brain size={28} />,
  Building2: <Building2 size={28} />, BarChart3: <BarChart3 size={28} />, Palette: <Palette size={28} />,
  Shield: <Shield size={28} />, TrendingUp: <TrendingUp size={28} />, Wrench: <Wrench size={28} />,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    servicesApi.getAll()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const active = services.find((s) => s.id === selected);

  return (
    <div>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-max text-center">
          <FadeIn>
            <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Services</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darker mb-4">End-to-End Digital Transformation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Comprehensive technology solutions engineered for enterprise excellence.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="glass-card p-6 sm:p-8 animate-pulse">
                  <div className="w-14 h-14 rounded-xl bg-muted mb-5" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <FadeIn key={service.id} delay={i * 0.06}>
                  <button
                    onClick={() => setSelected(service.id)}
                    className="glass-card p-6 sm:p-8 hover-lift group text-left w-full h-full"
                  >
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform">
                      {iconComponents[service.icon] || <Code size={28} />}
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-brand-dark mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </button>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                <X size={20} />
              </button>
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground mb-6">
                {iconComponents[active.icon] || <Code size={28} />}
              </div>
              <h3 className="font-heading font-bold text-2xl text-brand-dark mb-4">{active.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
