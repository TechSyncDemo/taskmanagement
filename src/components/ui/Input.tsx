import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const inputStyles = `
      block px-4 py-2 w-full text-gray-900 bg-white rounded-md border 
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} 
      focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out
      disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
      ${className}
    `;

    const containerStyles = `
      ${fullWidth ? 'w-full' : ''}
      mb-4
    `;

    return (
      <div className={containerStyles}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input ref={ref} className={inputStyles} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';