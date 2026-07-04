'use server';

import { supabase } from './supabase';
import { generateOTP, formatOTPExpiry } from './otp';
import type {
  Job,
  Candidate,
  Interview,
  OTPCode,
  NotificationLog,
} from '@/types';

// JOBS ACTIONS
export async function createJob(data: Omit<Job, 'id' | 'created_at'>) {
  try {
    const { data: job, error } = await supabase
      .from('jobs')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: job };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getAllJobs() {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getJobById(id: string) {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateJob(
  id: string,
  data: Partial<Omit<Job, 'id' | 'created_at'>>
) {
  try {
    const { data: job, error } = await supabase
      .from('jobs')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: job };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteJob(id: string) {
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// CANDIDATES ACTIONS
export async function createCandidate(
  data: Omit<Candidate, 'id' | 'created_at'>
) {
  try {
    const { data: candidate, error } = await supabase
      .from('candidates')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: candidate };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getAllCandidates() {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getCandidateById(id: string) {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getCandidatesByJob(jobId: string) {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateCandidate(
  id: string,
  data: Partial<Omit<Candidate, 'id' | 'created_at'>>
) {
  try {
    const { data: candidate, error } = await supabase
      .from('candidates')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: candidate };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteCandidate(id: string) {
  try {
    const { error } = await supabase.from('candidates').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// INTERVIEWS ACTIONS
export async function createInterview(
  data: Omit<Interview, 'id' | 'created_at'>
) {
  try {
    const { data: interview, error } = await supabase
      .from('interviews')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: interview };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getAllInterviews() {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getTodayInterviews() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .gte('scheduled_at', today.toISOString())
      .lt('scheduled_at', tomorrow.toISOString())
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getInterviewById(id: string) {
  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateInterview(
  id: string,
  data: Partial<Omit<Interview, 'id' | 'created_at'>>
) {
  try {
    const { data: interview, error } = await supabase
      .from('interviews')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: interview };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteInterview(id: string) {
  try {
    const { error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// OTP ACTIONS
export async function createOTP(candidateId: string) {
  try {
    const code = generateOTP();
    const expiresAt = formatOTPExpiry(10);

    const { data, error } = await supabase
      .from('otp_codes')
      .insert([{ candidate_id: candidateId, code, expires_at: expiresAt }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data, code };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function verifyOTP(candidateId: string, code: string) {
  try {
    const { data, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('candidate_id', candidateId)
      .eq('code', code)
      .eq('is_used', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw new Error('OTP غير صحيح');

    const isExpired = new Date(data.expires_at) < new Date();
    if (isExpired) throw new Error('انتهت صلاحية الكود');

    // Mark OTP as used
    await supabase
      .from('otp_codes')
      .update({ is_used: true })
      .eq('id', data.id);

    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// NOTIFICATIONS ACTIONS
export async function logNotification(
  candidateId: string,
  type: 'ترحيب' | 'تذكير' | 'شكر' | 'اعتذار'
) {
  try {
    const { data, error } = await supabase
      .from('notifications_log')
      .insert([{ candidate_id: candidateId, type, status: 'مُرسلة' }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getNotificationHistory(candidateId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications_log')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('sent_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
