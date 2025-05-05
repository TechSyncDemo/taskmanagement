import React, { ReactNode } from 'react';
import { Card, CardContent } from '../ui/Card';

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
            
            {trend && (
              <div className="mt-1 flex items-center">
                <div
                  className={`text-xs font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </div>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};