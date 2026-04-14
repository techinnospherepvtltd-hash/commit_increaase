import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, Briefcase, Settings, Users, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import logoIcon from '@/assets/logo-icon.png';

const AdminLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin', end: true },
    { label: 'Projects', icon: FolderKanban, path: '/admin/projects' },
    { label: 'Services', icon: Briefcase, path: '/admin/services' },
    ...(isAdmin ? [
      { label: 'Jobs', icon: Settings, path: '/admin/jobs' },
      { label: 'Users', icon: Users, path: '/admin/users' },
    ] : []),
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-brand-darker/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'var(--gradient-dark)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-primary-foreground/10">
          <img src={logoIcon} alt="TechInnoSphere" className="h-8 w-8" />
          <span className="font-heading font-bold text-base text-primary-foreground tracking-tight">
            TECHINNOSPHERE
          </span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 text-primary-foreground/60 hover:text-primary-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-foreground/15 text-primary-foreground'
                    : 'text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
              <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* User info & Logout */}
        <div className="px-3 pb-4 border-t border-primary-foreground/10 pt-4">
          <div className="mb-3 px-3">
            <p className="text-primary-foreground text-sm font-medium truncate">{user?.name}</p>
            <p className="text-primary-foreground/50 text-xs truncate">{user?.email}</p>
            <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isAdmin ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'
            }`}>
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-4 sm:px-6 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-foreground/70 hover:bg-muted">
            <Menu size={20} />
          </button>
          <h2 className="font-heading font-semibold text-foreground">Admin Panel</h2>
          <div className="ml-auto flex items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              isAdmin ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {user?.role}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
