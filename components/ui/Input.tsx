'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-cairo font-600 mb-2 text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 rounded-lg
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            focus:border-purple-main focus:bg-white/10
            transition-all duration-300
            font-cairo
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-400 text-sm mt-1 font-cairo">{error}</p>}
        {helper && !error && (
          <p className="text-gray-400 text-sm mt-1 font-cairo">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
