const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ── Auth API ──────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiRequest<{ message: string }>('/auth/logout', { method: 'POST' }),

  me: () =>
    apiRequest<{ user: User }>('/auth/me'),
};

// ── Projects API ──────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  region: string;
  featured: boolean;
  image: string;
}

export const projectsApi = {
  getAll: () => apiRequest<Project[]>('/projects'),
  create: (data: Omit<Project, 'id'>) =>
    apiRequest<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Project>) =>
    apiRequest<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiRequest<{ message: string }>(`/projects/${id}`, { method: 'DELETE' }),
};

// ── Services API ──────────────────────────────────────
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const servicesApi = {
  getAll: () => apiRequest<Service[]>('/services'),
  create: (data: Omit<Service, 'id'>) =>
    apiRequest<Service>('/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Service>) =>
    apiRequest<Service>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiRequest<{ message: string }>(`/services/${id}`, { method: 'DELETE' }),
};

// ── Jobs API ──────────────────────────────────────────
export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
}

export const jobsApi = {
  getAll: () => apiRequest<Job[]>('/jobs'),
  create: (data: Omit<Job, 'id'>) =>
    apiRequest<Job>('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Job>) =>
    apiRequest<Job>(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiRequest<{ message: string }>(`/jobs/${id}`, { method: 'DELETE' }),
};

// ── Users API ─────────────────────────────────────────
export interface UserFull {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  createdAt: string;
}

export const usersApi = {
  getAll: () => apiRequest<UserFull[]>('/users'),
  create: (data: { name: string; email: string; password: string; role: string }) =>
    apiRequest<UserFull>('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: { name?: string; email?: string; password?: string; role?: string }) =>
    apiRequest<UserFull>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiRequest<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),
};

// ── Settings API ──────────────────────────────────────
export const settingsApi = {
  get: () => apiRequest<Record<string, string>>('/settings'),
  update: (data: Record<string, string>) =>
    apiRequest<Record<string, string>>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

// ── Contact API ───────────────────────────────────────
export const contactApi = {
  send: (data: { name: string; email: string; company: string; message: string }) =>
    apiRequest<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
