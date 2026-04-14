import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/FadeIn";
import { contactApi } from "@/api/client";

const offices = [
  { city: "Canada", label: "North America HQ" },
  { city: "Austria", label: "European Office" },
  { city: "Punjab", label: "Development Center" },
  { city: "Mumbai", label: "India HQ" },
  { city: "Palghar", label: "Innovation Lab" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await contactApi.send(form);
      toast({ title: "Message sent!", description: res.message || "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      toast({ title: "Failed to send message", description: err.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-max text-center">
          <FadeIn>
            <span className="inline-block gradient-bg text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Contact</span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darker mb-4">Let's Build Together</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ready to start your next project? Reach out and let's discuss how we can help.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <FadeIn className="lg:col-span-3">
              <div className="glass-card p-8 sm:p-10">
                <h2 className="font-heading font-bold text-2xl text-brand-dark mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="you@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                    <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" disabled={sending} className="gradient-bg text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-60">
                    {sending ? "Sending..." : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg text-brand-dark mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-brand-primary mt-0.5 shrink-0" />
                    <div><p className="text-sm font-medium text-foreground">Email</p><p className="text-sm text-muted-foreground">info@techinnosphere.com</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-brand-primary mt-0.5 shrink-0" />
                    <div><p className="text-sm font-medium text-foreground">Phone</p><p className="text-sm text-muted-foreground">+1 (800) TECH-INN</p></div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg text-brand-dark mb-4">Our Offices</h3>
                <div className="space-y-3">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-center gap-3">
                      <MapPin size={16} className="text-brand-primary shrink-0" />
                      <div><p className="text-sm font-medium text-foreground">{o.city}</p><p className="text-xs text-muted-foreground">{o.label}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
