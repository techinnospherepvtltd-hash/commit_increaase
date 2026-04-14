import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Code, Shield, BarChart3, Brain, Palette, Database, Building2, TrendingUp, Wrench } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { projectsApi, servicesApi, Project, Service } from "@/api/client";
import logoIcon from "@/assets/logo-icon.png";

const offices = [
  { city: "Canada", label: "North America HQ" },
  { city: "Austria", label: "European Office" },
  { city: "Punjab", label: "Development Center" },
  { city: "Mumbai", label: "India HQ" },
  { city: "Palghar", label: "Innovation Lab" },
];

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={24} />, Brain: <Brain size={24} />, BarChart3: <BarChart3 size={24} />,
  Palette: <Palette size={24} />, Shield: <Shield size={24} />, Globe: <Globe size={24} />,
  Database: <Database size={24} />, Building2: <Building2 size={24} />,
  TrendingUp: <TrendingUp size={24} />, Wrench: <Wrench size={24} />,
};

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([servicesApi.getAll(), projectsApi.getAll()])
      .then(([s, p]) => { setServices(s); setProjects(p); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-brand-lighter/20 blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-brand-light/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>
        <div className="container-max section-padding relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-6">
              <img src={logoIcon} alt="" className="h-12 w-12 animate-pulse-glow rounded-full" />
              <span className="font-heading text-brand-light font-semibold text-sm uppercase tracking-[0.2em]">TechInnoSphere</span>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-brand-light font-medium text-base sm:text-lg mb-4 tracking-wide">
              From Vision to Software we Build it All
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-brand-darker leading-[1.1] mb-6">
              Intelligent Digital Solutions That Drive{" "}
              <span className="gradient-text">Global Growth</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
              We engineer enterprise-grade software, AI solutions, and digital platforms for forward-thinking businesses across North America, Europe, and Asia.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4">
              <Link to="/work" className="gradient-bg text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:scale-[1.02]">
                Explore Our Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-2xl font-semibold text-base text-center hover:bg-brand-primary hover:text-primary-foreground transition-all">
                Talk to Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-card">
        <div className="container-max">
          <FadeIn>
            <SectionHeading label="What We Do" title="End-to-End Digital Excellence" description="From ideation to deployment and beyond — we deliver complete technology solutions." />
          </FadeIn>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-6 sm:p-8 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-muted mb-5" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service, i) => (
                <FadeIn key={service.id} delay={i * 0.08}>
                  <div className="glass-card p-6 sm:p-8 hover-lift group cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform">
                      {iconMap[service.icon] || <Code size={24} />}
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-brand-dark mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/services" className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn>
            <SectionHeading label="Global Reach" title="Delivering Excellence Worldwide" description="With offices across continents and clients spanning North America & Europe." />
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {offices.map((office, i) => (
              <FadeIn key={office.city} delay={i * 0.08}>
                <div className="glass-card p-5 text-center hover-lift">
                  <Globe size={28} className="mx-auto text-brand-primary mb-3" />
                  <h4 className="font-heading font-semibold text-brand-dark">{office.city}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{office.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-card">
        <div className="container-max">
          <FadeIn>
            <SectionHeading label="Our Work" title="Featured Projects" description="A glimpse into the solutions we've delivered for clients globally." />
          </FadeIn>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <FadeIn key={project.id} delay={i * 0.1}>
                  <div className="glass-card overflow-hidden hover-lift group">
                    <div className="h-48 gradient-bg opacity-80 flex items-center justify-center">
                      <Code size={48} className="text-primary-foreground/40" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-brand-light bg-brand-lightest px-2.5 py-1 rounded-full">{project.region}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech) => (
                          <span key={tech} className="text-xs text-brand-light bg-brand-lightest px-2 py-1 rounded-md">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/work" className="gradient-bg text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold inline-flex items-center gap-2 hover:shadow-lg transition-all">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <FadeIn>
            <div className="gradient-dark-bg rounded-3xl p-10 sm:p-16 text-center text-primary-foreground">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Ready to Build Something Extraordinary?</h2>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">Let's turn your vision into software. Get in touch with our team today.</p>
              <Link to="/contact" className="bg-primary-foreground text-brand-dark px-8 py-4 rounded-2xl font-semibold text-base inline-flex items-center gap-2 hover:shadow-lg transition-all hover:scale-[1.02]">
                Start a Conversation <ArrowRight size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
