'use client';

import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Mail, Phone, FileText, Edit2, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Candidate } from '@/types';

interface CandidateCardProps {
  candidate: Candidate;
  onDelete?: (id: string) => void;
  onEvaluate?: (id: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onDelete,
  onEvaluate,
}) => {
  const statusColors: Record<string, string> = {
    'جديد': 'success',
    'مقابلة': 'info',
    'مقبول': 'success',
    'مرفوض': 'danger',
    'معلق': 'warning',
  };

  return (
    <div className="glass p-5 border border-white/10 hover:border-purple-main/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-cairo font-700 text-white">
            {candidate.full_name}
          </h3>
          <Badge variant={statusColors[candidate.status] as any} size="sm">
            {candidate.status}
          </Badge>
        </div>
        {candidate.score_manual && (
          <div className="text-center">
            <div className="text-2xl font-cairo font-700 text-purple-main">
              {candidate.score_manual}
            </div>
            <p className="text-xs text-gray-400">التقييم</p>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 text-sm text-gray-300">
        {candidate.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-main" />
            <span>{candidate.email}</span>
          </div>
        )}
        {candidate.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-main" />
            <span>{candidate.phone}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Link href={`/admin/candidates/${candidate.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            <Eye className="w-4 h-4 ml-1" />
            عرض
          </Button>
        </Link>
        {onEvaluate && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onEvaluate(candidate.id)}
            className="flex-1"
          >
            <Edit2 className="w-4 h-4 ml-1" />
            تقييم
          </Button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
