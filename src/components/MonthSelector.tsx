import React from 'react';
import { useTourismData } from '@/hooks';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthSelect,
}) => {
  const { months, loading } = useTourismData();

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-48 mx-auto"></div>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-lg font-semibold text-center mb-4 text-foreground">
        Select a Month to Explore
      </h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            className={`btn-pill ${
              selectedMonth === month ? 'active' : ''
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};