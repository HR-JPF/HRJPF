'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { getAllJobs } from '@/lib/actions';
import type { Job } from '@/types';

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        if (res.success) setJobs(res.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.includes(searchTerm) ||
      job.department?.includes(searchTerm) ||
      job.location?.includes(searchTerm)
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 mr-64 p-8 min-h-screen">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-cairo font-700 text-white mb-2">
                الوظائف
              </h1>
              <p className="text-gray-400 font-cairo">
                إدارة جميع الوظائف المتاحة
              </p>
            </div>
            <Link href="/admin/jobs/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                وظيفة جديدة
              </Button>
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="glass p-4 border border-white/10 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن وظيفة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-main"
                />
              </div>
              <Button variant="secondary" className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                فلترة
              </Button>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-400 font-cairo">جاري التحميل...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="glass p-8 border border-white/10 text-center">
                <p className="text-gray-400 font-cairo mb-4">لا توجد وظائف</p>
                <Link href="/admin/jobs/new">
                  <Button variant="primary">أضف وظيفة الآن</Button>
                </Link>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="glass p-6 border border-white/10 hover:border-purple-main/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-cairo font-700 text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span className="font-cairo">{job.department}</span>
                        <span>•</span>
                        <span className="font-cairo">{job.location}</span>
                      </div>
                      <p className="text-gray-300 line-clamp-2 font-cairo">
                        {job.description}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant="purple" size="sm">
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/admin/jobs/${job.id}/edit`}>
                      <Button variant="secondary" size="sm">
                        تعديل
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm">
                      حذف
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
