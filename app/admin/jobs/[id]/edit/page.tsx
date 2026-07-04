'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getJobById, updateJob } from '@/lib/actions';
import { useRouter, useParams } from 'next/navigation';
import type { Job } from '@/types';

export default function EditJob() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
    closing_date: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(jobId);
        if (res.success) setFormData(res.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateJob(jobId, formData);
      if (res.success) {
        router.push('/admin/jobs');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>جاري التحميل...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 mr-64 p-8 min-h-screen">
        <div className="max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-cairo font-700 text-white mb-2">
              تعديل الوظيفة
            </h1>
            <p className="text-gray-400 font-cairo">تحديث تفاصيل الوظيفة</p>
          </div>

          <form onSubmit={handleSubmit} className="glass p-8 border border-white/10 space-y-6">
            <Input
              label="اسم الوظيفة"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="القسم"
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
              />
              <Input
                label="المكان"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-cairo font-600 mb-2 text-gray-300">
                الوصف
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-cairo focus:border-purple-main"
              />
            </div>

            <div>
              <label className="block text-sm font-cairo font-600 mb-2 text-gray-300">
                المتطلبات
              </label>
              <textarea
                name="requirements"
                value={formData.requirements || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-cairo focus:border-purple-main"
              />
            </div>

            <Input
              label="تاريخ الإغلاق"
              name="closing_date"
              type="date"
              value={formData.closing_date || ''}
              onChange={handleChange}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" isLoading={isSaving} className="flex-1">
                حفظ التعديلات
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
