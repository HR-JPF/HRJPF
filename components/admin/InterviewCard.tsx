'use client';

import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Calendar, Link as LinkIcon, Edit2, Trash2 } from 'lucide-react';
import type { Interview } from '@/types';

interface InterviewCardProps {
  interview: Interview;
  candidateName?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  candidateName = 'المرشح',
  onDelete,
  onEdit,
}) => {
  const statusColors: Record<string, string> = {
    'مجدولة': 'info',
    'جارية': 'warning',
    'منتهية': 'success',
    'ملغاة': 'danger',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="glass p-5 border border-white/10 hover:border-purple-main/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-cairo font-700 text-white">
            {candidateName}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{interview.meeting_platform}</p>
        </div>
        <Badge variant={statusColors[interview.status] as any} size="sm">
          {interview.status}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar className="w-4 h-4 text-purple-main" />
          {formatDate(interview.scheduled_at)}
        </div>
        {interview.meeting_link && (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-purple-main" />
            <a
              href={interview.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-main hover:underline"
            >
              فتح رابط المقابلة
            </a>
          </div>
        )}
      </div>

      {interview.meeting_notes && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
          <p className="text-sm text-gray-300">
            <span className="font-cairo font-600 text-white">الملاحظات: </span>
            {interview.meeting_notes}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {onEdit && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(interview.id)}
            className="flex-1"
          >
            <Edit2 className="w-4 h-4 ml-1" />
            تعديل
          </Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(interview.id)}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            حذف
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
