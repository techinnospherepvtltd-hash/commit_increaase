import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Briefcase, Users, ClipboardList, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { projectsApi, servicesApi, jobsApi, usersApi } from '@/api/client';

interface StatsCard {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<StatsCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, services, jobs] = await Promise.all([
        projectsApi.getAll(),
        servicesApi.getAll(),
        jobsApi.getAll(),
      ]);

      const cards: StatsCard[] = [
        { label: 'Projects', count: projects.length, icon: <FolderKanban size={24} />, color: 'from-blue-500 to-blue-600', link: '/admin/projects' },
        { label: 'Services', count: services.length, icon: <Briefcase size={24} />, color: 'from-violet-500 to-violet-600', link: '/admin/services' },
        { label: 'Jobs', count: jobs.length, icon: <ClipboardList size={24} />, color: 'from-emerald-500 to-emerald-600', link: '/admin/jobs' },
      ];

      if (isAdmin) {
        const users = await usersApi.getAll();
        cards.push({ label: 'Users', count: users.length, icon: <Users size={24} />, color: 'from-amber-500 to-amber-600', link: '/admin/users' });
      }

      setStats(cards);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAdmin
            ? 'You have full access to manage the entire platform.'
            : 'You can add new projects and services.'}
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(isAdmin ? 4 : 3)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-muted mb-4" />
              <div className="h-4 bg-muted rounded w-20 mb-2" />
              <div className="h-8 bg-muted rounded w-12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={stat.link} className="glass-card p-6 hover-lift block group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <p className="text-3xl font-heading font-bold text-brand-dark">{stat.count}</p>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="font-heading text-lg font-semibold text-brand-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/projects"
            className="glass-card p-5 hover-lift flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderKanban size={20} />
            </div>
            <div>
              <p className="font-medium text-brand-dark text-sm">Add a Project</p>
              <p className="text-xs text-muted-foreground">Showcase new work</p>
            </div>
          </Link>
          <Link
            to="/admin/services"
            className="glass-card p-5 hover-lift flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="font-medium text-brand-dark text-sm">Add a Service</p>
              <p className="text-xs text-muted-foreground">Expand offerings</p>
            </div>
          </Link>
          {isAdmin && (
            <Link
              to="/admin/users"
              className="glass-card p-5 hover-lift flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <div>
                <p className="font-medium text-brand-dark text-sm">Manage Users</p>
                <p className="text-xs text-muted-foreground">Add team members</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Role Info */}
      <div className="mt-10">
        <div className="glass-card p-6 border-l-4 border-l-brand-primary">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-brand-primary" />
            <h3 className="font-heading font-semibold text-brand-dark">Your Role: {isAdmin ? 'Administrator' : 'Employee'}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isAdmin
              ? 'As an administrator, you have full control over all content on the website including Projects, Services, Jobs, and User management. All changes reflect instantly on the public site.'
              : 'As an employee, you can add new Projects and Services. These will appear on the public website immediately. For edits or deletions, please contact an administrator.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
