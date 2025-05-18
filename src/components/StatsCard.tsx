import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: number;
  changeType?: 'increase' | 'decrease';
  changeText?: string;
  bgColor?: string;
  textColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'increase',
  changeText,
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-5 transform transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      
      <div className="mt-2">
        <div className={`text-3xl font-semibold ${textColor}`}>{value}</div>
        
        {change !== undefined && (
          <div className="flex items-center mt-2">
            <span className={`text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              {changeType === 'increase' ? '↑' : '↓'} {change}%
            </span>
            {changeText && (
              <span className="text-sm text-gray-500 ml-1">
                {changeText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};