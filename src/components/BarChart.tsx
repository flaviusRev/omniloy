/** @format */

// BarChartCard.tsx
import React from "react";

interface BarData {
  label: string;
  value: string;
  barPercentage: number; // Represents the length of the bar as a percentage
}

interface BarChartCardProps {
  title: string;
  bars: BarData[];
}

export const BarChartCard: React.FC<BarChartCardProps> = ({ title, bars }) => {
  return (
    <div className="bg-white rounded-3xl p-6 m-2">
      <div className="text-lg font-semibold mb-4">{title}</div>
      {bars.map((bar, index) => (
        <div key={index} className="mb-4">
          <div className="text-sm font-medium text-[#0C1122]">{bar.label}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${bar.barPercentage}%` }}
            ></div>
          </div>
          <div className="text-right text-sm font-semibold">{bar.value}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChartCard;
