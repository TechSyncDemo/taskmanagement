import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  const badgeStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <span className={badgeStyles} {...props}>
      {children}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: 'low' | 'medium' | 'high' }> = ({ priority }) => {
  const variants = {
    low: { variant: 'info', label: 'Low' },
    medium: { variant: 'warning', label: 'Medium' },
    high: { variant: 'danger', label: 'High' },
  };
  
  const { variant, label } = variants[priority];
  
  return <Badge variant={variant as any}>{label}</Badge>;
};

export const StatusBadge: React.FC<{ status: 'todo' | 'in-progress' | 'completed' }> = ({ status }) => {
  const variants = {
    todo: { variant: 'default', label: 'To Do' },
    'in-progress': { variant: 'warning', label: 'In Progress' },
    completed: { variant: 'success', label: 'Completed' },
  };
  
  const { variant, label } = variants[status];
  
  return <Badge variant={variant as any}>{label}</Badge>;
};