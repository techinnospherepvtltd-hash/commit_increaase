import { ExternalLink, Users, Eye, Lightbulb, Award } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

const founders = [
  {
    name: "Omar Khan",
    role: "Founder",
    bio: "A visionary technology leader with deep expertise in enterprise software architecture and digital transformation. Omar founded TechInnoSphere to bridge the gap between cutting-edge technology and real-world business outcomes, building a global team that delivers excellence.",
    linkedin: "https://linkedin.com/in/omar-khan",
  },
  {
    name: "Fehed",
    role: "Co-Founder",
    bio: "A seasoned technologist and strategist with a passion for innovation and operational excellence. Fehed co-founded TechInnoSphere to create a company that combines technical brilliance with a client-first philosophy, driving growth across continents.",
    linkedin: "https://linkedin.com/in/fehed",
  },
];

const differentiators = [
  { icon: <Eye size={24} />, title: "Vision & Approach", desc: "We don't just build software — we architect digital ecosystems that evolve with your business, combining strategic foresight with technical mastery." },
  { icon: <Lightbulb size={24} />, title: "Core Expertise", desc: "From SAP ABAP to AI-powered solutions, our team spans the full technology spectrum, delivering integrated solutions that drive measurable outcomes." },
  { icon: <Award size={24} />, title: "What Makes Us Different", desc: "A relentless commitment to quality, security, and long-term partnerships. We embed ourselves in your success, not just your codebase." },
  { icon: <Users size={24} />, title: "Global Team, Local Impact", desc: "With teams across Canada, Austria, and India, we bring diverse perspectives and 24/7 development cycles to every engagement." },
];

const About = () => (
  <div>
    <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="container-max text-center">
        <FadeIn>
          <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">About Us</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darker mb-4">Building the Future of Technology</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">TechInnoSphere is a global private technology company delivering intelligent digital solutions that drive growth for forward-thinking enterprises.</p>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-max">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-brand-dark mb-6">Company Overview</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>TechInnoSphere is a premium, private technology company specializing in end-to-end digital transformation. We engineer custom software, enterprise platforms, AI-powered solutions, and secure digital infrastructure for businesses across North America, Europe, and Asia.</p>
              <p>Our multidisciplinary team of engineers, designers, strategists, and security experts works as a seamless extension of your organization — delivering solutions that are not only technically excellent but strategically aligned with your business goals.</p>
              <p>From initial concept through deployment and long-term support, we own every phase of the software lifecycle. Our Annual Maintenance Contracts (AMC) ensure your systems remain secure, performant, and continuously optimized.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-max">
        <FadeIn><SectionHeading title="What Drives Us" /></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((d, i) => (
            <FadeIn key={d.title} delay={i * 0.1}>
              <div className="glass-card p-8 hover-lift h-full">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground mb-5">{d.icon}</div>
                <h3 className="font-heading font-semibold text-xl text-brand-dark mb-3">{d.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-max">
        <FadeIn><SectionHeading label="Leadership" title="Meet Our Founders" /></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <FadeIn key={founder.name} delay={i * 0.15}>
              <div className="glass-card p-8 text-center hover-lift">
                <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-6 flex items-center justify-center text-primary-foreground text-3xl font-heading font-bold">
                  {founder.name.charAt(0)}
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-dark">{founder.name}</h3>
                <p className="text-brand-light font-medium text-sm mb-4">{founder.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{founder.bio}</p>
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                  LinkedIn <ExternalLink size={14} />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
