/** @format */

// DonutChart.tsx
import React from "react";

interface Segment {
  color: string;
  percentage: number;
  label: string;
}

interface DonutChartProps {
  totalLabel: string;
  totalValue: string;
  segments: Segment[];
}

export const DonutChart: React.FC<DonutChartProps> = ({
  totalLabel,
  totalValue,
  segments,
}) => {
  const radius = 15.91549430918954; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Adjust this gap value to increase or decrease the spacing between segments
  const gapWidthDegrees = 2; // Gap width in degrees
  const gapWidth = (gapWidthDegrees / 90) * circumference;

  // Function to calculate the stroke dasharray for the segment
  const calculateStrokeDasharray = (percentage: number) => {
    const length = (percentage / 100) * circumference - gapWidth;
    return `${length} ${circumference - length}`;
  };

  // Function to calculate the rotation for the segment
  const calculateRotation = (index: number) => {
    let rotation = 0; // Start from the top of the circle
    for (let i = 0; i < index; i++) {
      // Add the previous segments' percentages plus the gap width
      rotation += (segments[i].percentage / 100) * 360 + gapWidthDegrees;
    }
    return rotation;
  };

  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col items-center">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="text-lg font-semibold text-gray-700 mb-2">
          {totalLabel}
        </div>
        <div className="text-3xl font-bold text-gray-900">{totalValue}</div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-center items-start mt-6 space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center mr-2">
              <span
                className="block w-6 h-4 rounded-full"
                style={{ backgroundColor: segment.color }}
              ></span>
              <span className="text-sm font-medium text-gray-700 ml-1">
                {segment.label}
              </span>
            </div>
          ))}
        </div>
        <svg width="160" height="160" viewBox="0 0 42 42" className="donut">
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="21"
              cy="21"
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth="7"
              strokeDasharray={calculateStrokeDasharray(segment.percentage)}
              strokeDashoffset="25"
              transform={`rotate(${calculateRotation(index)} 21 21)`}
              strokeLinecap="butt" // Optional: to round the ends of each segment
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DonutChart;
