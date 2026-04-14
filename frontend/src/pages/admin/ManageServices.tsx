import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Search, Briefcase } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { servicesApi, Service } from '@/api/client';

const iconOptions = ['Code', 'Database', 'Brain', 'Building2', 'BarChart3', 'Palette', 'Shield', 'TrendingUp', 'Wrench', 'Globe', 'Zap', 'Cloud'];

const emptyService = { title: '', description: '', icon: 'Code' };

const ManageServices = () => {
  const { isAdmin } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyService);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({ title: service.title, description: service.description, icon: service.icon });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await servicesApi.update(editing.id, form);
      } else {
        await servicesApi.create(form);
      }
      setModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesApi.delete(id);
      await loadData();
    } catch (err) { console.error(err); }
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-dark">Services</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your service offerings</p>
        </div>
        <button onClick={openAdd} className="gradient-bg text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:shadow-lg transition-all hover:scale-[1.02]">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="relative max-w-md mb-6">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-muted mb-4" />
              <div className="h-4 bg-muted rounded w-2/3 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No services found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <motion.div key={service.id} layout className="glass-card p-6 hover-lift group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground">
                  <span className="text-xs font-bold">{service.icon?.substring(0, 2)}</span>
                </div>
                {isAdmin && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(service)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <h3 className="font-heading font-semibold text-brand-dark mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{service.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darker/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted text-muted-foreground">
                <X size={18} />
              </button>
              <h2 className="font-heading text-xl font-bold text-brand-dark mb-5">
                {editing ? 'Edit Service' : 'Add New Service'}
              </h2>
              {error && <p className="text-destructive text-sm mb-4 bg-destructive/10 p-3 rounded-lg">{error}</p>}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description *</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" rows={4}
                    placeholder="Describe the service..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map((icon) => (
                      <button key={icon} onClick={() => setForm({ ...form, icon })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          form.icon === icon ? 'gradient-bg text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 gradient-bg text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
