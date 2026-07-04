'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import StatsCard from '@/components/admin/StatsCard';
import { BarChart3, Users, Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { getAllJobs, getAllCandidates, getTodayInterviews } from '@/lib/actions';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    candidates: 0,
    todayInterviews: 0,
    acceptanceRate: 65,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const jobsRes = await getAllJobs();
        const candidatesRes = await getAllCandidates();
        const interviewsRes = await getTodayInterviews();

        setStats({
          jobs: jobsRes.data?.length || 0,
          candidates: candidatesRes.data?.length || 0,
          todayInterviews: interviewsRes.data?.length || 0,
          acceptanceRate: 65,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 mr-64 p-8 min-h-screen">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-cairo font-700 text-white mb-2">
              لوحة التحكم
            </h1>
            <p className="text-gray-400 font-cairo">
              أهلاً بعودتك! إليك ملخص الأداء الحالي
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="الوظائف النشطة"
              value={stats.jobs}
              icon={<Briefcase className="w-6 h-6 text-purple-main" />}
              variant="default"
              trend={12}
            />
            <StatsCard
              title="إجمالي المرشحين"
              value={stats.candidates}
              icon={<Users className="w-6 h-6 text-emerald-accent" />}
              variant="success"
              trend={28}
            />
            <StatsCard
              title="مقابلات اليوم"
              value={stats.todayInterviews}
              icon={<Calendar className="w-6 h-6 text-blue-400" />}
              variant="info"
            />
            <StatsCard
              title="نسبة القبول"
              value={`${stats.acceptanceRate}%`}
              icon={<TrendingUp className="w-6 h-6 text-yellow-400" />}
              variant="warning"
            />
          </div>

          {/* Activity Section */}
          <div className="glass p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-main" />
              <h2 className="text-2xl font-cairo font-700 text-white">
                النشاط الأخير
              </h2>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-400 font-cairo">
                لا توجد بيانات حالياً. ابدأ بإضافة وظائف ومرشحين!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
