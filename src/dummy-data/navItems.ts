import { Upload, History, Users, BarChart3 } from 'lucide-react';

export const navItems = [
  { path: '/', label: 'Live Analysis', icon: BarChart3 },
  { path: '/upload', label: 'Upload Policy', icon: Upload },
  { path: '/workflow', label: 'Agent Workflow', icon: Users },
  { path: '/history', label: 'Assessment History', icon: History },
];
