'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        onComplete?.();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="text-center">
      <div className="bg-purple-main/20 border border-purple-main/30 rounded-lg p-4 mb-2">
        <p className="text-3xl font-cairo font-700 text-purple-main">
          {String(value).padStart(2, '0')}
        </p>
      </div>
      <p className="text-sm text-gray-400 font-cairo">{label}</p>
    </div>
  );

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-purple-main" />
        <h2 className="text-2xl font-cairo font-700 text-white">
          العد التنازلي
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <TimeUnit label="أيام" value={timeLeft.days} />
        <TimeUnit label="ساعات" value={timeLeft.hours} />
        <TimeUnit label="دقائق" value={timeLeft.minutes} />
        <TimeUnit label="ثوانِ" value={timeLeft.seconds} />
      </div>
    </div>
  );
};

export default CountdownTimer;
