import React from 'react';
import { months } from '@/data/tourismData';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthSelect,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-4 text-foreground">
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