'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Mock login - استبدل بـ Supabase Auth حقيقي
    setTimeout(() => {
      if (email && password) {
        window.location.href = '/admin/dashboard';
      } else {
        setError('يرجى ملء جميع الحقول');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-navy flex items-center justify-center p-4">
      <div className="glass p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cairo font-700 text-purple-main mb-2">
            🎯 بوابة المواهب
          </h1>
          <p className="text-gray-400 font-cairo">دخول المسؤول</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-cairo text-sm">{error}</p>
            </div>
          )}

          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full mt-6"
          >
            تسجيل الدخول
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6 font-cairo">
          حساب جديد؟
          <Link href="#" className="text-purple-main hover:underline mr-1">
            اطلب الوصول
          </Link>
        </p>
      </div>
    </div>
  );
}
