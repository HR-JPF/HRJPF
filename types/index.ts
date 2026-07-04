export type Job = {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string;
  location: string;
  status: 'نشطة' | 'مغلقة' | 'معلقة';
  closing_date: string;
  created_at: string;
};

export type Candidate = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  job_id: string;
  status: 'جديد' | 'مقابلة' | 'مقبول' | 'مرفوض' | 'معلق';
  score_manual: number | null;
  cv_url: string | null;
  notes: string | null;
  created_at: string;
};

export type Interview = {
  id: string;
  candidate_id: string;
  job_id: string;
  scheduled_at: string;
  meeting_link: string;
  meeting_platform: 'Zoom' | 'Google Meet' | 'Teams' | 'WhatsApp';
  meeting_notes: string | null;
  status: 'مجدولة' | 'جارية' | 'منتهية' | 'ملغاة';
  created_at: string;
};

export type OTPCode = {
  id: string;
  candidate_id: string;
  code: string;
  expires_at: string;
  is_used: boolean;
  created_at: string;
};

export type NotificationLog = {
  id: string;
  candidate_id: string;
  type: 'ترحيب' | 'تذكير' | 'شكر' | 'اعتذار';
  sent_at: string;
  status: 'مُرسلة' | 'فشلت' | 'معلقة';
};
