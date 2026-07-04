'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  LogOut,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'لوحة التحكم', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'الوظائف', href: '/admin/jobs', icon: Briefcase },
    { label: 'المرشحين', href: '/admin/candidates', icon: Users },
    { label: 'المقابلات', href: '/admin/interviews', icon: Calendar },
    { label: 'النتائج', href: '/admin/results', icon: BarChart3 },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="fixed right-0 top-0 h-screen w-64 glass border-l border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-cairo font-700 text-purple-main">
          🎯 بوابة المواهب
        </h1>
        <p className="text-sm text-gray-400 mt-1">نظام إدارة التوظيف</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-300 font-cairo font-600
                ${
                  isActive(item.href)
                    ? 'bg-purple-main text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 font-cairo font-600">
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
