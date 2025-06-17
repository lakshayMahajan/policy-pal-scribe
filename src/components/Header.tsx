
import React from 'react';
import { PawPrint, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Live Analysis', icon: BarChart3 },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-amber-500" />
            <h1 className="text-xl font-semibold text-gray-900">Retriever</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input 
              placeholder="Search clauses..." 
              className="w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>
    </header>
  );
};
